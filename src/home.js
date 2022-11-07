let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  //If input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=9fd7a449d055dba26a982a3220f32aa2`;
    //Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        result.innerHTML = `
       
        <h2>${data.name}</h2>
        <h1>${((data.main.temp-272.15)/1).toFixed(2)} &#176;</h1>
        <h4 class="weather">${data.weather[0].main}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        
        <div class="temp-container">
            <div>
                <h4 class="title">Wind Direction</h4>
                <h4 class="temp">${data.wind.deg}&#176;</h4>
            </div>
            <div>
                <h4 class="title">Wind Speed</h4>
                <h4 class="temp">${data.wind.speed} mph</h4>
            </div>
            <div>
                <h4 class="title">Height</h4>
                <h4 class="temp">${data.main.sea_level} h</h4>
            </div>
        </div>
        `;
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
        
      });
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);