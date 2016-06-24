function assistMethods() {
"use strict";
    function isInArray(arr, obj) {
        var is = arr.some(function(element) {
            return element.id === obj.id;
        });
        return is ? obj : arr[0];
    }
    function isFastAvailable(obj, array){
      // console.log(obj, array);
      var currencyPair = array.find(function(element){
        return element.currency_in.id === obj.currency_in.id && element.currency_out.id === obj.currency_out.id;

      });
      return currencyPair && currencyPair.super_fast_available === true ? true : false;
    }
    return {
        isInArray: isInArray,
        isFastAvailable: isFastAvailable
    };
}
angular.module('calculator').factory('assistMethods', [ assistMethods]);
