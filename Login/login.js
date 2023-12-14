function authenticate() {
    const loginUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';

    const credentials = {
        login_id: 'test@sunbasedata.com',
        password: 'Test@123'
    };

    // Make a POST request to the authentication API
    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                console.error('Authentication error: Invalid Authorization (status code 401)');
            } else {
                console.error('Authentication error:', response.statusText);
            }
            throw new Error('Failed to authenticate user');
        })
        .then(data => {
            const token = data.token;
            // Now you can use this token in further API calls as a Bearer token

            // For example, you can call another API using the obtained token
            // replace 'API_ENDPOINT' with the actual API endpoint
            window.location.href = 'add_Customer.html';

            const apiEndpoint = 'API_ENDPOINT';
            callApiWithToken(apiEndpoint, token);
        })
        .catch(error => {
            console.error('Authentication error:', error);
            // Handle authentication error, show a message to the user, etc.
        });
}

function callApiWithToken(apiEndpoint, token) {
    // Make API calls using the obtained Bearer token
    fetch(apiEndpoint, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('API call failed');
            }
            return response.json();
        })
        .then(data => {
            // Process the data from the API response
            console.log('API response:', data);
        })
        .catch(error => {
            console.error('API call error:', error);
            // Handle API call error, show a message to the user, etc.
        });
}

// Call the authenticateUser function to initiate the authentication process
authenticate();
