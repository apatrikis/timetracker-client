/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.constants', [])

.constant('ConstantsRoles', ['USER', 'MANAGER', 'ADMIN'])

.constant('ConstantsBookingStatesUser', ['EDITING', 'READY_FOR_APPROVAL'])

.constant('ConstantsBookingStatesManager', ['REWORK', 'BOOKED'])
;
