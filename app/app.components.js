(function () {
  angular
    .module("controk")
    .component("buttonPlus", {
      templateUrl: "app/components/buttonPlus.html",
      bindings: {
        create: "="
      }
    })
    .component("buttonV", {
      templateUrl: "app/components/buttonV.html"
    });
})();
