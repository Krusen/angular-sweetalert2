(function() {
    'use strict';

    angular
        .module('ngSweetAlert')
        .directive('sweetConfirm', sweetConfirm);

    /* @ngInject */
    function sweetConfirm() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: SweetConfirmController,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
                "title": "@swalTitle",
                "text": "@swalText",
                "type": "@swalType",
                "animation": "<?swalAnimation",
                "imageUrl": "@swalImageUrl",

                "confirmColor": "@swalConfirmColor",
                "cancelColor": "@swalCancelColor",
                "confirmText": "@swalConfirmText",
                "cancelText": "@swalCancelText",

                "allowOutsideClick": "<?swalAllowOutsideClick",
                "allowEscapeKey": "<?swalAllowEscapeKey",
                "reverseButtons": "<?swalReverseButtons",
                "showCloseButton": "<?swalShowCloseButton",

                "options": "<?swalOptions",

                "preConfirm": "<?swalPreConfirm",

                "onConfirm": "&swalOnConfirm",
                "onCancel": "&swalOnCancel",
                "onDismiss": "&swalOnDismiss",

                "confirmOptions": "<?swalConfirmOptions",
                "cancelOptions": "<?swalCancelOptions",
                "dismissOptions": "<?swalDismissOptions",
            }
        };
        return directive;

        function link(scope, element, attrs, vm) {
            if (attrs.swalPreConfirm && attrs.swalPreConfirm.length) {
                vm.hasPreConfirm = true;
            }

            element.on("click", function() {
                vm.showSweetAlert();
            });
        }
    }

    /* @ngInject */
    function SweetConfirmController(sweetAlert) {
        var vm = this;

        vm.showSweetAlert = showSweetAlert;

        function showSweetAlert() {
            var options = createOptions();

            sweetAlert.show(options)
                .then(onConfirmed)
                .catch(onDismissed);
        }

        function createOptions() {
            var options = {
                showCancelButton: true,

                title: vm.title,
                text: vm.text,
                type: vm.type,
                animation: vm.animation,
                imageUrl: vm.imageUrl,

                confirmButtonColor: vm.confirmColor,
                cancelButtonColor: vm.cancelColor,
                confirmButtonText: vm.confirmText,
                cancelButtonText: vm.cancelText,

                allowOutsideClick: vm.allowOutsideClick,
                allowEscapeKey: vm.allowEscapeKey,
                reverseButtons: vm.reverseButtons,
                showClosebutton: vm.showCloseButton
            };

            if (typeof(vm.preConfirm) === "function") {
                addPreConfirm(options, vm.preConfirm);
            }

            angular.extend(options, vm.options);

            return options;
        }

        function onConfirmed(result) {
            vm.onConfirm({result: result});
            
            if (vm.confirmOptions) { 
                sweetAlert.show(vm.confirmOptions);
            }
        }

        function onDismissed(dismiss) {
            if (dismiss === "cancel") {
                vm.onCancel();

                if (vm.cancelOptions) {
                    sweetAlert.show(vm.cancelOptions);
                }
            }

            vm.onDismiss({dismiss: dismiss});

            if (vm.dismissOptions) {
                sweetAlert.show(vm.dismissOptions);
            }
        }

        function addPreConfirm(options, preConfirm) {
            options.showLoaderOnConfirm = true;

            options.preConfirm = function(value) {
                return new Promise(preConfirmPromise);

                function preConfirmPromise(resolve, reject) {
                    vm.preConfirm(value)
                        .then(resolved)
                        .catch(rejected);

                    function resolved(result) { 
                        resolve(result); 
                    }

                    function rejected(reason) { 
                        reject(reason); 
                    }
                }
            };
        }
    }
})();