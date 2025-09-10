// JavaScript for New Booking Page

document.addEventListener('DOMContentLoaded', () => {

    // Initialize datepickers
    const dateInput = document.querySelector('[data-attr="date"]');
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
  const dateInput = document.querySelector('[data-attr="date"]');
  if ($(dateInput).datepicker("widget").is(":visible")) {
    $(dateInput).datepicker("hide");
  }
});



