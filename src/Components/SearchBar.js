import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import SearchResults from './SearchResults';

function SearchBar({ accessToken }) {

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    async function search() {
        console.log("Searching for " + searchInput);

        // Get request using search to get the Artist ID
        var searchParameters = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        };

        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => {
                if (response.ok) {
                    //Parse the JSON data
                    return response.json();
                }
                throw new Error('Network Error');
            })
            .then(data => { return data.artists.items[0].id })
            .catch(error => {console.error(error)})

        // Get request with Artist ID grab all the albums from that artist
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=ID&limit=50', searchParameters)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network Error');
            })
            .then(data => {
                console.log(data);
                setSearchResults(data.items);
            })
    };

    return (
        <>
            <Container>
                <h1>The Jamming App</h1>
                <h4 style={{ marginBottom: "4rem" }}>A simple app using the Spotify API to search for albums</h4>
                <InputGroup className="mb-2" size="lg">
                    <FormControl
                        placeholder="Search for music..."
                        type="input"
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                search();
                            }
                        }}
                        onChange={({target}) => setSearchInput(target.value)}
                    />
                    <Button onClick={() => {console.log("Clicked button")}}>Search</Button>
                </InputGroup>
            </Container>
            <SearchResults searchResults={searchResults}/>
        </>
    )
};

export default SearchBar;