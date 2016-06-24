function onlyNumbers() {
    "use strict";
    return {
        restrict: 'A',
        link: function(scope, elm ) {
            elm.on('keyup', function(event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9,.]+/g, '').replace(".",",");
            //     console.log(event);
                console.log("start", value, typeof value);
            //     // parseFloat(value.replace(",",".")).toFixed(2).toString();
            //     // var temp = parseFloat(value.replace(",",".")).toFixed(2);
            //     // console.log(temp);
            //     // value = temp;


            //.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                if((value === 'undefined' || value === 'null' || isNaN(value)) && typeof value !== 'string'){
                  value = 0;
                }
            //     // console.log( parseFloat(value.replace(",",".")).toFixed(2).toString());
            //
            //        // commas, not dots
            //        // gaps
            //        //only numbers and dots, commas
            //     console.log("end", value, typeof value);
                $input.val(value);
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
angular.module('calculator').directive('onlyNumbers', [onlyNumbers]);
