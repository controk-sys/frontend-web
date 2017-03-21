(function () {
  angular
    .module("controk")
    .config(config);

  config.$inject = ["$stateProvider", "$urlRouterProvider"];
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {url: "/"})
      // Clients
      .state("clients", {
        url: "/clients",
        templateUrl: "app/clients/list.html"
      })
      .state("clientCreation", {
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
      // Employees
      .state("employees", {
        url: "/employees",
        templateUrl: "app/employees/list.html"
      })
      .state("employeeCreation", {
        url: "/employees/create",
        templateUrl: "app/employees/create.html"
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
      // Products
      .state("products", {
        url: "/products",
        templateUrl: "app/products/list.html"
      })
      .state("productCreation", {
        url: "/products/create",
        templateUrl: "app/products/create.html"
      })
      .state("productDetail", {
        url: "/products/:id",
        templateUrl: "app/products/detail.html"
      })
      // Shipments
      .state("shipments", {
        url: "/shipments",
        templateUrl: "app/shipments/list.html"
      })
      // Suppliers
      .state("suppliers", {
        url: "/suppliers",
        templateUrl: "app/suppliers/list.html"
      })
      .state("supplierCreation", {
        url: "/suppliers/create",
        templateUrl: "app/suppliers/create.html"
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
})();
