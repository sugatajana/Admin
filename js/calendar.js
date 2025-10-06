// Event data for datepickers
const events = [
    { title: 'Room 101', start: '2025-09-01T11:00:00', end: '2025-09-04T09:00:00', allDay: false, extendedProps: { customerName: 'John Doe', mobileNumber: '7003380228', roomType: 'double' } },
    { title: 'Room 202', start: '2025-09-06T11:00:00', end: '2025-09-06T09:00:00', allDay: false, extendedProps: { customerName: 'Jane Smith', mobileNumber: '7003380229', roomType: 'single' } },
    { title: 'Maintenance', start: '2025-09-18', end: '2025-09-21', display: 'background', color: '#ff9f89' }
];

// Initialize datepickers and calendar when DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {

    // Show loader for dummy network call
    showLoader();
    setTimeout(() => {
        hideLoader();
    }, 2000);

    // Business details toggle based on customer type
    const customerTypeSelect = document.getElementById('customer-type');
    const businessDetailsRow = document.getElementById('business-details-row');
    // Initialize datepickers
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    InitializeDatePickers();

    //Initialize FullCalendar
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height:'auto',
        contentHeight: 'auto',
        editable: true,
        selectable: true,
        select: function (info) {

            const isMaintainanceDay = events.some(event =>
                event.display === 'background' &&
                info.start < new Date(event.end) && // end is exclusive
                info.end > new Date(event.start) // start is inclusive
            );
            if (isMaintainanceDay) {
                // alert('Selected range includes maintenance days. Please choose different dates.');
                return;
            }

            OpenModal();

            // Optionally, you can pre-fill the check-in and check-out dates in the modal
            const checkInDate = info.start;
            const checkOutDate = info.end;
            // You can set these values to the datepicker inputs if needed
            $(checkInInput).datepicker('setDate', checkInDate);
            checkOutDate.setDate(checkOutDate.getDate() - 1); // Adjust to get the correct check-out date
            $(checkOutInput).datepicker('setDate', checkOutDate);
            $(checkOutInput).datepicker('option', 'minDate', checkInDate);
            // Check-in date should not be less than info.start
            $(checkInInput).datepicker('option', 'minDate', checkInDate);

        },
        events: events,
        eventClick: function (info) {
            const event = info.event;

            // Show booking details in an alert or modal
            OpenModal();

            // Pre-fill user details in the modal
            document.getElementById('customer-name').value = event.extendedProps.customerName || '';
            document.getElementById('mobile').value = event.extendedProps.mobileNumber || '';
            document.getElementById('room-type').value = event.extendedProps.roomType || '';
            document.getElementById('room-number').value = event.title || '';

            const checkInDate = event.start;
            const checkOutDate = event.end;
            // You can set these values to the datepicker inputs if needed
            $(checkInInput).datepicker('setDate', checkInDate);
            if (checkOutDate != null) {
                // checkOutDate.setDate(checkOutDate); // Adjust to get the correct check-out date  
                $(checkOutInput).datepicker('setDate', checkOutDate);
            }
            else {
                $(checkOutInput).datepicker('setDate', checkInDate);
            }

            $(checkOutInput).datepicker('option', 'minDate', checkInDate);
            // Check-in date should not be less than info.start
            $(checkInInput).datepicker('option', 'minDate', checkInDate);


            // alert(`Booking Details:\nCustomer: ${event.extendedProps.customerName}\nMobile: ${event.extendedProps.mobileNumber}\nRoom: ${event.title}\nRoom Type: ${event.extendedProps.roomType}\nFrom: ${event.start.toLocaleString()}\nTo: ${event.end?.toLocaleString()}`);
        },
        eventDrop: function (info) {
            const event = info.event;
            OpenConfirmModal();

            document.querySelector('.confirm-button').onclick = function() {
                // Confirm the change
                // You can update your data source here if needed
                alert(`Event moved to:\nFrom: ${event.start.toLocaleString()}\nTo: ${event.end?.toLocaleString()}`);
                CloseConfirmModal();
            }

            document.querySelector('.cancel-button').onclick = function() {
                info.revert(); // Revert the event to its original position
                CloseConfirmModal();
            }

            // Handle event drag-and-drop logic here
            // For example, you can update the event's start and end dates in your data source
            // alert(`Event moved to:\nFrom: ${event.start.toLocaleString()}\nTo: ${event.end?.toLocaleString()}`);
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

    // Modal close functionality
    const modal = document.getElementById('quick-booking-modal');
    const closeModalBtn = document.querySelector('.close-button');
    closeModalBtn.addEventListener('click', () => {
        // reset form fields if necessary
        resetFormData();
        DestroyDatePickers();
        InitializeDatePickers();
        modal.style.display = 'none';
    });

    // Modal close on outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            resetFormData();
            DestroyDatePickers();
            InitializeDatePickers();
            modal.style.display = 'none';
        }
    });

    // Modal form submission

    window.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted');
        resetFormData();
        CloseModal();
    });

});

function resetFormData() {
    document.getElementById('customer-name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('room-type').value = '';
    document.getElementById('room-number').value = '';
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    $(checkInInput).datepicker('setDate', null);
    $(checkOutInput).datepicker('setDate', null);
}

function DestroyDatePickers() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    $(checkInInput).datepicker('setDate', null);
    $(checkOutInput).datepicker('setDate', null);
    $(checkInInput).datepicker('destroy');
    $(checkOutInput).datepicker('destroy');
}
function InitializeDatePickers() {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    $(checkInInput).datepicker({
        dateFormat: 'dd-mm-yy',
    });
    $(checkOutInput).datepicker({
        dateFormat: 'dd-mm-yy',
    });
    $(checkInInput).datepicker('setDate', null);
    $(checkOutInput).datepicker('setDate', null);
}

function OpenModal() {
    const modal = document.getElementById('quick-booking-modal');
    modal.style.display = 'flex';
    modal.scrollTop = 0;
}

function CloseModal() {
    const modal = document.getElementById('quick-booking-modal');
    modal.style.display = 'none';
}

function OpenConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    modal.style.display = 'flex';
    modal.scrollTop = 0;
}

function CloseConfirmModal() {
    const modal = document.getElementById('confirm-modal');
    modal.style.display = 'none';
}


