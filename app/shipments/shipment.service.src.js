(() => {
  angular
    .module("controk")
    .service("Shipment", Shipment)

  function Shipment($http, urls) {
    "ngInject"
    this.list = () => $http.get(urls.shipments)
  }
})()
