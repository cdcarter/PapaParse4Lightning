({
	parse : function(component,thing,config) {
		if(!config.complete) {
			config.complete = function(results,file) {
				 console.log("Parsing complete:", results, file);
				 var data = results.data.slice(1).filter(function(row){
                 	return row[0];
            	 });
				 var headers = results.data[0];
				 component.set('v.rows',data);
				 component.set('v.headers',data);
			}
		}
		Papa.parse(thing,config);
	}
})