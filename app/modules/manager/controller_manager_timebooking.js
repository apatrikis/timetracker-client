/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */

'use strict';

angular.module('ManagerTimeBooking', ['ngRoute',
    'tt.services.constants',
    'tt.services.employees',
    'tt.services.employees2roles',
    'tt.services.projects2employees',
    'tt.services.timerecords'])

.controller('ManagerControllerTimeBooking',
    ['$scope', 'ConstantsBookingStatesManager', 'ManagerProjects', 'TimeRecords', 'TimeRecordsProject',
    function ($scope, ConstantsBookingStatesManager, ManagerProjects, TimeRecords, TimeRecordsProject) {
        $scope.managerBookingStates = ConstantsBookingStatesManager;
        
        $scope.allProjects = ManagerProjects.findByManager({email:$scope.whoAmI.email});
        
        $scope.isReadOnly = true;
        
        $scope.showProject = function(project, readOnly) {
            $scope.selProject = project;
            $scope.allProjectBookings = TimeRecordsProject.findByProject({projectId:project.projectId}, function(){}, errorHandler);
            
            $scope.isReadOnly = readOnly;
        };
        
        $scope.setStatus = function(booking, newStatus) {
            booking.recordStatus = newStatus;
            TimeRecords.updateOne(booking, angular.noop, errorHandler);
        };
        
        function errorHandler(httpResponse) {
            alert("Check for undeleted references: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }])
;
