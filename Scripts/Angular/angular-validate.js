angular.module('app').controller('ValidateController', ['$scope', '$http', function ($scope, $http) {    

    $scope.Initialize = function() {
        $scope.IsProcessing = false;
        $scope.CurrentYear = new Date().getFullYear();
    }

    $scope.ValidateNif = function() {       
        if ($scope.IsProcessing == false && $scope.NifValue) {
            $scope.IsProcessing = true;
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
            $scope.IsProcessing = false;   
          }, function errorCallback() {
            $scope.ShowErrorRequest = true;
          });
    }

    $scope.Initialize();    
}]);