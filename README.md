# Time Tracker
Time Tracker is a self educational application for timesheet tracking. The application mainly has three parts:
- a JEE7 REST server, connecting to a database for storing users, projects and timesheets, as well as an WebSocket interface to notify registered clients about status changes.
- a common library with interfaces, entities and exceptions.
- a AngularJS web client that is consuming the servers's REST API and registers for status changes.

# Time Tracker Client
## Main desicions
- Create a AngularJS client to access the server's REST-ful API.
- Access WebSockets to be notified about status changes.

## Used software and versions
- IDE : Oracle NetBeans 8.0.2 (https://netbeans.org/downloads/, choose the `Java EE` edition)
- Angular JS 1.3.15 (https://angularjs.org/)
- Dependency management : Bower (http://bower.io/#install-bower)
- NPM : via Node.js (https://nodejs.org/) or io.js (https://iojs.org)
- GIT : via GIT SCM (http://git-scm.com/downloads) or GitHub (https://github.com/)
- Apache HTTPD 2.4.12 (http://httpd.apache.org/download.cgi#apache24)  
  The recommendation is to use the latest 2.4.12 version
- Apache Tomcat Connector (Mod JK) (http://tomcat.apache.org/connectors-doc/)  
  Please note : in case your Apache version is for Windows/VC11 you have to download the connector from http://www.apachelounge.com/download/

For the following descriptions the base installation directory `\time-tracker` is assumed.

## Development
The directory structure described below is like this:
```
\time-tracker
   \netbeans-8.0.2
   \timetracker-client
```

### Requirements
1. Install NetBeans IDE  
  If not already installed for the `timetracker-server`
1. Install NPM by installing the tool of your choice, both node.js as well as io.js containt NPM.
1. Install GIT by installing the tool of your choice.  
  If not already installed for the `timetracker-server`
1. Download the `timetracker-client` project from https://github.com/apatrikis/timetracker-client

### Initial configuration
#### Install Bower
Bower is the Javascript package manager and is installed by using `npm` (and behind the scene `GIT`)
```
npm install -g bower
```

To be able to use `git`, `npm` and `bower` from the command line they must be set in the path.
For `bower` one can refer to http://stackoverflow.com/questions/21732447/bower-command-not-found-windows.


## Test
The framework for writing and executing tests is `Karma`. It is included in the `timetracker-client` project, but actaually no test cases are written.


## Build (CI)
Unlike the `timetracker-server` no build is required in order to create a deployment unit. The Javascript files (as well as CSS, etc.) can be used as is from within the development directory.
Anyhow, a `Maven POM` is provided: it creates a `WAR` that just contains all files, as well as the mandatory `META-INF` and `WEB-INF` folder.
This archive can be use for:
- easily sharing all files, e. g. providing a file to simply unpack and use in `Apache`
- use for deplyment in a application server, as a seperate deployment package for the server where `timetracker-server` is running.

## Run
The directory structure described below is like this:
```
\time-tracker
   \apache24
```

This applies for the use in a production environment, as well as for testing during development.

### Requirements
1. Install the `Apache HTTPD` server

### Initial configuration
The web server has to be configured
- for serving the Javascript application
- for accessing the `timetracker-server` Glasfish application server, where the REST API is exposed

Plase note: first of all set the `SRVROOT` in `httpd.conf`.
```
Define SRVROOT "<<pathTo>>/Apache24"
```

#### Configure client
For serving the client files, the configuration in `httpd.conf` must be changed.
As the files are served from the `timetracker-client` dircetory, a `Alias` has to be configured which enables to use a directory outside the web sever's root directory. This may be added directly before the `DocumentRoot` statement.

```
Alias "/angular" "__root__/timetracker-client/app"
<Directory "__root__/timetracker-client/app">
    Require all granted
</Directory>
```

For restricting the access to HTTPS listening to the standard `HTTP` port must be disabled by commenting the statement
```
# Listen 80
```

#### Configure server

**Please note: this is the `Glassfish Application Server` that is configured for the `timetracker-server`.**
```
\time-tracker
   \glassfish4-run
```

Glasfish server is accessed via `Apache Tomcat Connector` which uses the `AJP` protocol.
An easy-to-read documentation how to setup `Glassfish` and `Apache` : http://www.codefactorycr.com/glassfish-behind-apache.html

Applied to our infrastructure the following steps are required:
- ensure the cluster (and it's member) is up and running

```
asadmin --user admin --host localhost --port 4848 start-cluster tt-cluster-1
asadmin --user admin --host localhost --port 4848 list-instances
```
- crate and activate a listener for the cluster

```
$GLASSFISH_HOME/glassfish/bin/asadmin --user admin --host localhost --port 4848 create-network-listener --listenerport {AJP_PORT} --protocol http-listener-1 --enabled=true --jkenabled=true --target tt-cluster-1 jk-connector
```

**Important** : the `listenerport {AJP_PORT}` forces each server instance to use it's defined port for `mod_jk` in order to balance with `Apache` and `mod_jk`.

- restart the cluser to activate the configuration change

```
asadmin --user admin --host localhost --port 4848 stop-cluster tt-cluster-1
asadmin --user admin --host localhost --port 4848 start-cluster tt-cluster-1
asadmin --user admin --host localhost --port 4848 list-instances
```

- create a `workers.properties` next to the `Apache` `httpd.conf` file

```
# define a load balancer
worker.list=balancer

worker.balancer.type=lb
worker.balancer.balance_workers=worker1,worker2

# define the balancer member
worker.common.type=ajp13
worker.common.host=localhost
worker.common.lbfactor=1

worker.worker1.reference=worker.common
worker.worker1.port=8109

worker.worker2.reference=worker.common
worker.worker2.port=8209
```

Plase note: setting a `status worker` curenty breaks the authentication. Therefore the following is **not** added to `workers.properties`

```
# worker management
worker.list=jkstatus
worker.jkstatus.type=status
```

- add the `Apache Tomcat Connector` settings to `httpd.conf`

```
LoadModule jk_module modules/mod_jk.so

JkWorkersFile <<pathTo>>/Apache24/conf/workers.properties
JkLogFile <<pathTo>>/Apache24/logs/mod_jk.log
JkLogLevel debug
JkLogStampFormat "[%a %b %d %H:%M:%S %Y] "
JkOptions +ForwardKeySize +ForwardURICompat -ForwardDirectories
JkRequestLogFormat "%w %V %T"
```

- add the `Apache Tomcat Connector` settings to `VirtualHost` configurations for HTTP (even it has to be disabled as described above) and HTTPS

- in `<<pathTo>>/Apache24/conf/extra/httpd-vhosts.conf`

```
<VirtualHost _default_:80>
  ...
  JkMount /timetracker-server/* balancer
</VirtualHost>
```

- in `<<pathTo>>/Apache24/conf/extra/httpd-ahssl.conf`

```
<VirtualHost _default_:443>
  ...
  JkMount /timetracker-server/* balancer
</VirtualHost>
```

For enabling `WebSocket` communcation to the server the following line must be enabled:
```
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so
```

<<
TODO : there is more configuration required
http://notmyitblog.blogspot.de/2014/03/websockets-support-for-apache-httpd.html
>>

After the configuration changes, the files should be tested for before using them.
```
\bin\httpd -t
```


### Execution
Start the web server and open the URL to the AngularJS client's entry page.
```
https://localhost/angular/
```

The server side database setup included the creation of an adminstration account (the default is `ad.min@tt.com` with `secret`). The login to `BASIC Authentication` uses this credential.


# Educational links about Javascrip and WebSockets
- http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
- http://dorey.github.io/JavaScript-Equality-Table/
- http://dreamand.me/java/jee7-websocket-example/
- https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
