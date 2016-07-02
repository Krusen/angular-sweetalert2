(function() {
    "use strict";

    if (angular.isUndefined(window.swal)) {
        throw "Please inlcude SweetAlert2 js and css from http://limonte.github.io/sweetalert2/";
    }

    angular.module("ngSweetAlert")
        .factory("sweetAlert", sweetAlert);

    sweetAlert.$inject = ["$q"];

    function sweetAlert($q) {
        var service = {
            info: info,
            success: success,
            warning: warning,
            error: error,
            alert: alert,
            show: show,

            confirm: confirm,
            input: input,

            close: close,

            resetDefaults: resetDefaults,
            setDefaults: setDefaults
        };

        return service;

        /////////////////////////////////

        // Prompt/input directive
        // HTML content
        // Inputs (text, email, password, textarea, select, radio, checkbox)
        // Ajax (preConfirm)
        // Chaining modals

        function success(title, text, timer, options) {
            return service.alert(title, text, "success", timer, options);
        }

        function info(title, text, timer, options) {
            return service.alert(title, text, "info", timer, options);
        }
        
        function warning(title, text, timer, options) {
            return service.alert(title, text, "warning", timer, options);
        }

        function error(title, text, timer, options) {
            return service.alert(title, text, "error", timer, options);
        }

        function confirm(title, text, type, confirmText, cancelText, options) {
            options = options || {};
            options.title = title;
            options.text = text;
            options.type = type;
            options.showCancelButton = true;
            options.confirmButtonText = confirmText;
            options.cancelButtonText = cancelText;

            return service.show(options);
        }

        function input() {

        }

        // dismiss can be 'cancel', 'overlay', 'close', 'timer'

        
        /**
         * Shows SweetAlert
         * 
         * @param {string} [title]
         * @param {string} [text]
         * @param {string} [type] - success|info|warning|error|question
         * @param {number} [timer]
         * @returns Angular promise
         */
        function alert(title, text, type, timer, options) {
            options = options || {};
            options.title = title;
            options.text = text;
            options.type = type;
            options.timer = timer;

            return service.show(options);
        }

        function show(options) {
            deleteUndefinedProperties(options);

            var deferred = $q.defer();
            swal(options).then(confirmed, dismissed);
            return deferred.promise;

            function confirmed(result) {
                deferred.resolve(result); 
            }

            function dismissed(dismiss) {
                deferred.reject(dismiss);
            }
        }

        function close() {
            swal.close();
        }

        function resetDefaults() {
            swal.resetDefaults();
        }

        function setDefaults(options) {
            swal.setDefaults(options);
        }

        function deleteUndefinedProperties(obj) {
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;
                if (obj[prop] === undefined) {
                    delete obj[prop];
                }
            }
        }
    }
})();