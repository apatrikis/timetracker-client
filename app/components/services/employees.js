/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.employees', ['ngResource'])

.factory('Employees', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/employees', {}, {
        createOne:{method:'POST'},
        readAll:{method:'GET', isArray:true}
    });
})

.factory('Employee', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/employees/:email', {email:'@email'}, {
        readOne:{method:'GET'},
        deleteOne:{method:'DELETE'}
    });
})
;
