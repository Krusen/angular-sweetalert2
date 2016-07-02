"use strict";

angular.module("MyApp", ["ngSweetAlert"])
       .controller("MyController", MyController);

// MyController.$inject = ["sweetAlert", "$timeout"];

function MyController(sweetAlert, $timeout, $q) {
    var vm = this;

    vm.info = info;
    vm.warning = warning;
    vm.error = error;
    vm.confirm = confirm;
    vm.show = show;
    vm.ajax = ajax;

    vm.value = 2;

    function info(title, text, timer) {
        sweetAlert.info(title, text, timer);
    }

    function warning(title, text, timer) {
        sweetAlert.warning(title, text, timer);
    }

    function error(title, text, timer) {
        sweetAlert.error(title, text, timer);
    }

    function confirm(title, text, type) {
        sweetAlert.confirm(title, text, type).then(accepted).catch(closed);
    }

    function show(title, text, type, timer) {
        sweetAlert.alert(title, text, type, timer).then(accepted).catch(closed);
    }

    function ajax(value) {
        return $q.when("accepted");

        return $timeout(function() {
            console.log("ajax", value);
        }, 2000);
    }

    function accepted() {
            console.log("OK");
            vm.value++;
    }

    function closed(dismiss) {
            console.log("Dismissed: " + dismiss);
            vm.value--;
    }
}
