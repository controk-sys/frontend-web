(function () {
  angular
    .module("controk")
    .service("Product", Product);

  Product.$inject = ["$http", "urls", "socket"];
  function Product($http, urls, socket) {
    this.list = function () {
      return $http.get(urls.products);
    };

    this.retrieve = function (id) {
      return $http.get(urls.products + id + "/");
    };

    this.create = function (product) {
      socket.emit("create product", product);
    };

    this.update = function (product) {
      socket.emit("update product", product);
    };
  }
})();
