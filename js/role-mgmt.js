const bookingPermissions = [];

// Initialize permission checkboxes and "Select All" functionality
document.querySelectorAll('.permission-card').forEach(item => {
    const selectAllCheckbox = item.querySelector(".select-all-checkbox");
    const permissionCheckboxes = item.querySelectorAll(".permission-checkbox");

    // Handle "Select All" toggle
    selectAllCheckbox.addEventListener("change", function () {
        permissionCheckboxes.forEach(cb => cb.checked = this.checked);
        // Update bookingPermissions array
        // bookingPermissions.length = 0; // Clear existing
        if (this.checked) {
            permissionCheckboxes.forEach(cb => {
                if (!bookingPermissions.includes(cb.value)) {
                    bookingPermissions.push(cb.value);
                }
            });
        } else {
            // If unchecking "Select All", clear all permissions
            // bookingPermissions.length = 0;
            permissionCheckboxes.forEach(cb => {
                const index = bookingPermissions.indexOf(cb.value);
                if (index > -1) {
                    bookingPermissions.splice(index, 1);
                }
            });
        }
        console.log(bookingPermissions);
    });

    // Keep "Select All" in sync when individual checkboxes are toggled
    permissionCheckboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            const allChecked = [...permissionCheckboxes].every(c => c.checked);
            const noneChecked = [...permissionCheckboxes].every(c => !c.checked);
            // If all are checked, mark select-all as checked; if none, uncheck; else indeterminate
            selectAllCheckbox.checked = allChecked;
            selectAllCheckbox.indeterminate = !allChecked && !noneChecked;
            // Update bookingPermissions array
            if (this.checked) {
                if (!bookingPermissions.includes(this.value)) {
                    bookingPermissions.push(this.value);
                }
            } else {
                const index = bookingPermissions.indexOf(this.value);
                if (index > -1) {
                    bookingPermissions.splice(index, 1);
                }
            }
            console.log(bookingPermissions);
        });
    });
});
