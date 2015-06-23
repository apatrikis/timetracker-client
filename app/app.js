'use strict';

// declare modules
angular.module('Home', []);
angular.module('User', []);
angular.module('Manager', []);
angular.module('ManagerProject', []);
angular.module('ManagerTimeBooking', []);
angular.module('Admin', []);
angular.module('AdminEmployee', []);
angular.module('AdminProject', []);

// Declare app level module which depends on views, and components
var ttApp = angular.module('tt', [
    'tt.version',
    'tt.version.version-directive',
    'tt.services.constants',
    'tt.services.employees',
    'tt.services.employees2roles',
    'tt.services.projects',
    'tt.services.projects2employees',
    'tt.services.security',
    'tt.services.timerecords',
    'Home',
    'User',
    'Manager',
    'ManagerProject',
    'ManagerTimeBooking',
    'Admin',
    'AdminEmployee',
    'AdminProject',
    'ngRoute',
    'angularBasicAuth',
    'ngWebsocket']);

ttApp.config(['$routeProvider',
    function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'modules/home/views/home.html',
            controller: 'HomeController'
        })
        
        .when('/chgpasswd', {
            templateUrl: 'modules/home/views/changepassword.html',
            controller: 'HomeController'
        })
        
        .when('/logout', {
            templateUrl: 'modules/home/views/logout.html',
            controller: 'HomeController'
        })
        
        .when('/USER', {
            templateUrl: 'modules/user/views/user.html',
            controller: 'UserController'
        })
        
        .when('/MANAGER', {
            templateUrl: 'modules/manager/views/manager.html'
        })
        
        .when('/manager-project', {
            templateUrl: 'modules/manager/views/manager_project.html',
            controller: 'ManagerControllerProject'
        })

        .when('/manager-timebooking', {
            templateUrl: 'modules/manager/views/manager_timebooking.html',
            controller: 'ManagerControllerTimeBooking'
        })
        
        .when('/ADMIN', {
            templateUrl: 'modules/admin/views/admin.html'
        })        
        
        .when('/admin-project', {
            templateUrl: 'modules/admin/views/admin_project.html',
            controller: 'AdminControllerProject'
        })
        
        .when('/admin-employee', {
            templateUrl: 'modules/admin/views/admin_employee.html',
            controller: 'AdminControllerEmployee'
        })
        
        .otherwise({ redirectTo: '/' });

        // https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag
        // use the HTML5 History API
//        $locationProvider.html5Mode(true);
}]);

ttApp.run(function ($websocket, $rootScope) {
    var whichURL = 'wss://localhost/timetracker-server/messages';
    if(window.location.protocol === 'http:') {
        whichURL = 'ws://localhost/timetracker-server/messages';
    }
    
    var ws = $websocket.$new({
        url: whichURL,
        lazy: true,
        reconnect: true
    });
    
    ws.$on('$open', function () {
        ws.$emit($rootScope.whoAmI.email, {timestamp: new Date().toJSON(), message:"register"});
            $rootScope.websocketMessage = "websocket opened";
        })
        .$on('servermessage', function (data) {
            console.log('The websocket server has sent the following data:');
            console.log(data);
            $rootScope.websocketMessage = "Timestamp: [" + data.timestamp + "], Message: " + data.message;
        })
        .$on('$close', function () {
            console.log('closing websocket');
            $rootScope.websocketMessage = "websocket closed";
        });
        
    $rootScope.websocket = ws;
});