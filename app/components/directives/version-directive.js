'use strict';

angular.module('tt.version.version-directive', ['tt.version'])

.directive('appVersion', ['ttVersion', function(ttVersion) {
  return function(scope, elm, attrs) {
    elm.text(ttVersion);
  };
}]);
