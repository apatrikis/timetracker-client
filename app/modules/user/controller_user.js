/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */

'use strict';

angular.module('User', ['ngRoute',
    'tt.services.constants',
    'tt.services.timerecords',
    'tt.services.projects2employees'])

.controller('UserController',
    ['$scope', '$filter', 'ConstantsBookingStatesUser', 'TimeRecordsOwner', 'EmployeeProjects', 'TimeRecords', 'TimeRecord',
    function ($scope, $filter, ConstantsBookingStatesUser, TimeRecordsOwner, EmployeeProjects, TimeRecords, TimeRecord) {
        $scope.userBookingStates = ConstantsBookingStatesUser;
        
        $scope.allTimeRecords = TimeRecordsOwner.findByOwner({email:$scope.whoAmI.email});
        $scope.selEmployeeProjects = EmployeeProjects.readAllProjetcs({email:$scope.whoAmI.email});
        
        $scope.newBooking = {recordStatus:"READY_FOR_APPROVAL", recordCount:1, recordCountArray: [1, 2, 3, 4, 5]};
        
        $scope.createBooking = function() {
            for(var pos = 0; pos < $scope.newBooking.recordCount; pos++) {
                var startDateTime = new Date($scope.newBooking.startDate + "T" + $scope.newBooking.startTime.replace(/[,.-]/, ":") + ":00");
                var endDateTime = new Date($scope.newBooking.endDate + "T" + $scope.newBooking.endTime.replace(/[,.-]/, ":") + ":00");
                
                startDateTime.setDate(startDateTime.getDate() + pos);
                endDateTime.setDate(endDateTime.getDate() + pos);
                
                TimeRecords.createOne({owner:$scope.whoAmI,
                    project:$scope.newBooking.projectId,
                    startTime:startDateTime,
                    endTime:endDateTime,
                    pauseMinutes:$scope.newBooking.pauseMinutes,
                    recordStatus:$scope.newBooking.recordStatus}, reloadBookings, errorHandler);
            }
        };
        
        $scope.setBooking = function(timeRecord) {
            timeRecord.recordStatus = 'EDITING';
            TimeRecords.updateOne(timeRecord, function(timeRecord){
                $scope.editBooking = timeRecord;
                $scope.selBooking = {};

                $scope.selBooking.project = timeRecord.project;
                $scope.selBooking.startDate = $filter('date')(timeRecord.startTime, "yyyy-MM-dd");
                $scope.selBooking.startTime = $filter('date')(timeRecord.startTime, "HH:mm");
                $scope.selBooking.endDate = $filter('date')(timeRecord.endTime, "yyyy-MM-dd");
                $scope.selBooking.endTime = $filter('date')(timeRecord.endTime, "HH:mm");
                $scope.selBooking.pauseMinutes = timeRecord.pauseMinutes;
                $scope.selBooking.recordStatus = timeRecord.recordStatus;
            }, errorHandler);
        };
        
        $scope.updateBooking = function() {
            $scope.editBooking.project = $scope.selBooking.project;
            $scope.editBooking.startTime = new Date($scope.selBooking.startDate + "T" + $scope.selBooking.startTime.replace(/[,.-]/, ":") + ":00");
            $scope.editBooking.endTime = new Date($scope.selBooking.startDate + "T" + $scope.selBooking.startTime.replace(/[,.-]/, ":") + ":00");
            $scope.editBooking.pauseMinutes = $scope.selBooking.pauseMinutes;
            $scope.editBooking.recordStatus = $scope.selBooking.recordStatus;
            
            TimeRecords.updateOne($scope.editBooking, replaceBooking, errorHandler);
        };
        
        $scope.deleteBooking = function(timeRecord) {
            TimeRecord.deleteOne({id:timeRecord.id}, reloadBookings, errorHandler);
        };
        
        function reloadBookings() {
            $scope.allTimeRecords = TimeRecordsOwner.findByOwner({email:$scope.whoAmI.email});
        }
        
        function replaceBooking() {
            var bookingID = $scope.editBooking.id;
            for(var pos = 0; pos < $scope.allTimeRecords.length; pos++) {
                if($scope.allTimeRecords[pos].id === bookingID) {
                    $scope.allTimeRecords[pos] = $scope.editBooking;
                    $scope.editBooking = null;
                    $scope.selBooking = null;
                    return;
                }
            }
            errorHandler("Item not found in list, forcing reload.");
            reloadBookings();
        }
        
        function errorHandler(httpResponse) {
            alert("Check for undeleted references: (" + httpResponse.status + ": " + httpResponse.data + ")");
        }
    }]);