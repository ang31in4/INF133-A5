// Code for location fetching button
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".btn-icon").addEventListener("click", function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                // Reverse geocoding using OpenStreetMap's Nominatim API
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        // Retrieve the city and state/province from the address components
                        var city = data.address.city || data.address.town || data.address.village || "City not found";
                        var state = data.address.state || data.address.province || "State/Province not found";

                        // Combine city and state for display
                        document.getElementById("location-text").textContent = `${city}, ${state}`;
                    })
                    .catch(error => {
                        console.error('Error fetching location data:', error);
                        document.getElementById("location-text").textContent = "Failed to fetch location";
                    });
            }, function(error) {
                console.error('Geolocation error:', error);
                document.getElementById("location-text").textContent = "Location access denied";
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
});