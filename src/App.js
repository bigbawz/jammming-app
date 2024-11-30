import './App.css';
import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/SearchBar';

const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";

function App() {

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // API Access token
    var authorizationParameters = {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type' : 'client_credentials',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
      }
    };

    fetch('https://accounts.spotify.com/api/token', authorizationParameters)
      .then(response => {
        if (response.ok) {
          // Parse the JSON data
          return response.json();
        }
        // Throws error if response is not ok
        throw new Error('Network Error');
      })
      .then(data => setAccessToken(data.access_token))
      .catch(error => {console.error(error)}) // Handle any errors that occured during the fetch or response parsing
  }, [])

  return (
    <div className="App">
      <SearchBar accessToken={accessToken}/>
    </div>
  );
}

export default App;
