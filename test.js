function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

//create a function that displays the user's location
function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}

//affiche le resultat dans la console
getLocation();