/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';
 
angular.module('Home', ['ngRoute',
    'tt.services.constants',
    'tt.services.security'])
 
.controller('HomeController',
    ['$rootScope', '$scope', '$http', '$location', 'authDefaults','authService', 'Security', 'ChangePassword', 'ConstantsRoles', 'BaseURL',
    function ($rootScope, $scope, $http, $location, authDefaults, authService, Security, ChangePassword, ConstantsRoles, BaseURL) {
        $scope.rolesArray = ConstantsRoles;
        
        // the current hostname
        authService.addEndpoint();
        
        // listen for login events
        $rootScope.$on('login', function() {
            $scope.loggedInUsername = authService.username();
        });

        // listen for logout events
        $rootScope.$on('logout', function() {
            $scope.loggedInUsername = null;
        });

        $scope.loginButton = function (asType) {
            $scope.dataLoading = true;
            
            if($rootScope.isLoggedIn === true) {
                $location.path('/' + asType);
            } else {
                // define the endpoints that will be authenticated
                authDefaults.authenticateUrl = BaseURL + '/security/' + asType;
                authService.login($scope.loginEmail, $scope.loginPassword)
                    .success(function() {
                        $scope.error = '';
                        $scope.dataLoading = false;

                        $rootScope.whoAmI = Security.whoAmI({}, function() {
                            $rootScope.isLoggedIn = true;
                            $location.path('/' + asType);
                        });
                    })
                    .error(function() {
                        $scope.error = 'Login was not successful';
                        $scope.dataLoading = false;
                    });
                }
        };
        
        $scope.logoutButton = function() {
            $rootScope.isLoggedIn = false;
            $rootScope.whoAmI = null;
            $location.path('/');
        }
        
        $scope.changePassword = function() {
            ChangePassword.changePasswd({email:$rootScope.whoAmI.email,
                currentPassword:$scope.currentPasswd,
                newPassword:$scope.newPasswd}, passwordChangeSuccess, errorHandler);
        };
        
        function passwordChangeSuccess() {
            alert("SUCCESS");
            logout();
        }
        
        function errorHandler(httpResponse) {
            alert("An error occured: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }])
;
