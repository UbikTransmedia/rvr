	/* Chech owned cargos' IDs */
	var cargoListing = {"IDs": [1,2]};

	function UpdateCargos(){
		console.log('ups');

		/* Send IDs list */
	    $.post("/cargos-update", cargoListing, function(responseCargos,statusTxt,xhr){

	    	/* Retrieve cargos */
	     	if(statusTxt=="success") {
	     		console.log("Cargos from server: "+responseCargos);

	     		/* Discern wether to add, keep or remove */


	      		/*jQuery.each(responseCargos, function(i, val) {
  					$("#" + i).append(document.createTextNode(" - " + val));
				 });*/

				var JSONCargos = JSON.parse(responseCargos);
				for (var key in JSONCargos){

					var divClass = 'cargo-'+key;


					/* PENDING: check wether:
						implement cargo tracker: (IDs array that changes dinamically)
						client already has ID: do nothing.
						client does not have ID: add code.
						client has ID that server does not: remove div-ID

					*/

					if(cargoListing["IDs"].includes(key) == true){
						console.log('Already here: '+divClass);
					};

					if(cargoListing["IDs"].includes(key) == false){
						var div = document.createElement('div');
						div.classList.add(divClass);
						div.innerHTML = JSON.stringify(JSONCargos[key]);
						document.getElementById("holodeck").appendChild(div.firstChild);
						cargoListing["IDs"].push(key);
						console.log('Added: '+divClass);


					};

					if(Object.keys(JSONCargos["IDs"]).includes(key) == false){
						$(divClass).remove();
						console.log('Removed: '+divClass);
					};


					/* var value = JSONCargos[key];
					console.log('key: '+key);
					console.log('value: '+value);
					document.write("<br> - " + key + ": " + value);*/
				};


	     		/* var div = document.createElement('div');
	     		// div.innerHTML = responseCargos;
	     		// document.getElementById("holodeck").appendChild(div.firstChild);*/
	     		
	     	};
	     	if(statusTxt=="error") console.log("Error cargo: "+xhr.status+": "+xhr.statusText);
	    });
	};

	var loop = setInterval(UpdateCargos,1000);