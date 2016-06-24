function dataAdjustment($q, apiConnector) {
"use strict";
    function initData() {
        return $q.all(
            [apiConnector.fetchData("/api/calculator/countries"),
                apiConnector.fetchData("/api/calculator/countries/2/destinations"),
                apiConnector.fetchData("/api/calculator/currencies/2/1"),
                apiConnector.fetchData("/api/calculator/exchange-rate/GBP/PLN/100")
            ]);
    }

    function uniqueNames(array) {
        var obj = {};
        var newArr = [];
        var searchedProperty = "name";
        for (var i = 0; i < array.length; i += 1) {
            obj[array[i][searchedProperty]] = array[i];
        }
        for (i in obj) {
            newArr.push(obj[i]);
        }
        return newArr;
    }

    function currencyList(array, property) {
        var newArr = array.map(function(element) {
            return element[property];
        });
        return uniqueNames(newArr);
    }

    function findCurrencyOut(name, array) {
        console.log(name, array);
    }
    return {
        initData: initData,
        currencyList: currencyList,
        findCurrencyOut: findCurrencyOut
    };
}
angular.module('calculator').factory('dataAdjustment', ['$q', 'apiConnector', dataAdjustment]);
