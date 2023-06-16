$(document).ready(function() {
    $('#search-btn').on('click', function() {
      var cityName = $('#city-input').val();
      if (cityName !== '') {
        getWeather(cityName);
      }
    });
  
    function getWeather(cityName) {
      var apiKey = '888ace630fd17aa79b0b7f1942d10e1c'; // Вставьте ваш API-ключ OpenWeatherMap здесь
      var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  
      fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          showWeather(data);
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
    }
  
    function showWeather(data) {
      if (data.cod === '404') {
        $('#city-name').text('City not found');
        $('#weather-info').empty();
      } else {
        var cityName = data.name;
        var temperature = data.main.temp;
        var description = data.weather[0].description;
  
        $('#city-name').text(cityName);
        $('#weather-info').html(`Temperature: ${temperature} &#8451;<br>Weather: ${description}`);
      }
    }
  });
