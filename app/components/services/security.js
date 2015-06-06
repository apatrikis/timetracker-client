/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.security', [
    'ngResource',
    'tt.services.constants'])

.factory('ResetPassword', function($resource, BaseURL){
    return $resource(BaseURL + '/security/reset', {}, {
        resetPasswd:{method:'POST'}
    });
})

.factory('ChangePassword', function($resource, BaseURL){
    return $resource(BaseURL + '/security/change', {}, {
        changePasswd:{method:'POST'}
    });
})

.factory('Security', function($resource, BaseURL){
    return $resource(BaseURL + '/security', {}, {
        whoAmI:{method:'GET'}
    });
})
;
