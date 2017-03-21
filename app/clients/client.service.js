(function () {
  angular
    .module("controk")
    .service("Client", Client);

  Client.$inject = ["$http", "urls", "socket"];
  function Client($http, urls, socket) {
    this.list = function () {
      return $http.get(urls.clients);
    };

    this.retrieve = function (id) {
      return $http.get(urls.clients + id + "/");
    };

    this.info = function (id) {
      return $http.get(urls.clients + id + "/info/");
    };

    this.create = function (client) {
      socket.emit("create client", client);
    };

    this.update = function (client) {
      socket.emit("update client", client);
    };
  }
})();
