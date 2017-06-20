function initMap() {
   	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: true,
		streetViewControl: true,
	});

function buscar() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(exito, error);
		}
	}

	document.getElementById("findme").addEventListener("click", buscar);
	var latitud, longitud;

	var exito = function(posicion) {
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var image = 'assets/img/bici2.png';

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map,
			icon: image
		});

		map.setZoom(17);
		map.setCenter({lat:latitud, lng:longitud});
	}

	var error = function(e) {
		alert("Tenemos problemas para encontrar tu ubicación.");
	}

	/* AUTOCOMPLETADO */
	var inputO = (document.getElementById('origen'));
	var autocomplete = new google.maps.places.Autocomplete(inputO);
        autocomplete.bindTo('bounds', map);

    var inputD = (document.getElementById('destino'));
	var autocomplete = new google.maps.places.Autocomplete(inputD);
        autocomplete.bindTo('bounds', map);

	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    	
	//LLAMAR ID DE ENTRADAS	
	document.getElementById('origen').addEventListener('change', onChangeHandler);
	document.getElementById('destino').addEventListener('change', onChangeHandler);


	function trazarRuta(directionsService, directionsDisplay) {
        directionsService.route({
        	origin: document.getElementById('origen').value,
	        destination: document.getElementById('destino').value,
	        travelMode: 'DRIVING'
	        }, 
	    function(response, status) {
	     	if (status === 'OK') {
	        	directionsDisplay.setDirections(response);
	      	} else {
	            window.alert('No se encontró la ruta ' + status);
	        }
	    });
	}	

	directionsDisplay.setMap(map);
	var onChangeHandler = function(){
		trazarRuta(directionsService, directionsDisplay);
	};  
		
	document.getElementById("ruta").addEventListener("click", onChangeHandler); 
}