requirejs.config({
    paths: {
        Backbone: '../utils/libraries/backbone',
        jquery: '../utils/libraries/jquery',
        async: '../plugins/async'
    },
    shim: {
        'Backbone': {
            deps: ['../utils/libraries/lodash', 'jquery'], // load dependencies
            exports: 'Backbone' // use the global 'Backbone' as the module value
        }
    }
});


require(['../views/GeocoderView'], function(GeocoderView) {
    
    var geocoder = new GeocoderView();

    /*
    function geocode() {

        $('.geocode-map').show();

        var latitude = $('#js-lat');
        var longitude = $('#js-long');

        var lng = latitude.val(),
            lat = longitude.val();


        var coords = new google.maps.LatLng(lat, lng);

        var post_code = $("#js-postcode").val();

        var geocoder = new google.maps.Geocoder();

        if (post_code != '') {
            param = { 'address': post_code };
        }

        geocoder.geocode(param, function(results, status) {
            
            if (status == google.maps.GeocoderStatus.OK) {

                var office = results[0].geometry.location;


                options = {
                    zoom: 15, 
                    center: office, 
                    mapTypeControl: true,
                    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                mapElement = new google.maps.Map(document.getElementById("map"), options);
                
                marker = new google.maps.Marker({
                    position: office,
                    map: mapElement,
                    title: 'Selected Location',
                    draggable: true,
                    icon: ''
                });
        
                var infowindow = new google.maps.InfoWindow({ 
                    content: 'Location selected',
                    maxWidth: 100
                });
                
                
                var new_pos = marker.getPosition().toString();
                new_pos = new_pos.split( ", " );
                
                latitude.val(new_pos[0].substring(1));
                longitude.val(new_pos[1].substring(0, new_pos[1].length-1));
                
                
                google.maps.event.addListener(marker, 'dragend', function() { 
                    var new_pos = marker.getPosition().toString();
                    new_pos = new_pos.split( ", " );
                    
                    latitude.val(new_pos[0].substring(1));
                    longitude.val(new_pos[1].substring(0, new_pos[1].length-1));
                });
            }
        });

    }
    
    $('.js-geocode').on('click', function(e) {

        geocode();

    });
    */

});