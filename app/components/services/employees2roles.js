/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.employees2roles', ['ngResource'])

.factory('EmployeeRoles', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/e2r/', {}, {
        createOne:{method:'POST'}
    });
})

.factory('EmployeeRole', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/e2r/:id', {id:'@id'}, {
        deleteOne:{method:'DELETE'}
    });
})

.factory('EmployeeRolesFindByEmployee', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/e2r/employees/:email', {email:'@email'}, {
        findByEmployee:{method:'GET', isArray:true}
    });
})

.factory('EmployeeRolesFindByRole', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/e2r/roles/MANAGER', {roleName:'@roleName'}, {
        findByRole:{method:'GET', isArray:true}
    });
})
;
