document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        select: function (info) {
            // document.getElementById('quick-booking-modal').style.display = 'block';
            alert('Selected from ' + info.startStr + ' to ' + info.endStr);
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
        eventClick: function(info) {
            const modal = document.getElementById('quick-booking-modal');
            modal.style.display = 'block';

            // Populate form fields with event data
            document.getElementById('customer-name').value = info.event.title;
            document.getElementById('room-number').value = info.event.extendedProps.roomNumber || '';

            // Center the modal on the calendar
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.position = 'absolute';
            modalContent.style.top = `${info.jsEvent.clientY}px`;
            modalContent.style.left = `${info.jsEvent.clientX}px`;

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
