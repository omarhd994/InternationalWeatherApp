function obtenerTiempo() {
    const ciudad = document.getElementById("ciudad").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => mostrarResultado(data))
        .catch(error => console.error("Error al obtener datos del tiempo:", error));
}

function mostrarResultado(data) {
    const resultadoDiv = document.getElementById("resultado");
    let emoji = ""

    if (data.cod === "404") {
        resultadoDiv.innerHTML = `<p>Ciudad no encontrada. Introduce una ciudad válida.</p>`;
    } else {
        const nombreCiudad = data.name;
        const temperatura = Math.round(data.main.temp - 273.15);// Redondear a numero entero y Convertir de Kelvins a Celsius con -273.15
        const sensacionTermica =  Math.round(data.main.feels_like - 273.15); 
        const humedad = data.main.humidity;
        const descripcion = data.weather[0].description;
        const minTemp = Math.round(data.main.temp_min - 273.15);
        const maxTemp = Math.round(data.main.temp_max - 273.15);
        const meanTemp = (minTemp + maxTemp)/2;
        const velocidadViento = Math.round(data.wind.speed * 3,6); // Pasar de metros por segundo a km/h

        if (descripcion.includes("cloud")) {
            emoji = "☁️"
        } else if (descripcion.includes("clear")){
            emoji = "☀️"
        } else if (descripcion.includes("rain")) {
            emoji = "🌧️"
        } else if (descripcion.includes("snow")) {
            emoji = "🌨️"
        }

        resultadoDiv.innerHTML = `<p>City: ${nombreCiudad}</p>
                                  <p>Temperature: ${temperatura}°C</p>
                                  <p>${descripcion + emoji}</p>
                                  <p>Feels like: ${sensacionTermica}°C</p>
                                  <p>Min. Temp: ${minTemp}°C</p>
                                  <p>Max. Temp: ${maxTemp}°C</p>
                                  <p>Mean. Temp: ${meanTemp}°C</p>
                                  <p>Humidity: ${humedad}%</p>
                                  <p>Viento: ${velocidadViento}km/h</p>`;
                                
    }           
}

document.getElementById("botonObtenerTiempo").addEventListener("click", obtenerTiempo);
