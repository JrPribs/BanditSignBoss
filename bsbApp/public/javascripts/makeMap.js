function initialize(files) {
    var mapOptions = {
        center: {
            lat: 36.771805,
            lng: -76.244589
        },
        zoom: 10
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    files.forEach(function(file) {
        var image = 'images/' + file.file;
        var points = file.coords.split(' ');
        var marker = new google.maps.Marker({
            position: {
                lat: parseInt(points[0]),
                lng: parseInt(points[1])
            },
            map: map,
            icon: image,
            animation: google.maps.Animation.DROP,
            title: file.file
        });
        google.maps.event.addListener(marker, 'click', toggleBounce);
    });

}

function toggleBounce() {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
