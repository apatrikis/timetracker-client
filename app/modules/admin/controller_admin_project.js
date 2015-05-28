/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */

'use strict';

angular.module('AdminProject', ['ngRoute',
    'tt.services.employees',
    'tt.services.projects',
    'tt.services.employees2roles',
    'tt.services.projects2employees'])

.controller('AdminControllerProject',
    ['$scope', 'Projects', 'Project', 'ProjectEmployees', 'EmployeeRolesFindByRole',
    function ($scope, Projects, Project, ProjectEmployees, EmployeeRolesFindByRole) {
        $scope.allManagers = EmployeeRolesFindByRole.findByRole({roleName:'MANAGER'}, function(){}, errorHandler);
        $scope.allProjects = Projects.readAll();
        
        $scope.isReadOnly = true;
        
        $scope.showProject = function(project, readOnly) {
            $scope.selProject = project;
            $scope.selProjectEmployees = ProjectEmployees.readAllEmployees({projectId:project.projectId}, function(){}, errorHandler);
            
            $scope.isReadOnly = readOnly;
        };
        
        $scope.deleteProject = function() {
            Project.deleteOne({projectId:$scope.selProject.projectId}, reloadProjects, errorHandler);
        };
        
        $scope.createProject = function() {
            if(angular.isUndefined($scope.newLocked)){
                $scope.newLocked = false;
            }
            Projects.createOne({projectId:$scope.newProjectId,
                title:$scope.newTitle,
                description:$scope.newDescription,
                owner:$scope.newOwner,
                startDate:new Date($scope.newStartDate),
                endDate:new Date($scope.newEndDate),
                locked:$scope.newLocked}, reloadProjects, errorHandler);
        };
        
        function reloadProjects() {
            $scope.allProjects = Projects.readAll({}, function() {
                $scope.selProject = null;
                $scope.selProjectEmployees = null;
            }, errorHandler);
        }
        
        function errorHandler(httpResponse) {
            alert("Check for undeleted references: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }])
;
