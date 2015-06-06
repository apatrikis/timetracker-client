/* 
 * PRODYNA PAC 2015 - Time Tracker
 * Anastasios Patrikis
 */
'use strict';

angular.module('tt.services.timerecords', [
    'ngResource',
    'tt.services.constants'])

.factory('TimeRecords', function($resource, BaseURL){
    return $resource(BaseURL + '/timerecords', {}, {
        createOne:{method:'POST'},
        updateOne:{method:'PUT'}
    });
})

.factory('TimeRecord', function($resource, BaseURL){
    return $resource(BaseURL + '/timerecords/:id', {id:'@id'}, {
        readOne:{method:'GET'},
        deleteOne:{method:'DELETE'}
    });
})

.factory('TimeRecordsProject', function($resource, BaseURL){
    return $resource(BaseURL + '/timerecords/find/project/:projectId', {projectId:'@projectId'}, {
        findByProject:{method:'GET', isArray:true}
    });
})

.factory('TimeRecordsOwner', function($resource, BaseURL){
    return $resource(BaseURL + '/timerecords/find/owner/:email', {email:'email'}, {
        findByOwner:{method:'GET', isArray:true}
    });
})
;
