angular.module("controk")
    .service("Assets", ["$http", "urls",
        function ($http, urls) {
            this.getPlaceOptions = function () {
                return $http.get(urls.place_options);
            };
        }
    ]);