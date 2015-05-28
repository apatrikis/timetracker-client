/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */

'use strict';

angular.module('ManagerProject', ['ngRoute',
    'tt.services.employees',
    'tt.services.projects',
    'tt.services.employees2roles',
    'tt.services.projects2employees'])

.controller('ManagerControllerProject',
    ['$scope', '$filter', 'Projects', 'ManagerProjects', 'ProjectEmployees', 'ProjectUnassignEmployee', 'Employees', 'EmployeeRolesFindByRole',
    function ($scope, $filter, Projects, ManagerProjects, ProjectEmployees, ProjectUnassignEmployee, Employees, EmployeeRolesFindByRole) {
        $scope.allEmployees = Employees.readAll();
        $scope.allManagers = EmployeeRolesFindByRole.findByRole({roleName:'MANAGER'}, function(){}, errorHandler);
        $scope.allProjects = ManagerProjects.findByManager({email:$scope.whoAmI.email});
        
        $scope.isReadOnly = true;
        
        $scope.showProject = function(project, readOnly) {
            $scope.selProject = project;
            $scope.selProject.startDatePart = $filter('date')($scope.selProject.startDate, "yyyy-MM-dd");
            $scope.selProject.endDatePart = $filter('date')($scope.selProject.endDate, "yyyy-MM-dd");
            
            $scope.selProjectEmployees = ProjectEmployees.readAllEmployees({projectId:project.projectId}, function(){}, errorHandler);
            
            $scope.isReadOnly = readOnly;
        };
        
        $scope.updateProject = function() {
            $scope.selProject.startDate = new Date($scope.selProject.startDatePart + "T00:00:00");
            $scope.selProject.endDate = new Date($scope.selProject.endDatePart + "T00:00:00");
            
            Projects.updateOne($scope.selProject, reloadProjects, errorHandler);
        };
        
        $scope.unassignEmployee = function(employee) {
            ProjectUnassignEmployee.unassignEmployee({projectId:$scope.selProject.projectId, email:employee.email}, reloadProjects, errorHandler);
        };
        
        $scope.assignEmployee = function(employee) {
            ProjectEmployees.assignEmployee({projectId:$scope.selProject.projectId, email:employee.email}, reloadProjects, errorHandler);
        };
        
        function reloadProjects() {
            $scope.allProjects = ManagerProjects.findByManager({email:$scope.whoAmI.email}, function() {
                $scope.selProject = null;
                $scope.selProjectEmployees = null;
            }, errorHandler);
        }
        
        function errorHandler(httpResponse) {
            alert("Check for undeleted references: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }])
;
