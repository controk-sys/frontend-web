(() => {
  angular
    .module("controk")
    .controller("MainCtrl", MainCtrl)

  MainCtrl.$inject = ["$scope", "$http", "toastr"]

  function MainCtrl($scope, $http, toastr) {
    // Function to upload coverage report: https://github.com/gotwarlost/istanbul-middleware#client-side-coverage
    $scope.buttonCoverage = eval("***codeCoverage***")
    $scope.uploadCoverageReport = () => {
      if ($scope.buttonCoverage) {
        $http.post("/coverage/client", window.__coverage__)
          .then(() => {
          })
      } else {
        toastr.warning("Don't try to do anything stupid...")
      }
    }
  }
})()
