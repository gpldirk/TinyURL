angular.module("tinyurlApp")
    .controller("urlController", ["$scope", "$http", "$routeParams",
        function ($scope, $http, $routeParams) {

        var socket = io.connect();

        $http.get("/api/v1/urls/" + $routeParams.shortUrl)
            .success(function (data) {
                $scope.longUrl = data.longUrl;
                $scope.shortUrl = data.shortUrl;
                $scope.shortUrlToShow = "http://localhost/" + data.shortUrl;
                socket.emit('registerShortUrl', $scope.shortUrl);
            });


        function getTotalClicks() {
            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks")
                .success(function (data) {
                    $scope.totalClicks = data;
                });
        }

        getTotalClicks();

        $scope.getTime = function (time) {
            $scope["lineData"] = [];
            $scope["lineLabels"] = [];

            $scope.time = time;
            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + time)
                .success(function (data) {
                    data.forEach(function (item) {
                        var legend = "";
                        if (time === "hour") {
                            if (item._id.minutes < 10) {
                                item._id.minutes = "0" + item._id.minutes;
                            }
                            legend = item._id.hour + ":" + item._id.minutes;
                        }
                        if (time === "day") {
                            legend = item._id.hour + ":00";
                        }
                        if (time === "month") {
                            legend = item._id.month + "/" + item._id.day;
                        }
                        $scope.lineLabels.push(legend);
                        $scope.lineData.push(item.count);
                    });
                });
        };

        $scope.getTime("hour");


        var renderChart = function (chart, infos) {
            $scope[chart + "Data"] = [];
            $scope[chart + "Labels"] = [];
            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + infos)
                .success(function (data) {
                    data.forEach(function (info) {
                        $scope[chart + "Data"].push(info.count);
                        $scope[chart + "Labels"].push(info._id);
                    });
                });
        };

        renderChart("doughnut", "referer");
        renderChart("pie", "country");
        renderChart("base", "platform");
        renderChart("bar", "browser");

        socket.on('shortUrlUpdated', function () {
            getTotalClicks();
            $scope.getTime($scope.time);
            renderChart("doughnut", "referer");
            renderChart("pie", "country");
            renderChart("base", "platform");
            renderChart("bar", "browser");
        });

    }]);