(() => {
  angular
    .module("controk")
    .service("Product", Product)

  function Product($http, urls, socket) {
    "ngInject"
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
