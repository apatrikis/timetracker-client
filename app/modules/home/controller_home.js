/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';
 
angular.module('Home', ['ngRoute',
    'tt.services.constants',
    'tt.services.security'])
 
.controller('HomeController',
    ['$rootScope', '$scope', '$http', '$location', 'Security', 'ChangePassword', 'ConstantsRoles',
    function ($rootScope, $scope, $http, $location, Security, ChangePassword, ConstantsRoles) {
        $scope.rolesArray = ConstantsRoles;
        
        $scope.login = function (asType) {
            $scope.dataLoading = true;
            
            $http.post('http://localhost:8080/timetracker-server/rest/security/' + asType)
                .success(function () {
                    $scope.error = '';
                    $scope.dataLoading = false;
                    
                    $rootScope.whoAmI = Security.whoAmI({}, function() {
                        $rootScope.isLoggedIn = true;
                        $location.path('/' + asType);
                    });
                })
                .error(function (response) {
                    $scope.error = 'Login was not successful' + '(' + response + ')';
                    $scope.dataLoading = false;
                })
                ;
        };
        
        $scope.changePassword = function() {
            ChangePassword.changePasswd({email:$rootScope.whoAmI.email,
                currentPassword:$scope.currentPasswd,
                newPassword:$scope.newPasswd}, passwordChangeSuccess, errorHandler);
        };
        
        function passwordChangeSuccess() {
            alert("SUCCESS");
            $rootScope.isLoggedIn = false;
            $rootScope.whoAmI = null;
            $location.path('/');
        }
        
        function errorHandler(httpResponse) {
            alert("An error occured: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }])
;
