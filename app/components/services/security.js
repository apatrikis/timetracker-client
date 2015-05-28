/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.security', ['ngResource'])

.factory('ResetPassword', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/security/reset', {}, {
        resetPasswd:{method:'POST'}
    });
})

.factory('ChangePassword', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/security/change', {}, {
        changePasswd:{method:'POST'}
    });
})

.factory('Security', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/security', {}, {
        whoAmI:{method:'GET'}
    });
})
;
