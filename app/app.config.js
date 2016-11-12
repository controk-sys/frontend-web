angular.module("controk")
    .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("home", {url: "/"})
                .state("clients", {
                    url: "/clients",
                    templateUrl: "app/clients/list.html"
                })
                .state("createClient", {
                    url: "/clients/create",
                    templateUrl: "app/clients/create.html"
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
                .state("employeeDetail", {
                    url: "/employees/:id",
                    params: { // This data won't come from webservice but it is already available here
                        name: null,
                        email: null,
                        cpf: null,
                        role: null,
                        observation: null
                    },
                    templateUrl: "app/employees/detail.html"
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
                })
                .state("supplierDetail", {
                    url: "/suppliers/:id",
                    params: { // This data won't come from webservice but it is already available here
                        trading_name: null,
                        email: null,
                        cnpj: null
                    },
                    templateUrl: "app/suppliers/detail.html"
                });
            $urlRouterProvider.otherwise("/");
        }
    ]);