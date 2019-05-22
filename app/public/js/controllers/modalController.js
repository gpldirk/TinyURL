var app = angular.module('tinyurlApp');

app.controller('modalController', function ($scope, $http, $uibModalInstance, loginType) {

    $scope.loginType = loginType;

    $scope.ok = function () {
        if (loginType === "Sign Up") {
            var url = "/api/v1/signup";
            authenticate(url);
        } else if (loginType === "Log In"){
            var loginUrl = "/api/v1/login";
            authenticate(loginUrl);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    function authenticate(postUrl) {
        $http.post(postUrl, {
            username: $scope.username,
            password: $scope.password //TODO: use https!!!!
        }).success(function (data) {
            var user = {
                username: $scope.username,
                token: data.token
            };
            $uibModalInstance.close(user);
        })
    }
});