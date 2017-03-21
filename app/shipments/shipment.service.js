(function () {
  angular
    .module("controk")
    .service("Shipment", Shipment);

  Shipment.$inject = ["$http", "urls"];
  function Shipment($http, urls) {
    this.list = function () {
      return $http.get(urls.shipments);
    };
  }
})();
