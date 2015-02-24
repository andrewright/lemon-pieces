/*testS CODE*/
swissReApp.directive('habraHabr', function () {
	return function ($scope, element, attrs) {
		/*Задаем функцию, которая будет вызываться при изменении переменной word*/
		$scope.$watch(attrs.habraHabr, function (value) {
			element.text(value + attrs.habra);
		});
	}
});

swissReApp.controller('forExampleController', ['$scope', function ($scope) {
	$scope.word = "Habrahabra"
}]);


swissReApp.directive('myNewDirct', function () {
	return {
		link: function (scope, element, attrs) {

		},
		priority: 0,
		terminal: false,
		template: '<div></div>',
		templateUrl: 'template.html',
		replace: false,
		transclude: false,
		restrict: 'A',
		scope: false,
		controller: function ($scope, $element, $attrs, $transclude, otherInjectables) {

		}
	}
});
/*testS CODE*/