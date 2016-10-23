app
    .controller("ClientCtrl", ["$scope", "Client",
        function($scope, Client) {
            Client.list().then(function(response) {
                /**
                 * @type {{id, name, email, cpf, observation}}
                 */
                $scope.clients = response.data;
            });
        }
    ])
    .controller("EmployeeCtrl", ["$scope", "Employee",
        function($scope, Employee) {
            Employee.list().then(function(response) {
                /**
                 * @type {{id, name, role, email, cpf, observation}}
                 */
                $scope.employees = response.data;
            });
        }
    ])
    .controller("ProductCtrl", ["$scope", "Product",
        function($scope, Product) {
            Product.list().then(function(response) {
                /**
                 * @type {{id, name, description, cost, sell_value}}
                 */
                $scope.products = response.data;
            });
        }
    ])
    .controller("ShipmentCtrl", ["$scope", "Shipment",
        function($scope, Shipment) {
            Shipment.list().then(function(response) {
                /**
                 * @type {{id, delivery_date, payment_date, order_date}}
                 */
                $scope.shipments = response.data;
            });
        }
    ])
    .controller("SupplierCtrl", ["$scope", "Supplier",
        function($scope, Supplier) {
            Supplier.list().then(function(response) {
                /**
                 * @type {{id, trading_name, email, cnpj}}
                 */
                $scope.suppliers = response.data;
            });
        }
    ]);