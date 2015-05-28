/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.projects', ['ngResource'])

.factory('Projects', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/projects', {}, {
        createOne:{method:'POST'},
        updateOne:{method:'PUT'},
        readAll:{method:'GET', isArray:true}
    });
})

.factory('Project', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/projects/:projectId', {projectId:'@projectId'}, {
        readOne:{method:'GET'},
        deleteOne:{method:'DELETE'}
    });
})

.factory('ManagerProjects', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/projects/employees/:email', {email:'@email'}, {
        findByManager:{method:'GET', isArray:true}
    });
})
;
