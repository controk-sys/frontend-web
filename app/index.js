var app = angular.module("controk", ["ui.router"]);

app.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {url: "/"})
            .state("clients", {
                url: "/clients",
                templateUrl: "components/clientsList.html",
                controller: "clientsController"
            })
            .state("employees", {
                url: "/employees",
                templateUrl: "components/employeesList.html",
                controller: "employeesController"
            });
        $urlRouterProvider.otherwise('/');
    }
]);