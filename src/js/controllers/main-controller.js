function CalculatorController(dataAdjustment, apiConnector, assistMethods) {
"use strict";
    var main = this;
    // data
    main.country = {
        list: [],
        country_in: {
            id: 2,
            name: "Wielka Brytania",
            is_preferred: true,
            default_currency: {
                id: 3,
                name: "GBP"
            }
        },
    };
    main.destination = {
        list: [],
        country_out: {
            id: 1,
            name: "Polska",
            is_preferred: true,
            default_currency: {
                id: 1,
                name: "PLN"
            }
        }
    };
    main.currency = {
        currency_in: {
            id: 3,
            name: "GBP"
        },
        currency_out: {
            id: 1,
            name: "PLN"
        },
        rate: 0,
        list_in: [],
        list_out: []
    };
    main.exchange = {
        money_in: 100,
        money_out: 0,
    };
    main.super_fast_available = false;
    main.remittance = [];
    main.remittanceSpeed = "fast";

    main.reCalculate = function (side) {
      // console.log(main);
      if(typeof main.exchange.money_in === 'string' || typeof main.exchange.money_out === 'string'){
        main.exchange.money_in = parseFloat(main.exchange.money_in.toString().replace(",","."));
        main.exchange.money_out = parseFloat(main.exchange.money_out.toString().replace(",","."));

      }
      // console.log( main.exchange.money_in,  main.exchange.money_out );
        if (side === "in") {
            main.exchange.money_out = (main.exchange.money_in * main.currency.rate).toFixed(2).toString();
        } else {
            main.exchange.money_in = (main.exchange.money_out / main.currency.rate).toFixed(2).toString();
        }
      // console.log( main.exchange.money_in,  main.exchange.money_out );
    };
    main.reRate = function reRate() {
        if(!main.currency.currency_out){
          main.currency.currency_out = assistMethods.isInArray(main.currency.list_out, main.destination.country_out.default_currency);
        }
        apiConnector.fetchData("/api/calculator/exchange-rate/" +
            main.currency.currency_in.name + "/" +
            main.currency.currency_out.name + "/" +
            main.exchange.money_in).then(function(response) {
            var rate = response.data.rate;
            main.currency.rate = response.data.is_inverse ? (1 / rate) : rate;
            main.super_fast_available = assistMethods.isFastAvailable(main.currency, main.remittance);
            main.reCalculate('in');
        });
    };
    main.changeCountry = function changeCountry() {
        var currencyOutput = main.currency.currency_out;
        main.exchange.money_in = 100;
        main.reRate();
        apiConnector.fetchData("/api/calculator/currencies/" +
            main.country.country_in.id + "/" +
            main.destination.country_out.id).then(function(response) {
            var currencyArray = response.data;
            main.remittance = currencyArray;
            main.super_fast_available = assistMethods.isFastAvailable(main.currency, currencyArray);
            main.currency.list_in = dataAdjustment.currencyList(currencyArray, "currency_in");
            main.currency.list_out = dataAdjustment.currencyList(currencyArray, "currency_out");
            main.currency.currency_in = currencyArray[0].currency_in;
            main.currency.currency_out = currencyOutput;
        });
    };
    main.changeDestination = function changeDestination() {
      main.exchange.money_in = 100;
      main.reRate();
      apiConnector.fetchData("/api/calculator/currencies/" +
          main.country.country_in.id + "/" +
          main.destination.country_out.id).then(function(response) {
          var currencyArray = response.data;
          main.remittance = currencyArray;
          console.log("changeDestination", main);
          main.super_fast_available = assistMethods.isFastAvailable(main.currency, currencyArray);
          main.currency.list_out = dataAdjustment.currencyList(currencyArray, "currency_out");
          main.currency.currency_out = assistMethods.isInArray(main.currency.list_out, main.destination.country_out.default_currency);
          console.log(main.currency.currency_out);
      });
    };

    dataAdjustment.initData().then(function(response) {
        var initData = response.map(function(element) {
            return element.data;
        });
        main.country.list = initData[0];
        main.destination.list = initData[1];
        main.currency.list_in = dataAdjustment.currencyList(initData[2], "currency_in");
        main.currency.list_out = dataAdjustment.currencyList(initData[2], "currency_out");
        main.currency.rate = initData[3].rate;
        main.exchange.money_out = main.exchange.money_in * main.currency.rate;
    });
}
angular.module('calculator').controller('CalculatorController', ['dataAdjustment', 'apiConnector', 'assistMethods', CalculatorController]);
