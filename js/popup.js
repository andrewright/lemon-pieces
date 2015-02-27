//POPUP//
swissReApp.controller('CallPopup', function ($scope, $modal, $log) {

	$scope.open = function (size) {
		var modalInstance = $modal.open({
			templateUrl: 'view/blocks/popup.html',
			controller: 'PopupCtrl',
			size: size
		});

		modalInstance.result.then(function (newItem) {
			console.log(newItem);
			if (typeof $scope.items[newItem.id] == "undefined") {
				$scope.items[newItem.id] = newItem;
			} else {
				alert("toto error");
			}
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
			//$scope.reload()
		});
	};
});
swissReApp.directive('dateWidget', function () {
	return {
		restrict: 'E',
		templateUrl: 'view/blocks/dateWidget.html',
		replace: true,
		require: 'ngModel',

		scope: {
			dateFormat: '@'
		},


		link: function ($scope, element, attrs, modelCtrl) {
			//modelCtrl.$parsers.push(function (inputValue) {
			//	if (inputValue == undefined) return '';
			//	var transformedInput = inputValue.replace('/[^0-9]/g', '');
			//	if (transformedInput != inputValue) {
			//		modelCtrl.$setViewValue(transformedInput);
			//		modelCtrl.$render();
			//	}
			//	return transformedInput;
			//})
		}
	}
});

swissReApp.controller('PopupCtrl', function ($scope, $modalInstance) {
	$scope.config = {
		firstSelectOpt: ['Very', 'MC Dontalds', 'H&S'],
		secondSelectOpt: ['Assumed'],
		tmp: {}
	};

	$scope.today = function () {
		$scope.newEffectiveness = new Date();
	};

	$scope.clear = function () {
		$scope.newEffectiveness = null;
	};

	// Disable weekend selection
	$scope.disabled = function (date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function () {
		$scope.minDate = $scope.minDate ? null : new Date();
	};

	$scope.open = function ($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.ok = function () {

		if ($scope == $scope.newTreatyID) {

		}
		$modalInstance.close({
			"id": $scope.newTreatyID,
			"companyName": $scope.newCompanyName,
			"effectiveness": $scope.newEffectiveness,
			"treaty": $scope.newTreaty,
			"dataStatus": "Active"
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	function load() {
		$scope.today();
		$scope.toggleMin();
	}

	load();
});
//POPUP END//