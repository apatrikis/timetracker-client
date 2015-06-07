/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.constants', [])

.constant('BaseURL', window.location.protocol + '//localhost:' + window.location.port + '/timetracker-server/rest')

.constant('ConstantsRoles', ['USER', 'MANAGER', 'ADMIN'])

.constant('ConstantsBookingStatesUser', ['EDITING', 'READY_FOR_APPROVAL'])

.constant('ConstantsBookingStatesManager', ['REWORK', 'BOOKED'])
;
