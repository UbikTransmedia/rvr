	/* Chech owned cargos' IDs */
	var cargoListing = {"IDs": [0]};

	function UpdateCargos(){
		console.log('Updating cargos...');

		/* Send IDs list */
	    $.post("/cargos-update", cargoListing, function(responseCargos,statusTxt,xhr){

	    	/* Retrieve cargos */
	     	if(statusTxt=="success") {
	     		console.log("Cargos from server: "+responseCargos);

	     		/* Discern wether to add, keep or remove */

				var jsonCargosFromServer = JSON.parse(responseCargos);

				// for (var key in jsonCargosFromServer)
				// console.log(jsonCargosFromServer);
				Object.keys(jsonCargosFromServer).forEach(function(key) {

					// console.log('im at key '+key+'  ->'+jsonCargosFromServer[key]);
					var divClass = 'cargo-'+key;


					if(cargoListing["IDs"].includes(key) == true && jsonCargosFromServer[key] != ''){
						console.log('Already here: '+divClass);
					};

					if(cargoListing["IDs"].includes(key) == false && jsonCargosFromServer[key] != ''){
						var div = document.createElement('div');
						/*div.classList.add(divClass);*/
						/*var sanitizedContent = JSON.stringify(jsonCargosFromServer[key]);*/
						div.innerHTML = jsonCargosFromServer[key];
						/*div.innerHTML.firstChild.classList.add(divClass);*/
						document.getElementById("holodeck").appendChild(div.firstChild);
						cargoListing["IDs"].push(key);

						// console.log('jsonCargosFromServer[key]: ' + typeof jsonCargosFromServer[key]);
						// console.log(jsonCargosFromServer[key]);
						/*console.log('sanitizedContent: ' + typeof sanitizedContent);
						console.log(sanitizedContent);*/
						// console.log('div: ' + typeof div);
						// console.log(div);
						// console.log('Added: '+divClass);


					};

				});


				for (var id = 0; id < cargoListing["IDs"]; id++) {
					// console.log('last: '+Object.keys(jsonCargosFromServer));
					var divClass = 'cargo-'+key;
					if(Object.keys(jsonCargosFromServer).includes(key) == false){
						$(divClass).remove();
						console.log('Removed: '+divClass);
					};

				};


	     		/* var div = document.createElement('div');
	     		// div.innerHTML = responseCargos;
	     		// document.getElementById("holodeck").appendChild(div.firstChild);*/
	     		
	     	};

	     	if(statusTxt=="error") console.log("Error cargo: "+xhr.status+": "+xhr.statusText);
	    });
	};

	var loop = setInterval(UpdateCargos,1000);