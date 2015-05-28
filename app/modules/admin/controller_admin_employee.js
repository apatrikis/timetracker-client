/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */

'use strict';

angular.module('AdminEmployee', ['ngRoute',
    'tt.services.constants',
    'tt.services.employees',
    'tt.services.projects',
    'tt.services.employees2roles',
    'tt.services.projects2employees'])

.controller('AdminControllerEmployee',
    ['$scope', 'Employees', 'Employee', 'EmployeeRole', 'EmployeeRoles', 'EmployeeRolesFindByEmployee', 'ConstantsRoles', 'ResetPassword', 'EmployeeProjects', 'ManagerProjects',
    function ($scope, Employees, Employee, EmployeeRole, EmployeeRoles, EmployeeRolesFindByEmployee, ConstantsRoles, ResetPassword, EmployeeProjects, ManagerProjects) {
        $scope.rolesArray = ConstantsRoles;
        
        $scope.allEmployees = Employees.readAll();
        
        $scope.isReadOnly = true;
        
        $scope.showEmployee = function(employee, readOnly) {
            $scope.selEmployee = employee;
            $scope.selEmployeeRoles = EmployeeRolesFindByEmployee.findByEmployee({email:employee.email}, computeAvailableRoles, errorHandler);
            $scope.selEmployeeProjects = EmployeeProjects.readAllProjetcs({email:employee.email});
            $scope.selManagerProjects = ManagerProjects.findByManager({email:employee.email});
            
            $scope.isReadOnly = readOnly;
        };
        
        $scope.deleteEmployee = function() {
            Employee.deleteOne({email:$scope.selEmployee.email}, reloadEmployees, errorHandler);
        };
        
        $scope.resetEmployeePassword = function() {
            ResetPassword.resetPasswd({email:$scope.selEmployee.email,
                newPassword:$scope.selEmployee.newPasswd}, reloadEmployees, errorHandler);
        };
        
        $scope.unassignEmployeeRole = function(role) {
            EmployeeRole.deleteOne({id:role.id}, reloadEmployees, errorHandler);
        };
        
        $scope.assignEmployeeRole = function(role) {
            EmployeeRoles.createOne({employee:$scope.selEmployee, roleName:role}, reloadEmployees, errorHandler);
        };
        
        $scope.createEmployee = function() {
            Employees.createOne({email:$scope.newEmployeeEMail,
                firstName:$scope.newEmployeeFirstName,
                lastName:$scope.newEmployeeLastName,
                password:$scope.newEmployeePassword}, readNewEmployee, errorHandler);
        };
        
        function computeAvailableRoles(value, responseHeaders) {
            var tmp = [];
            for(var pos = 0; pos<$scope.selEmployeeRoles.length; pos++) {
                tmp.push($scope.selEmployeeRoles[pos].roleName);
            }
            $scope.availableRoles = [];
            for(var pos = 0; pos<$scope.rolesArray.length; pos++) {
                var role = $scope.rolesArray[pos];
                if(tmp.indexOf(role) === -1) {
                    $scope.availableRoles.push(role);
                }
            }
        }
        
        function readNewEmployee(value, responseHeaders) {
            Employee.readOne({email:$scope.newEmployeeEMail}, assignRole, errorHandler);
        }
        
        function assignRole(value, responseHeaders) {
            if(angular.isDefined($scope.newEmployeeRoles)) {
                for(var pos = 0; pos<$scope.newEmployeeRoles.length; pos++) {
                    EmployeeRoles.createOne({employee:value, roleName:$scope.newEmployeeRoles[pos]}, reloadEmployees, errorHandler);
                }
            } else {
                reloadEmployees();
            }
        }
        
        function reloadEmployees() {
            $scope.allEmployees = Employees.readAll({}, function() {
                $scope.selEmployee = null;
                $scope.selEmployeeRoles = null;
                $scope.selEmployeeProjects = null;
                $scope.selManagerProjects = null;
            }, errorHandler);
        }
        
        function errorHandler(httpResponse) {
            alert("Check for undeleted references: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }])
;
