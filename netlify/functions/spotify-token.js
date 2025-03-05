const { Buffer } = require("buffer"); // Required for encoding credentials

// Netlify function that handles requests
exports.handler = async function () {

    // Get Spotify API credentials from Netlify environment variables (kept secure)
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

    // Create URL-encoded parameters for the authentication request
    const authParams = new URLSearchParams();
    authParams.append("grant_type", "client_credentials");

    //Encode client ID and secret in Base64 for authentication
    const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`;

    try {
        // Send a POST request to Spotify's API to get an access token
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST", //HTTP method
            body: authParams, // The request body (grant_type=client_credentials)
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // Required format for Spotify API
                "Authorization": authHeader // Authorization header containing the encoded credentials
            }
        })

        // If the response is not OK (not 200), throw an error
        if (!response.ok) {
            throw new Error(`Error fetching token; ${response.statusText}`)
        }

        // Convert response to JSON format
        const data = await response.json()

        // Return the access token as a JSON response
        return {
            statusCode: 200, // HTTP status code for success
            body: JSON.stringify({ access_token: data.access_token })
        };
    } catch (error) {
        // Handle any errors that occur
        return {
            statusCode: 500, // HTTP status code for server error
            body: JSON.stringify({ error: error.message }) // Return error message
        }
    }
};

