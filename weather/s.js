const apiKey = 'b4370f8c89ea35808fdbcafef2e5d041';

document.getElementById('get-weather').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  const resultDiv = document.getElementById('weather-result');
  if (!city) {
    resultDiv.textContent = "Please enter a city name.";
    return;
  }
  resultDiv.textContent = "Loading...";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      resultDiv.textContent = `The weather in ${city} is ${temp}°C`;
    })
    .catch(() => {
      resultDiv.textContent = "City not found or API error.";
    });
});