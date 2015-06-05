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

For serving the client files, the configuration in `httpd.conf` must be changed. As the files are served from the `timetracker-client` dircetory, a `Alias` has to be configured which enables to use a directory outside the web sever's root directory. This may be added directly before the `DocumentRoot` statement

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

Glasfish server is accessed via the `AJP` protocol.

**<< TODO >>**

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


# Links
- http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
- http://dorey.github.io/JavaScript-Equality-Table/
