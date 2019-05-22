var app = angular.module('tinyurlApp');

app.controller('headerController', function ($window, $scope, $uibModal) {

    $scope.isLoggedIn = JSON.parse($window.sessionStorage.isLoggedIn || false);
    $scope.username = JSON.parse($window.sessionStorage.username || "{}");

    function openLoginModal(loginType) {
        $uibModal.open({
            templateUrl: "./public/views/modal.html",
            controller: "modalController",
            size: "sm",
            resolve: {
                loginType: function () {
                    return loginType;
                }
            }
        }).result.then(function (user) {
            $scope.isLoggedIn = true;
            $scope.username = user.username;
            updateSessionStorage(user.username, user.token, true);
        })
    }

    function updateSessionStorage(username, token, isLoggedIn) {
        $window.sessionStorage.username = JSON.stringify(username);
        $window.sessionStorage.token = JSON.stringify(token);
        $window.sessionStorage.isLoggedIn = JSON.stringify(isLoggedIn);
    }

    $scope.signup = function () {
        openLoginModal("Sign Up");
    };

    $scope.login = function () {
        openLoginModal("Log In");
    };

    $scope.logout = function () {
        $scope.isLoggedIn = false;
        $scope.username = {};
        updateSessionStorage({}, {}, false);
    };
});