// JavaScript to handle Booking ID click and modal functionality

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("booking-modal");
    const closeButton = modal.querySelector(".close-button");

    InitializeDatePickers();

    // Function to open modal and populate details
    function openModal(bookingData) {
        // document.getElementById("modal-booking-id").textContent = bookingData.id;
        // document.getElementById("modal-customer-name").textContent = bookingData.customerName;
        // document.getElementById("modal-room").textContent = bookingData.room;
        // document.getElementById("modal-checkin").textContent = bookingData.checkin;
        // document.getElementById("modal-checkout").textContent = bookingData.checkout;
        // document.getElementById("modal-status").textContent = bookingData.status;

        modal.setAttribute("aria-hidden", "false");
        modal.style.display = "flex";
    }

    // Function to close modal
    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        modal.style.display = "none";
    }

    // Add click event listener to Booking IDs
    document.querySelectorAll(".booking-id").forEach(bookingIdElement => {
        bookingIdElement.addEventListener("click", (event) => {
            event.preventDefault();

            // Example data; replace with actual data retrieval logic
            const bookingData = {
                id: bookingIdElement.dataset.id,
                customerName: "John Doe", // Replace with dynamic data
                room: "Deluxe Room", // Replace with dynamic data
                checkin: "10-01-2025", // Replace with dynamic data
                checkout: "10-05-2025", // Replace with dynamic data
                status: "Confirmed" // Replace with dynamic data
            };

            openModal(bookingData);
        });
    });

    // Add click event listener to close button
    closeButton.addEventListener("click", closeModal);

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Handle form submission for filtering (if applicable)
    const filterForm = document.querySelector('.filter-form');
    filterForm.addEventListener('submit', (event) => {
        // Check data in the filter form
        const formData = new FormData(filterForm);
        const filterData = {};
        formData.forEach((value, key) => {
            filterData[key] = value;
        });
        console.log(filterData);
        // Prevent actual form submission for demo purposes
        event.preventDefault();
    });
});

function InitializeDatePickers() {
    const checkInInput = document.getElementById('filter-date-from');
    const checkOutInput = document.getElementById('filter-date-to');
    $(checkInInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: 0,
        onSelect: function (selectedDate) {
            const minDate = $(this).datepicker('getDate');
            const maxDate = new Date(minDate);
            $(checkOutInput).datepicker('setDate', minDate);
            maxDate.setMonth(maxDate.getMonth() + 3);
            $(checkOutInput).datepicker('option', 'maxDate', maxDate);
            minDate.setDate(minDate.getDate() + 1);
            $(checkOutInput).datepicker('option', 'minDate', minDate);
        }
    });

    $(checkOutInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: 1
    });
    $(checkInInput).datepicker('setDate', null);
    $(checkOutInput).datepicker('setDate', null);

    // Restrict manual input to valid date format
    checkInInput.addEventListener('input', (event) => {
        const value = event.target.value;
        const regex = /^\d{0,2}-?\d{0,2}-?\d{0,4}$/; // Allow partial input
        if (!regex.test(value)) {
            event.target.value = value.slice(0, -1); // Remove last character if invalid
        }
    });
    checkOutInput.addEventListener('input', (event) => {
        const value = event.target.value;
        const regex = /^\d{0,2}-?\d{0,2}-?\d{0,4}$/;
        if (!regex.test(value)) {
            event.target.value = value.slice(0, -1);
        }
    });
}

function DestroyDatePickers() {
    const checkInInput = document.getElementById('filter-date-from');
    const checkOutInput = document.getElementById('filter-date-to');
    $(checkInInput).datepicker('setDate', null);
    $(checkOutInput).datepicker('setDate', null);
    $(checkInInput).datepicker('destroy');
    $(checkOutInput).datepicker('destroy');
}

document.querySelectorAll('.btn-edit').forEach(button => {
    button.addEventListener('click', (event) => {
        const bookingId = button.closest('tr').querySelector('.booking-id').getAttribute('data-id');
        window.location.href = "booking.html?bookingId=" + bookingId;
    });
});

document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', (event) => {
        const bookingId = button.closest('tr').querySelector('.booking-id').getAttribute('data-id');
        
        OpenConfirmModal();

        document.querySelector('.confirm-button').onclick = function () {
            console.log('Confirmed deletion of booking ID:', bookingId);
            CloseConfirmModal();
        };

        document.querySelector('.cancel-button').onclick = function () {
            CloseConfirmModal();
        };


    });
});

function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `<img src="../assets/loader/infinite.svg" alt="Loading...">`;
    document.body.appendChild(loader);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.remove();
    }
}

// Example usage during a network call
async function fetchData(url) {
    try {
        showLoader();
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        hideLoader();
    }
}

// Simulate a network call to demonstrate loader functionality
function simulateNetworkCall() {
    const simulateButton = document.createElement('button');
    simulateButton.textContent = 'Simulate Network Call';
    simulateButton.style.position = 'fixed';
    simulateButton.style.bottom = '20px';
    simulateButton.style.right = '20px';
    simulateButton.style.padding = '10px 20px';
    simulateButton.style.backgroundColor = '#007bff';
    simulateButton.style.color = '#fff';
    simulateButton.style.border = 'none';
    simulateButton.style.borderRadius = '5px';
    simulateButton.style.cursor = 'pointer';

    simulateButton.addEventListener('click', async () => {
        showLoader();
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a 3-second network delay
        hideLoader();
        alert('Network call completed!');
    });

    document.body.appendChild(simulateButton);
}

// Initialize the simulation button
simulateNetworkCall();
