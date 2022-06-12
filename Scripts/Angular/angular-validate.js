angular.module('app').controller('ValidateController', ['$scope', '$http', function ($scope, $http) {    

    $scope.Initializing = function() {
        $scope.HasProcessed = false;
        $scope.ResponseApi = {};
    }

    $scope.Validate = function() {
        let isValid = $scope.ValidateFieldMandatory();

        if (isValid) {
            $scope.RequestApi();
        }   
    }

    $scope.RequestApi = function() {
        $http({
            method: 'GET',
            url: 'https://nifvalidator-api.azurewebsites.net/Validate?nif=' + $scope.NifValue
          }).then(function successCallback(response) {
            $scope.ResponseApi = response.data;
            $scope.SearchNif = $scope.NifValue;
            $scope.HasProcessed = true;    
          }, function errorCallback() {
            $scope.ShowErrorRequest = true;
          });
    }

    $scope.ValidateFieldMandatory = function() {
        let isValid = !$scope.NifValue ? false : true;
        $scope.NifFieldIsBlank = !isValid;
        return isValid;
    }

    $scope.Initializing();    
}]);