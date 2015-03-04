(function() {
    'use strict';

    angular.module('demo.module', ['demo.controller'])
        .run(['$rootScope', function($rootScope) {
            console.log('demo.module running');
        }]);
})();
