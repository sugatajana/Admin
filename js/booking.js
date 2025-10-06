// JavaScript for New Booking Page

document.addEventListener('DOMContentLoaded', () => {

    // Initialize datepickers
    const dateInput = document.getElementById('dateofbirth');
    $(dateInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: null,
        // showAnim: 'fadeIn'
    });

    const checkInInput = document.getElementById('check-in-date');
    const checkOutInput = document.getElementById('check-out-date');
    $(checkInInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: 0,
        onSelect: function(selectedDate) {
            const minDate = $(this).datepicker('getDate');
            minDate.setDate(minDate.getDate() + 1);
            $(checkOutInput).datepicker('option', 'minDate', minDate);
        }
    });
    
    $(checkOutInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: 1
    });

    $(checkInInput).datepicker('setDate', new Date(2025, 7, 1)); // Set default check-in date to September 1, 2025  
    console.log($(checkInInput).datepicker('getDate'));


    //show business details if business customer is selected
    const customerTypeSelect = document.getElementsByName('customer-type');
    const businessDetailsRow = document.querySelector('.business-details');
    // Initially hide business details
    businessDetailsRow.style.display = 'none';

    customerTypeSelect.forEach(radio => radio.addEventListener('change', () => {
        if (document.querySelector('input[name="customer-type"]:checked').value === 'business') {
            businessDetailsRow.style.display = 'flex';
        } else {
            businessDetailsRow.style.display = 'none';
        }
    }));

    // check for query param bookingId and load booking details if present
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('bookingId');
    if (bookingId) {
        loadBookingDetails(bookingId);
        return;
    }

    // Handle form submission

    const form = document.querySelector('.new-booking-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(form);
        const bookingData = {};

        formData.forEach((value, key) => {
            bookingData[key] = value;
        });

        // Simulate form submission
        console.log('Booking Data:', bookingData);

        // Display success message
        alert('Booking successfully created!');

        // Reset the form
        form.reset();
    });
});

const scrollContainer = document.querySelector('.content');
scrollContainer.addEventListener("scroll", () => {
    const dateInputs = document.querySelectorAll('.date');
    dateInputs.forEach(dateInput => {
        if ($(dateInput).datepicker("widget").is(":visible")) {
            $(dateInput).datepicker("hide");
        }
    });
});

loadBookingDetails = (bookingId) => {
    // Simulate fetching booking details based on bookingId
    const bookingDetails = {
        id: bookingId,
        customerName: "John Doe",
        dateOfBirth: "15-05-1985",
        customerType: "business",
        businessName: "",
        businessTaxId: "",
        roomType: "deluxe",
        checkInDate: "25-10-2025",
        checkOutDate: "27-10-2025",
        specialRequests: "Late check-in",
        businessTaxId: "123456789",
        totalAmount: 500.00,
    };
    // Populate form fields with booking details
    document.getElementById('customer-name').value = bookingDetails.customerName;
    document.getElementById('dateofbirth').value = bookingDetails.dateOfBirth;
    document.querySelector(`input[name="customer-type"][value="${bookingDetails.customerType}"]`).checked = true;
    if (bookingDetails.customerType === 'business') {
        document.querySelector('.business-details').style.display = 'flex';
        document.getElementById('business-name').value = bookingDetails.businessName;
        // document.getElementById('business-tax-id').value = bookingDetails.businessTaxId;
    }
    document.getElementById('room-type').value = bookingDetails.roomType;
    document.getElementById('check-in-date').value = bookingDetails.checkInDate;
    document.getElementById('check-out-date').value = bookingDetails.checkOutDate;
    document.getElementById('special-requests').value = bookingDetails.specialRequests;
    // Set datepickers
    $(document.getElementById('dateofbirth')).datepicker('setDate', bookingDetails.dateOfBirth);
    $(document.getElementById('check-in-date')).datepicker('setDate', bookingDetails.checkInDate);
    $(document.getElementById('check-out-date')).datepicker('setDate', bookingDetails.checkOutDate);
    document.getElementById('total-amount').value = bookingDetails.totalAmount;
    // Change form title
    document.querySelector('h2').textContent = `Edit Booking Details`;
    // Change submit button text
    document.querySelector('.new-booking-form button[type="submit"]').textContent = 'Update Booking';
}
