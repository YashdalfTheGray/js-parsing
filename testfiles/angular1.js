(function() {
    var module = angular.module('someModule');

    module.controller('SomeController', [
        '$scope', '$document', 'myService',
        function($scope, $document, myService) {
            $scope.stuff = 'why';
            myService.asyncCall().then(function() {
                $scope.stuff = 'bother';
            });
        }
    ]);

    module.directive('someDirective', function() {
        return {
            restrict: 'E',
            template: '<div>{{stuff}}</div>',
            controller: 'SomeController',
            scope: {}
        };
    });

    module.filter('someFilter', [
        '$translate',
        function($translate) {
            $translate;
        }
    ]);
})();
