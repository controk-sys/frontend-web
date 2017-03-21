(() => {
  angular
    .module("controk")
    .service("Employee", Employee)

  Employee.$inject = ["$http", "urls", "socket"]
  function Employee($http, urls, socket) {
    this.list = () => $http.get(urls.employees)
    this.retrieve = (id) => $http.get(`${urls.employees + id}/`)
    this.info = (id) => $http.get(`${urls.employees + id}/info`)

    this.create = function (employee) {
      socket.emit("create employee", employee)
    }

    this.update = function (employee) {
      socket.emit("update employee", employee)
    }
  }
})()
