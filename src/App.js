import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/SearchBar';


function App() {

  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {

    fetch('/.netlify/functions/spotify-token')
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
