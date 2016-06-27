function onlyNumbers(dataAdjustment) {
    "use strict";
    return {
        restrict: 'A',
        link: function(scope, elm) {
            elm.on('keydown', function(event) {
                var $input = $(this);
                var value = $input.val();
                value = value.split(" ").join(""); //delete gaps from value
            });
            elm.on('keyup', function(event) {
                var $input = $(this);
                var value = $input.val();
                if (isNaN(parseFloat(value))) {
                    value = '0';
                }
                value = value.replace(/[^0-9,.]+/g, '');
                value = parseFloat(value.replace(",", ".")).toFixed(0).toString().replace(".", ",");

                $input.val(value.replace(/\B(?=(\d{3})+(?!\d))/g, " "));
                if (event.which == 64 || event.which == 16) {
                    // to allow numbers
                    return false;
                } else if (event.which >= 48 && event.which <= 57) {
                    // to allow numbers
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // to allow numpad number
                    return true;
                } else if ([8, 13, 27, 37, 38, 39, 40, 44, 46, 127].indexOf(event.which) > -1) {
                    // to allow backspace, enter, escape, arrows, dots and commas, delete
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    };
}
angular.module('calculator').directive('onlyNumbers', ['dataAdjustment', onlyNumbers]);
