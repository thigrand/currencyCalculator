function money() {
"use strict";
    return function(item) {
        //replace dots to commas and make gaps on tousends
        return item.toFixed(2).toString().replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
}
angular.module('calculator').filter('money', [money]);
