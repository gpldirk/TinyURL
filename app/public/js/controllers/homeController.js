angular.module("tinyurlApp")
    .controller("homeController", ["$window", "$scope", "$http", "$location",
        function ($window, $scope, $http, $location) {

        $scope.$watch(function () {
            return $window.sessionStorage.isLoggedIn;
        }, function (newValue, oldValue) {
            $scope.isLoggedIn = JSON.parse(newValue || false);
            if ($scope.isLoggedIn) {
                getMyUrls();
            }
        });

        $scope.submit = function () {
            if ($scope.isLoggedIn) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || {});
            } else {
                $http.defaults.headers.common.Authorization = undefined;
            }
            $http.post("/api/v1/urls", {
                longUrl: $scope.longUrl
            })
                .success(function (data) {
                    var shortUrl = data.shortUrl;
                    if ($scope.isLoggedIn){
                        var newUrl = data;
                        newUrl.shortUrlToShow = 'http://' + location.host + '/' + shortUrl;
                        newUrl.urlInfo = "/#/urls/" + shortUrl;
                        $scope.myUrls.push(newUrl);
                    } else {
                        $location.path("/urls/" + shortUrl);
                    }
                });
        };

        function getMyUrls() {
            $http.defaults.headers.common.Authorization = 'Bearer ' + JSON.parse($window.sessionStorage.token || {});
            $http.get('/api/v1/myUrls')
                .success(function (data) {
                    $scope.myUrls = data;
                    $scope.myUrls.forEach(function (url) {
                        url.shortUrlToShow = 'http://' + location.host + '/' + url.shortUrl;
                        url.urlInfo = "/#/urls/" + url.shortUrl;
                    })
                });
        }
    }]);