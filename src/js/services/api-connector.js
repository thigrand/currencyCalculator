function apiConnector($q, $http) {
"use strict";
    function fetchData(path) {
        return $q(function(resolve, reject) {
            $http.get('http://127.0.0.1:3000' + path, {
                    'accept': 'application/json, text/plain, /*'
                })
                .then(function(data) {
                    resolve(data);
                }, function(err) {
                    reject(err);
                    console.error("err", err);
                });
        });
    }
    return {
        fetchData: fetchData
    };
}
angular.module('calculator').factory('apiConnector', ['$q', '$http', apiConnector]);
