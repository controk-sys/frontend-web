(() => {
  angular
    .module("controk")
    .controller("MainCtrl", MainCtrl)

  function MainCtrl($scope, $http, toastr) {
    "ngInject"
    // Function to upload coverage report: https://github.com/gotwarlost/istanbul-middleware#client-side-coverage
    $scope.buttonCoverage = eval("***codeCoverage***")
    $scope.uploadCoverageReport = () => {
      if ($scope.buttonCoverage) {
        $http.post("/coverage/client", window.__coverage__)
          .then(() => {
            // Do really nothing
          })
      } else {
        toastr.warning("Don't try to do anything stupid...")
      }
    }
  }
})()
