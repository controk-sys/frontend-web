angular.module("controk")
    .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("home", {url: "/"})
                .state("clients", {
                    url: "/clients",
                    templateUrl: "app/clients/list.html"
                })
                .state("clientDetail", {
                    url: "/clients/:id",
                    params: { // This data won't come from webservice but it is already available here
                        name: null,
                        email: null,
                        cpf: null,
                        observation: null
                    },
                    templateUrl: "app/clients/detail.html"
                })
                .state("employees", {
                    url: "/employees",
                    templateUrl: "app/employees/list.html"
                })
                .state("products", {
                    url: "/products",
                    templateUrl: "app/products/list.html"
                })
                .state("shipments", {
                    url: "/shipments",
                    templateUrl: "app/shipments/list.html"
                })
                .state("suppliers", {
                    url: "/suppliers",
                    templateUrl: "app/suppliers/list.html"
                });
            $urlRouterProvider.otherwise("/");
        }
    ]);