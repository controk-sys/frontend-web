var app = angular.module("controk", ["ui.router"]);

app.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {url: "/"})
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