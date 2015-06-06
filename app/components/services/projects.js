/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.projects', [
    'ngResource',
    'tt.services.constants'])

.factory('Projects', function($resource, BaseURL){
    return $resource(BaseURL + '/projects', {}, {
        createOne:{method:'POST'},
        updateOne:{method:'PUT'},
        readAll:{method:'GET', isArray:true}
    });
})

.factory('Project', function($resource, BaseURL){
    return $resource(BaseURL + '/projects/:projectId', {projectId:'@projectId'}, {
        readOne:{method:'GET'},
        deleteOne:{method:'DELETE'}
    });
})

.factory('ManagerProjects', function($resource, BaseURL){
    return $resource(BaseURL + '/projects/employees/:email', {email:'@email'}, {
        findByManager:{method:'GET', isArray:true}
    });
})
;
