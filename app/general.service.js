(function () {
  angular
    .module("controk")
    .service("Assets", Assets);

  Assets.$inject = ["$http", "urls"];
  function Assets($http, urls) {
    this.getPlaceOptions = function () {
      return $http.get(urls.place_options);
    };
  }
})();
