function resizibleSelect($window) {
    "use strict";
    return {
        restrict: 'A',
        link: function(scope, elm) {
          elm.on('click', function(event){
            var countryLength = $(this).children("option").filter(":selected").text().length;
            $(this).css("width", (countryLength + 3) + "rem");
          });
        }
    };
}
angular.module('calculator').directive('resizibleSelect', ['$window', resizibleSelect]);
