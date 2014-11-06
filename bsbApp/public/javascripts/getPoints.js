$(document).ready(function() {
    function makePoints(callback) {
        var points = [];
        $('img.points').each(function() {
            var loc = $(this).data('coords');
            var file = $(this).data('file');
            points.push({
                coords: loc,
                file: file
            });
        });
        callback(points);
    }

    function initialize(points) {
        var myLatlng = new google.maps.LatLng(36.771805, -76.244589);
        var mapOptions = {
            center: myLatlng,
            zoom: 5
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        for (var i = 0; i < points.length; i++) {
            var image = 'images/' + points[i].file;
            var latlng = points[i].coords.split(' ');
            var marker = new google.maps.Marker({
                position: {
                    lat: parseFloat(latlng[0]),
                    lng: parseFloat(latlng[1])
                },
                map: map,
                animation: google.maps.Animation.DROP,
                title: points[i].file
            });
            google.maps.event.addListener(marker, 'click', toggleBounce);
        };

        function toggleBounce() {
            if (marker.getAnimation() != null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }
    }
    makePoints(function(points) {
        google.maps.event.addDomListener(window, 'load', initialize(points));
    });
});
