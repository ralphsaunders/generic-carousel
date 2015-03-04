(function() {
    'use strict';

    angular.module('demo.controller', ['slider.directive'])
        .controller('demoController', ['$scope', '$rootScope', '$window', function($scope, $rootScope, $window) {
            $scope.slides = $window.slides || [];
        }]);
})();
