# WORK IN PROGRESS

I haven't had neither the time nor the need to finish this yet, so use at your own risk for now.

## Missing or incomplete features

 - Directives:
   - Prompt
   - HTML content
 - Inputs (text, email, password, textarea, select, radio, checkbox
 - Ajax (preConfirm)
 - Chaining modals

## Examples

```html

<body ng-app="MyApp">

    <div ng-controller="MyController as vm">
        
        <!-- Simple modals -->
        <p ng-click="vm.info('HI!', 'Info message', 2000)">Info (timer 2s)</p>
        <p ng-click="vm.warning('HI!', 'Warning')">Warning</p>
        <p ng-click="vm.show('HI!', 'Without type')">Show (no type)</p>
        <p ng-click="vm.show('HI!', 'Question type', 'question')">Show (with type)</p>
        <p ng-click="vm.show('HI!', 'Question type', 'warning', 2000)">Show (with type and timer)</p>
        <p ng-click="vm.confirm('HI!', 'Question type', 'question')">Confirm</p>
        
        <!-- Confirm dialog -->
        <a sweet-confirm 
            swal-title="Hi" 
            swal-text="{{vm.value}}" 
            swal-confirm-text="OKAY Så {{vm.value}}" 
            swal-on-confirm="vm.warning('OH OH', result)" 
            swal-on-cancel="vm.info('Cancelled')" 
            swal-on-dismiss="vm.error(dismiss)"
            swal-pre-confirm="vm.ajax"
            swal-confirm-color="#ffF000">
            swal-confirm directive
        </a>
    </div>

</body>
```
