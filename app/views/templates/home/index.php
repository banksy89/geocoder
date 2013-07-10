<h1>Geocoder</h1>
<form>
	<label for="js-postcode">Postcode</label>
	<input type="text" name="postcode" id="js-postcode" class="postcode">
	<input type="button" class="js-geocode" value="Go!">
	<div class="geocode-map" style="display: none;">
		<p>Click and Drag the Marker to change the Coordinates</p>
		<div id="map" style="width: 100%; border: 1px solid #ccc;height: 500px;margin-top: 30px;"></div>
		<label for="js-lat">Lattitude:</label><input type="text" id="js-lat">
		<label for="js-long">Longitude:</label><input type="text" id="js-long">
	</div>
</form>
