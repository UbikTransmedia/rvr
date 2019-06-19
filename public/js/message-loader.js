	function UpdateCargos(){
		console.log('ups');

		/* Chech owned cargos' IDs */
		var data = {"IDs": [1,7]};

		/* Send IDs list */
	    $.post("/cargos-update", data, function(responseCargos,statusTxt,xhr){

	    	/* Retrieve cargos */
	     	if(statusTxt=="success") {
	     		console.log("Cargos from server: "+responseCargos);

	     		/* Discern wether to add, keep or remove */


	      		/*jQuery.each(responseCargos, function(i, val) {
  					$("#" + i).append(document.createTextNode(" - " + val));
				 });*/

				var JSONCargos = JSON.parse(responseCargos);
				for (var key in JSONCargos){


					/* PENDING: check wether:
						implement cargo tracker: (IDs array that changes dinamically)
						client already has ID: do nothing.
						client does not have ID: add code.
						client has ID that server does not: remove div-ID

					*/


					/*var value = JSONCargos[key];
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