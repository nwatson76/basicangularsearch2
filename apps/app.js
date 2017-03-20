
var app = angular.module('cpms', ['simplePagination']);


//establish data factory to be used by all controllers
app.factory("dataFactory", [
    "$http", function ($http) {

        var urlBase = "";
        var dataFactory = {};

        //used to show all results
        dataFactory.getPatientResults = function () {
            return $http.get(urlBase + "data.json");
        };

        return dataFactory;
    }
]);