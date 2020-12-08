var app = angular.module('app', []);

app.controller('doctorController', ['$scope', '$http', doctorController]);

function doctorController($scope, $http) {

    $http.get('api/1/doctors').success(
        function (data) {
            $scope.listadoctors = data;
        }).error(function () {
            $scope.erro = "Erro: Não foi possivel Listar Doctors";
        })
}