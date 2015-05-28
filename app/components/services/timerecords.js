/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.timerecords', ['ngResource'])

.factory('TimeRecords', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/timerecords', {}, {
        createOne:{method:'POST'},
        updateOne:{method:'PUT'}
    });
})

.factory('TimeRecord', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/timerecords/:id', {id:'@id'}, {
        readOne:{method:'GET'},
        deleteOne:{method:'DELETE'}
    });
})

.factory('TimeRecordsProject', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/timerecords/find/project/:projectId', {projectId:'@projectId'}, {
        findByProject:{method:'GET', isArray:true}
    });
})

.factory('TimeRecordsOwner', function($resource){
    return $resource('http://localhost:8080/timetracker-server/rest/timerecords/find/owner/:email', {email:'email'}, {
        findByOwner:{method:'GET', isArray:true}
    });
})
;
