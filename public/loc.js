const deviceId = "id"; // Remplacez ceci par votre UUID généré

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    fetch('http://localhost:3003/api/addWatchedLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            deviceId: deviceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

getLocation();
