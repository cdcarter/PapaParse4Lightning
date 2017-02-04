({
	init : function(component, event, helper) {
		var row = component.get('v.row');
        var colIdx = component.get('v.colIdx');
        
        component.set('v.data',row[colIdx]);
	}
})