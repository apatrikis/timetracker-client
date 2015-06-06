/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.employees2roles', [
    'ngResource',
    'tt.services.constants'])

.factory('EmployeeRoles', function($resource, BaseURL){
    return $resource(BaseURL + '/e2r/', {}, {
        createOne:{method:'POST'}
    });
})

.factory('EmployeeRole', function($resource, BaseURL){
    return $resource(BaseURL + '/e2r/:id', {id:'@id'}, {
        deleteOne:{method:'DELETE'}
    });
})

.factory('EmployeeRolesFindByEmployee', function($resource, BaseURL){
    return $resource(BaseURL + '/e2r/employees/:email', {email:'@email'}, {
        findByEmployee:{method:'GET', isArray:true}
    });
})

.factory('EmployeeRolesFindByRole', function($resource, BaseURL){
    return $resource(BaseURL + '/e2r/roles/MANAGER', {roleName:'@roleName'}, {
        findByRole:{method:'GET', isArray:true}
    });
})
;
