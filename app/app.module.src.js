(function () {
    var app = angular.module("controk", ["ngAnimate", "ui.router", "toastr", "ngMask"]);

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