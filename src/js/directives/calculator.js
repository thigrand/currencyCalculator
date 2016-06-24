function onlyNumbers() {
"use strict";
  return {
    templateUrl: '',
    scope: {

    },
    bindToController: {
      ytUrl: '=',
      ytUrlIds: '=',
      videoObject: '=',
      currentVideoPage: '=',
      removeAction: '=',
      showFavorite: '=',
      filterFavorites: '=',
      boxPerPage: '='
    },
    controller: 'CalculatorController as main',
    link: function() {

    }
  };
}
angular.module('calculator').directive('onlyNumbers', [onlyNumbers]);
