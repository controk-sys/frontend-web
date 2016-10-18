var app = angular.module("controk", ["ui.router"]);

var apiHost = "***apiHost***";
app.constant("apiHost", apiHost);

// Get the endpoint urls
var xmlHttp = new XMLHttpRequest();
/** data = {
 *      clients: "clients url",
 *      employees: "employees url"
 *  }
 */
xmlHttp.open("GET", apiHost, false); // false for synchronous (guarantee that the app will have this values)
xmlHttp.send();
apiHost = undefined; // delete the variable
app.constant("urls", JSON.parse(xmlHttp.responseText));

app.config(["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {url: "/"})
            .state("clients", {
                url: "/clients",
                templateUrl: "../templates/clientsList.html",
                controller: "ClientCtrl"
            })
            .state("employees", {
                url: "/employees",
                templateUrl: "../templates/employeesList.html",
                controller: "EmployeeCtrl"
            });
        $urlRouterProvider.otherwise('/');
    }
]);