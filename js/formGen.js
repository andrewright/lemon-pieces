/*formGet CODE*/
/*swissReApp.controller('newPage', function ($scope, $routeParams) {
 $scope.toto = "Rototo" + $routeParams.pageNumber;
 console.log($scope.toto, $routeParams.pageNumber);

 });*/

/*swissReApp.config(function ($state, $stateProvider, $routeProvider) {

	$stateProvider.state('first', {
		templateUrl: 'view/blocks/formTpl.html'
	})
});*/

swissReApp.controller('getData', ['$scope', function ($scope) {
	$scope.data = {
		treatyCount: 4,
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
swissReApp.directive('content', function () {
	return {
		restrict: 'E',
		templateUrl: 'view/blocks/formTpl.html',
		replace: true,

		scope: {
			data: '=',
			genders: '='
		}
	}
});
swissReApp.directive('numberInput', function () {
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
/*formGet CODE*/