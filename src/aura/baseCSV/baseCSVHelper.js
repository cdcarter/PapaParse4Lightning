({ 
	parse : function(component,thing) {
        var complete = $A.getCallback(function(results,file) {
				 console.log("Parsing complete:", results, file);
				 var data = results.data.slice(1).filter(function(row){
                 	return row[0];
            	 });
				 var headers = results.data[0];
				 component.set('v.rows',data);
				 component.set('v.headers',headers);
			})

        Papa.parse(thing,{complete: complete});
	}
})