	function UpdateMessages(){
		console.log('ups');
	    $.get("/floating-messages-update",function(responseTxt,statusTxt,xhr){
	     	if(statusTxt=="success") {
	     		console.log("Sucessful cargo: "+responseTxt);
	     		var div = document.createElement('div');
	     		div.innerHTML = responseTxt.trim();
	     		document.getElementById("holodeck").appendChild(div.firstChild);
	     		
	     	};
	     	if(statusTxt=="error") console.log("Error cargo: "+xhr.status+": "+xhr.statusText);
	    });
	};

	var loop = setInterval(UpdateMessages,1000);