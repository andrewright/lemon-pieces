var testDirective = angular.module('formsGenerator', ['ngRoute']);

testDirective.controller('newPage', function ($scope) {
	$scope.toto = "Rototo";
	console.log($scope.toto);
});

testDirective.config(function ($routeProvider) {
	$routeProvider
		.when('/page/first', {templateUrl: 'blocks/testContentView.html'})
		.when('/page/second', {templateUrl: 'blocks/testContentView2.html'})
		.when('/page/third', {
			controller: 'newPage',
			templateUrl: 'blocks/testContentView2.html'
		})
});


testDirective.controller('getData', ['$scope', function ($scope) {
	$scope.data = {
		people: [
			{
				name: 'Vasja',
				age: 26,
				gender: 1
			},
			{
				name: 'Marina',
				age: 22,
				gender: 0
			},
			{
				name: 'Petja',
				age: 31,
				gender: 1
			}
		],
		genderValue: [
			{key: 0, value: 'Male'},
			{key: 1, value: 'Female'}
		]
	};
}]);
testDirective.directive('content', function () {
	return {
		restrict: 'E',
		templateUrl: 'blocks/formTpl.html',
		replace: true,

		scope: {
			data: '=',
			genders: '='
		}
	}
});
testDirective.directive('numberInput', function () {
	return {
		restrict: 'E',
		template: '<input type="text"/>',
		replace: true,
		require: 'ngModel',

		scope: {
			ngModel: '='
		},

		link: function (scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function (inputValue) {
				if (inputValue == undefined) return '';
				var transformedInput = inputValue.replace(/[^0-9]/g, '');
				if (transformedInput != inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}

				return transformedInput;
			});
		}
	}
});