document.addEventListener('DOMContentLoaded', function() {
    const temperatureField = document.querySelector(".temperature");
    const locationField = document.querySelector(".location");
    const dateandTimeField = document.querySelector(".datetime");
    const conditionField = document.querySelector(".weather_condition");
    const searchField = document.querySelector(".search_area");
    const form = document.querySelector('form');

    form.addEventListener('submit', searchForLocation);
    let target = 'Udupi'; // default city

    const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=8f1c781bb8a94694b71171336242203&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error("City not found");
        }

        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        temperatureField.innerText = "--";
        locationField.innerText = "Unknown Location";
        dateandTimeField.innerText = "";
        conditionField.innerText = error.message;
    }
};


    function updateDetails(temp, locationName, time, condition) {
        let [date, currentTime] = time.split(' ');
        let currentDay = getDayName(new Date(date).getDay());

        temperatureField.innerText = `${temp}°C`;
        locationField.innerText = locationName;
        dateandTimeField.innerText = `${currentTime} - ${currentDay}, ${date}`;
        conditionField.innerText = condition;
    }

    function searchForLocation(e) {
        e.preventDefault();
        target = searchField.value;
        fetchResults(target);
    }

    fetchResults(target);
});

function getDayName(number) {
    switch(number) {
        case 0: return 'Sunday';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
    }
}
