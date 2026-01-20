let url = "https://api.weatherapi.com/v1/forecast.json?key=3d61eb9f416642b396750044261501&q=india&aqi=yes";
let input = document.querySelector("input");
let btn = document.querySelector("button");

async function getWeather(city) {
    try {
        let res = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=3d61eb9f416642b396750044261501&q=${city}&aqi=yes`
        );
        return res.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

btn.addEventListener("click", async () => {
    let info = await getWeather(input.value);
    show(info);
    let weatherType = getWeatherType(info.current.condition.code);
    setBackground(weatherType, info);
});

function show(info){
    let city = document.querySelector("#city");
    city.innerText = info.location.name;
    let country = document.querySelector("#country");
    country.innerText = info.location.country;
    let localTime = document.querySelector("#lt");
    localTime.innerText = info.location.localtime.split(" ")[1];
    let currTemp = document.querySelector("#temp");
    currTemp.innerText = info.current.temp_c + "°";
    let loca = document.querySelector("#location");
    loca.innerText = info.location.name;
    let overview = document.querySelector("#overview");
    overview.innerText = info.current.condition.text;
    let icon = document.querySelector("#icon");
    icon.src = "https:" + info.current.condition.icon;
    icon.alt = info.current.condition.text;
    let max = document.querySelector("#max");
    max.innerText = info.forecast.forecastday[0].day.maxtemp_c + "°";
    let min = document.querySelector("#min");
    min.innerText = info.forecast.forecastday[0].day.mintemp_c + "°";
    let humidity = document.querySelector("#humidity");
    humidity.innerText = info.current.humidity + "%";
    let cloudy = document.querySelector("#cloudy");
    cloudy.innerText = info.current.cloud + "%";
    let wind = document.querySelector("#wind");
    wind.innerText = info.current.wind_kph + "km/h"
}

function getWeatherType(code) {
    if (code === 1000) return "clear";

    if ([1003].includes(code)) return "partly-cloudy";

    if ([1006, 1009].includes(code)) return "cloudy";

    if (
        (code >= 1063 && code <= 1201) ||
        (code >= 1240 && code <= 1246)
    ) return "rain";

    if (code >= 1273 && code <= 1282) return "thunder";

    if (
        (code >= 1066 && code <= 1117) ||
        (code >= 1210 && code <= 1237) ||
        (code >= 1255 && code <= 1264)
    ) return "snow";

    if ([1030, 1135, 1147].includes(code)) return "fog";

    return "clear"; // fallback
}


function setBackground(weatherType, info){
    isDay = info.current.is_day;
    let bgImg = document.querySelector("#bgImg");
    let insight = document.querySelector("#innerInsight");
    if(weatherType == "clear" && isDay == 1){
        bgImg.setAttribute("src", "./assets/clear.png");
        insight.innerHTML = "A beautiful clear day with abundant sunshine. <br>Perfect weather for a walk, outdoor workouts, or simply enjoying the fresh air.";
    } else if(weatherType == "clear" && isDay == 0){
        bgImg.setAttribute("src", "./assets/clearNight.png");     
        insight.innerHTML = "Clear skies and a calm night ahead. <br>It's a great time to relax outdoors or enjoy a quiet evening walk under the stars.";
    } else if(weatherType == "partly-cloudy" && isDay == 1){
        bgImg.setAttribute("src", "./assets/partlyCloudy.png");
        insight.innerHTML = "A mix of sunshine and clouds throughout the day. <br>Comfortable conditions overall, with just enough sun to keep things pleasant.";
    } else if(weatherType == "partly-cloudy" && isDay == 0){
        bgImg.setAttribute("src", "./assets/partlyCloudyNight.png");
        insight.innerHTML = "A calm night with a few clouds drifting by. <br>Comfortable conditions overall, with occasional breaks in the clouds.";
    } else if(weatherType == "cloudy"){
        bgImg.setAttribute("src", "./assets/cloudy.png");
        insight.innerHTML = "Cloudy skies stick around through the day. <br>Temperatures stay comfortable, making it a calm and steady kind of weather.";
    } else if(weatherType == "rain"){
        bgImg.setAttribute("src", "./assets/rainy.png");
        insight.innerHTML = "Light rain sets in, bringing a fresh and cool feel. <br>Roads may be a bit slippery, so carry an umbrella if you’re heading out.";
    } else if(weatherType == "thunder"){
        bgImg.setAttribute("src", "./assets/thunderStorm.png");
        insight.innerHTML = "Stormy conditions with bursts of rain and thunder. <br>Outdoor plans may need a pause, so keep things flexible.";
    } else if(weatherType == "snow"){
        bgImg.setAttribute("src", "./assets/snowImg.png");
        insight.innerHTML = "Snowfall brings a quiet, wintry feel to the day. <br>Roads may be slippery, so take it slow if you’re heading out.";
    } else if(weatherType == "fog"){
        bgImg.setAttribute("src", "./assets/foggy.png");
        insight.innerHTML = "A layer of fog hangs in the air today. <br>Expect a cool, muted atmosphere with limited visibility at times.";
    }
}

input.addEventListener("keydown", (e) => {
    if(e.key == "Enter"){
        btn.click();
        input.value = "";
    }
});