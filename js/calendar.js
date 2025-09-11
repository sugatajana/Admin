document.addEventListener('DOMContentLoaded', function () {
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    $(checkInInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: 0,
        onSelect: function (selectedDate) {
            const minDate = $(this).datepicker('getDate');
            minDate.setDate(minDate.getDate() + 1);
            $(checkOutInput).datepicker('option', 'minDate', minDate);
        }
    });
    $(checkOutInput).datepicker({
        dateFormat: 'dd-mm-yy',
        minDate: 1
    });


    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        select: function (info) {
            var modalEl = document.getElementById('quick-booking-modal');
            modalEl.style.display = 'flex';
            modalEl.scrollTop = 0; // Scroll to top when opened
            console.log(info.startStr);
            // Set the selected dates in the form
            document.getElementById('customer-name').value = '';
            document.getElementById('room-number').value = '';
            // $(checkInInput).datepicker('setDate', new Date(info.startStr));
            // $(checkInInput).datepicker('setDate', new Date(2025, 8, 1));
            $(checkInInput).datepicker('setDate', "01-09-2025");

            // const minDate = new Date(info.startStr);
            // minDate.setDate(minDate.getDate() + 1);
            // $(checkOutInput).datepicker('option', 'minDate', minDate);
            // $(checkOutInput).datepicker('setDate', new Date(info.endStr));

            // document.getElementById('quick-booking-modal').style.display = 'block';
            // alert('Selected from ' + info.startStr + ' to ' + info.endStr);
            // var title = prompt('Enter Booking Title:');
            // if (title) {
            //     calendar.addEvent({
            //         title: title,
            //         start: info.startStr,
            //         end: info.endStr,
            //         allDay: info.allDay
            //     });
            // }
            // calendar.unselect();
        },
        events: [
            // Sample events
            { title: 'Room 101', start: '2025-09-01T11:00:00', end: '2025-09-04T09:00:00', allDay: false },
            { title: 'Room 501', start: '2025-09-04T11:00:00', end: '2025-09-07T09:00:00', allDay: false },
            { title: 'Room 202', start: '2025-09-06T11:00:00', end: '2025-09-06T09:00:00', allDay: false },
            { title: 'Maintenance', start: '2025-09-18', end: '2025-09-21', display: 'background', color: '#ff9f89' }
        ],
        eventClick: function (info) {
            const modal = document.getElementById('quick-booking-modal');
            modal.style.display = 'flex';

            // Populate form fields with event data
            document.getElementById('customer-name').value = info.event.title;
            document.getElementById('room-number').value = info.event.extendedProps.roomNumber || '';

            // Center the modal on the calendar
            // const modalContent = modal.querySelector('.modal-content');
            // modalContent.style.position = 'absolute';
            // modalContent.style.top = `${info.jsEvent.clientY}px`;
            // modalContent.style.left = `${info.jsEvent.clientX}px`;

            // Close modal logic
            const closeModalButton = modal.querySelector('.close-button');
            closeModalButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    });
    calendar.render();
});
