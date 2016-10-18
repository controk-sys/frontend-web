var app = angular.module("controk", ["ui.router"]);

app.constant("apiHost", "***webservice_host***");

app.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                controller: "mainController"
            })
            .state("clients", {
                url: "/clients",
                templateUrl: "templates/clientsList.html",
                controller: "clientsController"
            })
            .state("employees", {
                url: "/employees",
                templateUrl: "templates/employeesList.html",
                controller: "employeesController"
            });
        $urlRouterProvider.otherwise('/');
    }
]);