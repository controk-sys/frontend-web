var app = angular.module("controk", ["ui.router"]);

// App constants
app.constant("socket", io.connect("***socketURL***")); // "io" from the imported socket

// Get the API urls
var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "***apiURL***", false); // false for synchronous (guarantee that the app will have this values)
xmlHttp.send();
/**
 * @type {{clients, employees, products, shipments, suppliers}}
 */
var urls = JSON.parse(xmlHttp.responseText);
app.constant("urls", urls);

app.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {url: "/"})
            .state("clients", {
                url: "/clients",
                templateUrl: "templates/clientsList.html",
                controller: "ClientCtrl"
            })
            .state("employees", {
                url: "/employees",
                templateUrl: "templates/employeesList.html",
                controller: "EmployeeCtrl"
            })
            .state("products", {
                url: "/products",
                templateUrl: "templates/productsList.html",
                controller: "ProductCtrl"
            })
            .state("shipments", {
                url: "/shipments",
                templateUrl: "templates/shipmentsList.html",
                controller: "ShipmentCtrl"
            })
            .state("suppliers", {
                url: "/suppliers",
                templateUrl: "templates/suppliersList.html",
                controller: "SupplierCtrl"
            });
        $urlRouterProvider.otherwise('/');
    }
]);