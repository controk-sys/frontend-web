(function () {
    var app = angular.module("controk", ["ngAnimate", "ui.router", "toastr", "ngMask"]);

    try {
        // Set socket
        app.value("socket", io.connect("***socketHost***"));
    } catch (error) {
        console.log("Couldn't connect to socket: \"" + error.message + "\".")
    }

    // Set the API urls
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "***apiURL***", false); // false for synchronous (guarantee that the app will have this values)
    xmlHttp.send();
    /**
     * @type {{clients, employees, products, shipments, suppliers}}
     */
    var urls = JSON.parse(xmlHttp.responseText);
    app.constant("urls", urls);

    app.controller("MainCtrl", ["$scope", "$http", "toastr", function ($scope, $http, toastr) {
        // Function to upload coverage report: https://github.com/gotwarlost/istanbul-middleware#client-side-coverage
        $scope.buttonCoverage = eval("***codeCoverage***");
        $scope.uploadCoverageReport = function () {
            if ($scope.buttonCoverage) {
                $http.post("/coverage/client", window.__coverage__).then(function () {
                })
            } else {
                toastr.warning("Don't try to do anything stupid...");
            }
        }
    }]);

    // Set socket listeners
    app.run(["socket", "toastr",
        function (socket, toastr) {
            // Socket events
            socket.on("create ok", function (message) {
                toastr.success(message);
            });
            socket.on("create failed", function (message) {
                toastr.error(message);
            });
            socket.on("update ok", function (message) {
                toastr.success(message);
            });
            socket.on("update failed", function (message) {
                toastr.error(message);
            });
        }
    ]);
})();