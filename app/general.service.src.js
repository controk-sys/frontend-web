(() => {
  angular
    .module("controk")
    .service("Assets", Assets)

  function Assets($http, urls) {
    "ngInject"
    this.getPlaceOptions = () => $http.get(urls.place_options)
  }
})()
