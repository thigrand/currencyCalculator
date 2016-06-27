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

    function calculateStrings(string, number){
      var result = string.toString().split(" ").join("");
      result = result.replace(",", ".");
      result = result * number;
      return stringForInput(result);
    }

    function stringForInput(string) {
        var stringForInput = '';
        stringForInput = string.toString().split(" ").join("");
        if(isNaN(string)){
          stringForInput = '0';
        }
        stringForInput = stringForInput.replace(",", ".");
        stringForInput = parseFloat(stringForInput).toFixed(2).toString();
        return stringForInput.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    return {
        initData: initData,
        currencyList: currencyList,
        stringForInput: stringForInput,
        calculateStrings: calculateStrings
    };
}
angular.module('calculator').factory('dataAdjustment', ['$q', 'apiConnector', dataAdjustment]);
