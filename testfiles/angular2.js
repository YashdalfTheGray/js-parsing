(function() {
    angular.module('someModule')
    .controller('SomeController', [
        '$scope', '$document', 'myService',
        function($scope, $document, myService) {
            $scope.stuff = 'why';
            myService.asyncCall().then(function() {
                $scope.stuff = 'bother';
            });
        }
    ])
    .directive('someDirective', function() {
        return {
            restrict: 'E',
            template: '<div>{{stuff}}</div>',
            controller: 'SomeController',
            scope: {}
        };
    })
    .filter('someFilter', [
        '$translate',
        function($translate) {
            $translate;
        }
    ]);
})();
