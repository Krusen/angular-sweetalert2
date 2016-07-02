(function() {
    'use strict';

    angular
        .module('ngSweetAlert')
        .directive('sweetPrompt', sweetPrompt);

    sweetPrompt.$inject = [''];
    
    function sweetPrompt() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: SweetPromptController,
            controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            scope: {
                "title": "@",
                "text": "@",
                "type": "@",
                "confirmText": "@",
                "cancelText": "@",
                "onConfirm": "&",
                "onCancel": "&",
                "onDismiss": "&"
            }
        };
        return directive;
        
        function link(scope, element, attrs, vm) {
            element.on("click", function() {
                vm.runSweetAlert();
            });
        }
    }
    /* @ngInject */
    function SweetPromptController () {
        
    }
})();