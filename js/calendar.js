document.addEventListener('DOMContentLoaded', function () {
    var eventData = [
        { title: 'Room 101', start: '2025-09-01T11:00:00', end: '2025-09-04T09:00:00', allDay: false, extendedProps: { customerName: 'John Doe', mobileNumber: '7003380228', roomType: 'double' } },
        // { title: 'Room 501', start: '2025-09-04T11:00:00', end: '2025-09-07T09:00:00', allDay: false },
        { title: 'Room 202', start: '2025-09-06T11:00:00', end: '2025-09-06T09:00:00', allDay: false, extendedProps: { customerName: 'Jane Smith', mobileNumber: '7003380229', roomType: 'single' } },
        { title: 'Maintenance', start: '2025-09-18', end: '2025-09-21', display: 'background', color: '#ff9f89' }
    ];

    localStorage.setItem('calendarEvents', JSON.stringify(eventData));
    var storedEvents = localStorage.getItem('calendarEvents');
    var events = storedEvents ? JSON.parse(storedEvents) : [];

    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    $(checkInInput).datepicker({
        dateFormat: 'dd-mm-yy',
        // minDate: 0,
        // onSelect: function (selectedDate) {
        //     const minDate = $(this).datepicker('getDate');
        //     minDate.setDate(minDate.getDate() + 1);
        //     $(checkOutInput).datepicker('option', 'minDate', minDate);
        // }
    });
    $(checkOutInput).datepicker({
        dateFormat: 'dd-mm-yy',
        // minDate: 1
    });


    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        select: function (info) {

            var modalEl = document.getElementById('quick-booking-modal');
            modalEl.style.display = 'flex';
            modalEl.scrollTop = 0; // Scroll to top when opened

            document.getElementById('customer-name').value = '';
            document.getElementById('room-number').value = '';
            // console.log(new Date(info.startStr));
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
            const modal = document.getElementById('quick-booking-modal');
            modal.style.display = 'flex';

            // Populate form fields with event data
            document.getElementById('customer-name').value = info.event.extendedProps.customerName || '';
            document.getElementById('mobile').value = info.event.extendedProps.mobileNumber || '';
            document.getElementById('room-type').value = info.event.extendedProps.roomType || '';
            document.getElementById('room-number').value = info.event.title;
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

    // Adjust calendar size when sidebar is toggled
    // const sidebarToggle = document.querySelector('.sidebar-toggle');
    // sidebarToggle.addEventListener('click', () => {
    //     setTimeout(() => {
    //         calendar.updateSize();
    //     }, 300); // Delay to match the sidebar animation
    // });
});
