module.exports = function(o){
	var obj = o;
	this.get = function(str){
		try{
			var props = str.split(".");	
			var r = obj;
			props.forEach(function(prop){
				r = r[prop];
			});
			if(r) return r;
			else return null;
		}
		catch(error){
			return null;
		}
	}
	this.extractFromArray = function(arrstr, prop, conditions){
		var array = this.get(arrstr);
		var result = [];
        array.forEach(function(elem){	
        	try{
        		//TEST CONDITIONS
	        	var vCondition = true;
	        	for(var key in conditions){
	        		var keySubelement = elem;
	        		var props = key.split(".");
	        		try{
		        		props.forEach(function(p){
			        		keySubelement = keySubelement[p];	
			        	});
			        	var viableAttributes = conditions[key].split(",");
			        	if(viableAttributes.indexOf(keySubelement) == -1){
			        		vCondition = false;
			        	}
	        		}
	        		catch(error){
	        			vCondition = false;
	        		}
	        	}
	        	//GET PROPERTIES
	        	if(vCondition){
	        		var mprops = prop.split(",");
	        		var subresult;
	        		if(mprops.length > 1) subresult = [];
	        		mprops.forEach(function(property){
	        			property = property.trim();
	        			var subelement = elem;
	        			var props = property.split(".");
	        			try{
		        			props.forEach(function(p){
			        			subelement = subelement[p];	
			        		});
			        		if(mprops.length > 1){
			        			if(subelement) subresult.push(subelement);
			        			else subresult.push(null);
			        		}
			        		else subresult = subelement;
		        		}catch(error){
		        			if(mprops.length > 1) subresult.push(null);
		        			else subresult = null;
		        		}
	        		})
	        		result.push(subresult);
	        	} 

        	}
        	catch(error){

        	}
        });
        return result;
	}
}
