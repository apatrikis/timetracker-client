/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.projects2employees', [
    'ngResource',
    'tt.services.constants'])

.factory('EmployeeProjects', function($resource, BaseURL){
    return $resource(BaseURL + '/p2e/employees/:email/projects', {email:'@email'}, {
        readAllProjetcs:{method:'GET', isArray:true},
        assignProject:{method:'POST'}
    });
})

.factory('EmployeeUnassignProject', function($resource, BaseURL){
    return $resource(BaseURL + '/p2e/employees/:email/projects/:projectId', {projectId:'@projectId', email:'@email'}, {
        unassignProject:{method:'DELETE'}
    });
})

.factory('ProjectEmployees', function($resource, BaseURL){
    return $resource(BaseURL + '/p2e/projects/:projectId/employees', {projectId:'@projectId'}, {
        readAllEmployees:{method:'GET', isArray:true},
        assignEmployee:{method:'POST'}
    });
})

.factory('ProjectUnassignEmployee', function($resource, BaseURL){
    return $resource(BaseURL + '/p2e/projects/:projectId/employees/:email', {projectId:'@projectId', email:'@email'}, {
        unassignEmployee:{method:'DELETE'}
    });
})
;
