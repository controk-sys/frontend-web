(function() {
    var app = angular.module("controk", ["ui.router", "toastr"]);

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

    // Set socket listeners
    app.run(["socket", "toastr",
        function(socket, toastr) {
            // Socket events
            socket.on("update ok", function(message) {
                toastr.success(message);
            });
        }
    ]);
})();