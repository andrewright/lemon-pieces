var swissReApp = angular.module('swissReApp', ['ui.bootstrap', 'ngRoute']);

swissReApp.controller('swissReData', ['$scope', '$http', function ($scope, $http) {
	$scope.items = {};
	$http.get('js/base.json').success(function (data) {
		$scope.items = data;
	});

	$scope.selectCounter = 0;
	$scope.selectedToDelete = {};

	$scope.select = function (selectedId) {
		var $target = $(event.target);
		var $targetRow = $target.closest('tr');
		var $deleteBut = $('.treaty-delete');

		if ($target.is(':checked')) {
			$scope.selectCounter++;
			$scope.selectedToDelete[selectedId] = selectedId;

			$targetRow.addClass('selected');
			$deleteBut.prop("disabled", false);

		} else {
			$targetRow.removeClass('selected');
			$scope.selectCounter--;
			delete $scope.selectedToDelete[selectedId];

			if (typeof $scope.selectedToDelete[selectedId] == "undefined") {
				$deleteBut.prop("disabled", true);
			}

		}
	};

	$scope.deleteRow = function () {
		if ($scope.selectedToDelete) {
			for (key in $scope.selectedToDelete) {
				delete $scope.items[key];
			}
			$scope.selectCounter = 0;
			$(event.target).prop("disabled", true);
		} else {
			console.log("Nothing to delete!");
		}
	};

	$scope.titles = {
		"id": "Treaty Id",
		"companyName": "Company name",
		"effectiveness": "Effectiveness",
		"treaty": "Treaty",
		"dataStatus": "Active"
	};


	$scope.orderProp = 'id';

	$scope.config = {
		currentPage: 1,
		numPerPage: 2,
		maxSize: 10,
		bigCurrentPage: 1,
		perPageFilter: [1, 2, 5, 30, 50]
	};

	$scope.pageChanged = function () {
	};
}]);

swissReApp.filter('startFrom', function () {
	return function (input, config) {
		var sliced = {};
		var i = 0;
		var start = (config.currentPage - 1) * config.numPerPage;
		var end = start + config.numPerPage;

		for (var key in input) {
			if (i >= start && i < end) {
				sliced[key] = input[key];
			}
			i++;
		}

		config.numElements = i;

		return sliced;
	}
});

swissReApp.directive('numberInput', function () {
	return {
		restrict: 'E',
		template: '<input type="text"/>',
		replace: true,
		require: 'ngModel',

		link: function ($scope, element, attrs, modelCtrl) {
			modelCtrl.$parsers.push(function (inputValue) {
				if (inputValue == undefined) return '';
				var transformedInput = inputValue.replace('/[^0-9]/g', '');
				if (transformedInput != inputValue) {
					modelCtrl.$setViewValue(transformedInput);
					modelCtrl.$render();
				}
				return transformedInput;
			})
		}
	}
});