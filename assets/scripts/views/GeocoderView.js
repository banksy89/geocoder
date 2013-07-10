define(['jquery', 'async!http://maps.google.com/maps/api/js?sensor=false', 'Backbone'], function ($) {

    return Backbone.View.extend({

        initialize: function() {

            this.latitude = $('#js-lat');
            this.longitude = $('#js-long');

        },

        // The view element itself
        el: $('body'),

        // Selectors are scoped to the parent element
        events: {
            'click .js-geocode' : 'geocode'
        },

        geocode: function() {

            $('.geocode-map').show();

            geocoder = new google.maps.Geocoder()

            var postcode = $('#js-postcode').val();

            var _this = this;

            geocoder.geocode({address: postcode}, function(results, status) {
                
                if (status == google.maps.GeocoderStatus.OK) {

                    var location = results[0].geometry.location;

                    options = {
                        zoom: 15, 
                        center: location, 
                        mapTypeControl: true,
                        mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    },

                    mapElement = new google.maps.Map(document.getElementById("map"), options);
                    
                    marker = new google.maps.Marker({
                        position: location,
                        map: mapElement,
                        title: 'Selected Location',
                        draggable: true,
                        icon: ''
                    });

                    
                    var new_pos = marker.getPosition().toString();
                    new_pos = new_pos.split( ", " );
                    
                    _this.latitude.val(new_pos[0].substring(1));
                    _this.longitude.val(new_pos[1].substring(0, new_pos[1].length-1));
                    
                    // Going to move _this into own function
                    google.maps.event.addListener(marker, 'dragend', function() { 

                        var new_pos = marker.getPosition().toString();
                        new_pos = new_pos.split( ", " );
                        
                        _this.latitude.val(new_pos[0].substring(1));
                        _this.longitude.val(new_pos[1].substring(0, new_pos[1].length-1));
                    });
                }
            });
        }

    }); 

});