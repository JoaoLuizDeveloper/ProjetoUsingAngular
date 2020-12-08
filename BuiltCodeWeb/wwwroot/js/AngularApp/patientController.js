var app = angular.module('app', []);

app.controller('patientControllerRead', ['$scope', '$http', patientControllerRead]);
app.controller('patientControllerCreate', ['$scope', '$http', patientControllerCreate]);
app.controller('patientControllerUpdate', ['$scope', '$http', patientControllerUpdate]);
app.controller('patientControllerDelete', ['$scope', '$http', patientControllerDelete]);

function patientControllerRead($scope, $http) {

    $http.get('https://localhost:44387/api/v1/doctors').then(
        function successCallback(data) {
            var test = data.data;
            $scope.listdoctors = data.data;
        }, function errorCallback(data) {
            $scope.erro = "Erro: Não foi possivel Listar Patients";
        }
    )
}

function patientControllerCreate($scope, $http) {
    $http.get('https://localhost:44387/api/v1/doctors').then(
        function successCallback(data) {
            var test = data.data;
            $scope.listdoctors = data.data;
        }, function errorCallback(data) {
            $scope.erro = "Erro: Não foi possivel Listar Patients";
        }
    )
}

function patientControllerUpdate($scope, $http) {

    $http.get('https://localhost:44387/api/v1/doctors').then(
        function successCallback(data) {
            var test = data.data;
            $scope.listdoctors = data.data;
        }, function errorCallback(data) {
            $scope.erro = "Erro: Não foi possivel Listar Patients";
        }
    )
}

function patientControllerDelete($scope, $http) {

    $http.get('https://localhost:44387/api/v1/doctors').then(
        function successCallback(data) {
            var test = data.data;
            $scope.listdoctors = data.data;
        }, function errorCallback(data) {
            $scope.erro = "Erro: Não foi possivel Listar Patients";
        }
    )
}