<h1>Geocoder.</h1>
<form>
	<label for="js-postcode">Postcode: </label>
	<input type="text" name="postcode" id="js-postcode" class="postcode">
	<input type="button" class="js-geocode" value="Go!">
	<div class="geocode-map">
		<p class="inform-heading">Drag and Drop the Marker to change the Coordinates.</p>
		<div id="map" class="map-canvas"></div>
		<div class="coords">
			<h2>Your Coordinates:</h2>
			<label for="js-lat">Lattitude:</label><input type="text" id="js-lat">
			<label for="js-long">Longitude:</label><input type="text" id="js-long">
		</div>
	</div>
</form>
