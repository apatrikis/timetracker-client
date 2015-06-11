/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';
 
angular.module('Home', ['ngRoute',
    'tt.services.constants',
    'tt.services.security',
    'tt.services.employees2roles'])
 
.controller('HomeController',
    ['$rootScope', '$scope', '$location', 'authDefaults','authService', 'Security', 'ChangePassword', 'BaseURL', 'EmployeeRolesFindByEmployee',
    function ($rootScope, $scope, $location, authDefaults, authService, Security, ChangePassword, BaseURL, EmployeeRolesFindByEmployee) {
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

        $scope.loginButton = function() {
            $scope.dataLoading = true;
            
            // define the endpoints that will be authenticated
            authDefaults.authenticateUrl = BaseURL + '/security';
            authService.login($scope.loginEmail, $scope.loginPassword)
                .success(function() {
                    $scope.error = '';
                    $scope.dataLoading = false;

                    $rootScope.whoAmI = Security.whoAmI({}, function() {
                        $rootScope.isLoggedIn = true;
                        var employeeRoles = EmployeeRolesFindByEmployee.findByEmployee({email:$rootScope.whoAmI.email},
                        function() {
                            $rootScope.whoAmI.employeeRoles = employeeRoles;
                        },
                        errorHandler);
                        
                        $rootScope.websocket.$open();
                    });
                })
                .error(function() {
                    $scope.error = 'Login was not successful';
                    $scope.dataLoading = false;
                });
        };
        
        $scope.logoutButton = function() {
            $rootScope.websocket.$close();
            
            $rootScope.isLoggedIn = false;
            $rootScope.whoAmI = null;
            $location.path('/');
        };
        
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
