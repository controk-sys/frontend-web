(() => {
  angular
    .module("controk")
    .service("Shipment", Shipment)

  Shipment.$inject = ["$http", "urls"]

  function Shipment($http, urls) {
    this.list = () => $http.get(urls.shipments)
  }
})()
