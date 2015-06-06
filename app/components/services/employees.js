/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.employees', [
    'ngResource',
    'tt.services.constants'])

.factory('Employees', function($resource, BaseURL){
    return $resource(BaseURL + '/employees', {}, {
        createOne:{method:'POST'},
        readAll:{method:'GET', isArray:true}
    });
})

.factory('Employee', function($resource, BaseURL){
    return $resource(BaseURL + '/employees/:email', {email:'@email'}, {
        readOne:{method:'GET'},
        deleteOne:{method:'DELETE'}
    });
})
;
