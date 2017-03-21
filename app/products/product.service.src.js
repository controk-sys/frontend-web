(() => {
  angular
    .module("controk")
    .service("Product", Product)

  Product.$inject = ["$http", "urls", "socket"]

  function Product($http, urls, socket) {
    this.list = () => $http.get(urls.products)
    this.retrieve = (id) => $http.get(`${urls.products + id}/`)

    this.create = (product) => {
      socket.emit("create product", product)
    }

    this.update = (product) => {
      socket.emit("update product", product)
    }
  }
})()
