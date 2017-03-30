(() => {
  angular
    .module("controk")
    .service("Client", Client)

  function Client($http, urls, socket) {
    "ngInject"
    this.list = () => $http.get(urls.clients)
    this.retrieve = (id) => $http.get(urls.clients + id + "/")
    this.info = (id) => $http.get(urls.clients + id + "/info/")

    this.create = function (client) {
      socket.emit("create client", client)
    }

    this.update = function (client) {
      socket.emit("update client", client)
    }
  }
})()
