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
angular.module('tt', [
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
    'ngRoute'])

.config(['$routeProvider',
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
