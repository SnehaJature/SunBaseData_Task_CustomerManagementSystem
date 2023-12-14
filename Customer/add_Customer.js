function createCustomer() {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const createCmd = 'create';

    const token = 'YOUR_RECEIVED_BEARER_TOKEN'; // Replace with the actual token obtained from the authentication API

    const requestData = {
        cmd: createCmd,
        first_name: 'Jane',
        last_name: 'Doe',
        street: 'Elvnu Street',
        address: 'H no 2',
        city: 'Delhi',
        state: 'Delhi',
        email: 'sam@gmail.com',
        phone: '12345678'
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Customer successfully added:', newCustomerData);
                // Optionally, you can update the UI or fetch the updated customer list
                fetchCustomerList();
            } else if (response.status === 500) {
                console.error('Error adding customer: Invalid Command (status code 500)');
            } else if (response.status === 401) {
                console.error('Error adding customer: Invalid Authorization (status code 401)');
            } else if (response.status === 400) {
                console.error('Error adding customer: Bad Request (status code 400)');
            } else {
                console.error('Error adding customer:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error during the request:', error);
        });
}

// Call the createCustomer function to initiate the API call
createCustomer();
