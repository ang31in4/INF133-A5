// Code for time feature
document.addEventListener("DOMContentLoaded", function() {
    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();

        // Get current hours, minutes, and seconds
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour format to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12

        // Format time to always display two digits for minutes and seconds
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

        // Update the clock element
        clockElement.textContent = formattedTime;
    }

    // Update the clock every second
    setInterval(updateClock, 1000);

    // Call updateClock once immediately to avoid delay on page load
    updateClock();
});

// Function to get and display the current month and day
function displayCurrentDate() {
    const currentDate = new Date();

    // Array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get the current month (0-based index, so we don't need to add 1)
    const currentMonth = monthNames[currentDate.getMonth()];
    // Get the current day of the month
    const currentDay = currentDate.getDate();

    // Format the date string
    const formattedDate = `${currentMonth} ${currentDay}`;

    // Update the content of the div
    document.getElementById("current-date").textContent = formattedDate;
}

// Call the function to display the date when the page loads
displayCurrentDate();

// Code for immediate location retrieval when starting website
document.addEventListener("DOMContentLoaded", function () {
    // Location Retrieval
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
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
        }, function (error) {
            console.error('Geolocation error:', error);
            document.getElementById("location-text").textContent = "Location access denied";
        });
    } else {
        document.getElementById("location-text").textContent = "Geolocation not supported";
    }

    // Weather Retrieval
    const apiKey = "562df18821f94a6995e55836242611";
    const weatherDiv = document.getElementById("weather");

    async function fetchWeather(lat, lon) {
        try {
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }
            const data = await response.json();

            // Extract weather information
            const temperature = `${data.current.temp_f}°F`;
            const condition = data.current.condition.text;

            // Update the #weather div
            weatherDiv.innerHTML = `${temperature}: ${condition}`;
        } catch (error) {
            weatherDiv.textContent = `Error: ${error.message}`;
        }
    }

    // Fetch weather once geolocation is available
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(lat, lon);
    });
});


