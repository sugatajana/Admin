// Sample events data
const eventData = [
    { title: 'Room 101', start: '2025-09-01T11:00:00', end: '2025-09-04T09:00:00', allDay: false, extendedProps: { customerName: 'John Doe', mobileNumber: '7003380228', roomType: 'double' } },
    // { title: 'Room 501', start: '2025-09-04T11:00:00', end: '2025-09-07T09:00:00', allDay: false },
    { title: 'Room 202', start: '2025-09-06T11:00:00', end: '2025-09-06T09:00:00', allDay: false, extendedProps: { customerName: 'Jane Smith', mobileNumber: '7003380229', roomType: 'single' } },
    { title: 'Maintenance', start: '2025-09-18', end: '2025-09-21', display: 'background', color: '#ff9f89' }
];

// Store events in localStorage for persistence
localStorage.setItem('calendarEvents', JSON.stringify(eventData));
// Retrieve events from localStorage
var storedEvents = localStorage.getItem('calendarEvents');
// Store events array
var events = storedEvents ? JSON.parse(storedEvents) : [];

// Datepicker elements
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');

// Function to initialize datepickers
function initializeDatepickers() {
    $(checkInInput).datepicker({
        dateFormat: 'dd-mm-yy',
    });
    $(checkOutInput).datepicker({
        dateFormat: 'dd-mm-yy',
    });
}

// Function to open modal
function openBookingModal() {
    const modalEl = document.getElementById('quick-booking-modal');
    modalEl.style.display = 'flex';
    modalEl.scrollTop = 0; // Scroll to top when opened
}

// Reset form fields
function resetBookingForm() {
    document.getElementById('customer-name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('room-type').value = '';
    document.getElementById('room-number').value = '';
    $(checkInInput).datepicker('setDate', null);
    $(checkOutInput).datepicker('setDate', null);
}

// Populate form fields with event data
function populateFormWithEventData(event) {
    document.getElementById('customer-name').value = event.extendedProps.customerName || '';
    document.getElementById('mobile').value = event.extendedProps.mobileNumber || '';
    document.getElementById('room-type').value = event.extendedProps.roomType || '';
    document.getElementById('room-number').value = event.title || '';
}

// Close modal logic
const modal = document.getElementById('quick-booking-modal');
const closeModalButton = modal.querySelector('.close-button');
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



// Initialize datepickers and calendar when DOM is fully loaded
initializeDatepickers();
// Initialize FullCalendar
var calendarEl = document.getElementById('calendar');


var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    select: function (info) {

        openBookingModal();
        resetBookingForm();


        $(checkInInput).datepicker('setDate', new Date(info.start));
        // Disable previous dates in check-in datepicker
        $(checkInInput).datepicker('option', 'minDate', new Date(info.start));
        // Disable previous dates in check-out datepicker
        $(checkOutInput).datepicker('option', 'minDate', new Date(info.start));

        let checkOutDate = new Date(info.end);
        checkOutDate.setDate(checkOutDate.getDate() - 1);
        $(checkOutInput).datepicker('setDate', checkOutDate);

    },
    events: events,
    eventClick: function (info) {
        openBookingModal();
        populateFormWithEventData(info.event);


        $(checkInInput).datepicker('setDate', new Date(info.event.start));
        // Enable all dates in check-in datepicker
        $(checkInInput).datepicker('option', 'minDate', null);

        // Disable check-out dates before check-in date
        $(checkOutInput).datepicker('option', 'minDate', new Date(info.event.start));


        if (info.event.end == null) {
            let checkOutDate = new Date(info.event.start);
            $(checkOutInput).datepicker('setDate', checkOutDate);
        }
        else {
            $(checkOutInput).datepicker('setDate', new Date(info.event.end));
        }
    }
});
calendar.render();


// Adjust calendar size when sidebar is toggled
const sidebarToggle = document.querySelector('.sidebar-toggle');
sidebarToggle.addEventListener('click', () => {
    setTimeout(() => {
        calendar.updateSize();
    }, 300); // Delay to match the sidebar animation
});


