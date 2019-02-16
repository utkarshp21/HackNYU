// Import the messaging module
import * as messaging from "messaging";

// Fetch the weather from OpenWeather
function queryOpenWeather(data) {
  console.log('Data:',data);
  fetch('http://localhost:3000/data',{
    method:'POST',
    data: JSON.stringify(data)
  })
  .then((r) => {
    console.log(r);
  })
  .catch((err) => {
    console.log(err);
  })
}

// Send the weather data to the device
function returnWeatherData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the device
    messaging.peerSocket.send(data);
  } else {
    console.log("Error: Connection is not open");
  }
}

// Listen for messages from the device
messaging.peerSocket.onmessage = function(evt) {
  console.log('Message',evt.data);
  if (evt.data) {
    // The device requested weather data
    queryOpenWeather(evt.data);
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}