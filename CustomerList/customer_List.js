document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display the initial list of customers when the page loads
    fetchCustomerList();
});

// Function to fetch and display the list of customers
function fetchCustomerList() {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 500) {
                console.error('Error fetching customer list: Invalid Command (status code 500)');
            } else if (response.status === 401) {
                console.error('Error fetching customer list: Invalid Authorization (status code 401)');
            } else {
                console.error('Error fetching customer list:', response.statusText);
            }
            throw new Error('Failed to fetch customer list');
        })        .then(data => {
            // Display the customer list in the table
            displayCustomerList(data);
        })
        .catch(error => {
            console.error('Error fetching customer list:', error);
        });
}

// Function to display the list of customers in the table
function displayCustomerList(customerList) {
    const customerListContainer = document.getElementById('customerList');

    // Clear existing rows
    customerListContainer.innerHTML = '';

    // Iterate through the customer list and create rows in the table
    customerList.forEach(customer => {
        const row = createCustomerRow(customer);
        customerListContainer.appendChild(row);
    });
}

// Function to create a table row for each customer
function createCustomerRow(customer) {
    const row = document.createElement('tr');

    // Add data to each cell in the row
    const keys = ['id', 'firstName', 'lastName', 'street', 'address', 'city', 'state', 'email', 'phone'];
    keys.forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = customer[key];
        row.appendChild(cell);
    });

    // Create an Actions column with buttons for update and delete
    const actionsCell = document.createElement('td');
    const updateBtn = createButton('Update', () => handleUpdate(customer));
    const deleteBtn = createButton('Delete', () => handleDelete(customer));
    actionsCell.appendChild(updateBtn);
    actionsCell.appendChild(deleteBtn);
    row.appendChild(actionsCell);

    return row;
}

// Function to create a button with a specified label and click handler
function createButton(label, clickHandler) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', clickHandler);
    return button;
}

// Example update handler
// Function to handle the update of a customer
function handleUpdate(customer) {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const updateEndpoint = apiUrl + '?cmd=update&uuid=' + customer.uuid;

    // Replace 'token_recieved_in_authentication_API_call' with the actual token
    const token = 'token_recieved_in_authentication_API_call';

    // Define the update data
    const updateData = {
        "first_name": "UpdatedFirstName",
        "last_name": "UpdatedLastName",
        "street": "UpdatedStreet",
        "address": "UpdatedAddress",
        "city": "UpdatedCity",
        "state": "UpdatedState",
        "email": "updatedemail@gmail.com",
        "phone": "9876543210"
    };

    // Make a POST request to update the customer
    fetch(updateEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(updateData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Customer successfully updated:', customer);
                fetchCustomerList();
            } else if (response.status === 500) {
                console.error('Error updating customer: Internal Server Error');
            } else if (response.status === 400) {
                console.error('Error updating customer: Body is Empty');
            } else {
                console.error('Error updating customer:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error updating customer:', error);
        });
}


// Example delete handler
// Function to handle the deletion of a customer
function handleDelete(customer) {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const deleteEndpoint = apiUrl + '?cmd=delete&uuid=' + customer.uuid;

    // Replace 'token_recieved_in_authentication_API_call' with the actual token
    const token = 'token_recieved_in_authentication_API_call';

    // Make a POST request to delete the customer
    fetch(deleteEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Customer successfully deleted:', customer);
                fetchCustomerList();
            } else if (response.status === 500) {
                console.error('Error deleting customer: Internal Server Error');
            } else if (response.status === 400) {
                console.error('Error deleting customer: UUID not found');
            } else {
                console.error('Error deleting customer:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting customer:', error);
        });
}

