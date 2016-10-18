app
    .controller("ClientCtrl", ["$scope", "Client",
        function($scope, Client) {
            Client.list().then(function(response) {
                $scope.clients = response.data;
            });
        }
    ])
    .controller("EmployeeCtrl", ["$scope", "Employee",
        function($scope, Employee) {
            Employee.list().then(function(response) {
                $scope.employees = response.data;
            });
        }
    ])
    .controller("ProductCtrl", ["$scope", "Product",
        function($scope, Product) {
            Product.list().then(function(response) {
                $scope.products = response.data;
            });
        }
    ])
    .controller("ShipmentCtrl", ["$scope", "Shipment",
        function($scope, Shipment) {
            Shipment.list().then(function(response) {
                $scope.shipments = response.data;
            });
        }
    ])
    .controller("SupplierCtrl", ["$scope", "Supplier",
        function($scope, Supplier) {
            Supplier.list().then(function(response) {
                $scope.suppliers = response.data;
            });
        }
    ]);