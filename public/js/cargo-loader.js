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
						var divClass = 'cargo-'+key;
						console.log('Creating...');
						var div = document.createElement('div');
						/*div.classList.add(divClass);*/
						/*var sanitizedContent = JSON.stringify(jsonCargosFromServer[key]);*/
						div.innerHTML = jsonCargosFromServer[key].trim();

						console.log(div.innerHTML);
						console.log(typeof div.innerHTML);
						console.log(div.firstChild);
						console.log(typeof div.firstChild);
						/*div.innerHTML.setAttribute("class", divClass);*/
						div.firstChild.classList.add(divClass);
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


				//Object.keys(jsonCargosFromServer).forEach(function(key) {
					// for (var id = 0; id < cargoListing["IDs"].length; id++) {
					// 	// console.log('last: '+Object.keys(jsonCargosFromServer));
					// 	var divClass = 'cargo-'+key;
					// 	//console.log('Time to remove: '+divClass);
					// 	console.log(Object.keys(jsonCargosFromServer));
					// 	console.log('key: '+key);
					// 	console.log('key typeof: '+ typeof key); //string
					// 	console.log('jsonCargosFromServer key typeof: '+ typeof jsonCargosFromServer[key]) //string
					// 	//console.log('key in jsonCargosFromServer: '+ (key in Object.keys(jsonCargosFromServer)));
						
					// 	// if(!Object.keys(jsonCargosFromServer).includes(key)){
					// 	// 	document.getElementsByClassName(divClass).remove();
					// 	// 	/*$(divClass).remove();*/
					// 	// 	console.log('Removed: '+divClass);
					// 	// };

					// 	if(!(key in jsonCargosFromServer)){
					// 		document.getElementsByClassName(divClass).remove();
					// 		/*$(divClass).remove();*/
					// 		console.log('Removed: '+divClass);
					// 	};

					// };

				//});


				cargoListing["IDs"].forEach(function (id, index) {
					var divClass = 'cargo-'+id;
					if(!(id in jsonCargosFromServer)){
						console.log(document.getElementsByClassName(divClass));
						var toRemove = document.getElementsByClassName(divClass);
						/*$(divClass).remove();*/
						/*$('#holodeck').remove(toRemove);*/
						toRemove.firstChild.remove();
						console.log($('#holodeck'));
						console.log('Removed: '+divClass);
					};

				});


	     		/* var div = document.createElement('div');
	     		// div.innerHTML = responseCargos;
	     		// document.getElementById("holodeck").appendChild(div.firstChild);*/
	     		
	     	};

	     	if(statusTxt=="error") console.log("Error cargo: "+xhr.status+": "+xhr.statusText);
	    });
	};

	var loop = setInterval(UpdateCargos,1000);