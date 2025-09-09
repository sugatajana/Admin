// document.getElementById('userForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   let valid = true;
//   // Name validation
//   const name = document.getElementById('name').value.trim();
//   document.getElementById('error-name').textContent = name ? '' : 'Name is required.';
//   valid = valid && !!name;
//   // Email validation
//   const email = document.getElementById('email').value.trim();
//   const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
//   document.getElementById('error-email').textContent = emailPattern.test(email) ? '' : 'Enter a valid email.';
//   valid = valid && emailPattern.test(email);
//   // Mobile validation
//   const mobile = document.getElementById('mobile').value.trim();
//   const mobilePattern = /^[0-9]{10,15}$/;
//   document.getElementById('error-mobile').textContent = mobilePattern.test(mobile) ? '' : 'Enter a valid mobile number (10-15 digits).';
//   valid = valid && mobilePattern.test(mobile);
//   // Role validation
//   const role = document.getElementById('role').value;
//   document.getElementById('error-role').textContent = role ? '' : 'Select a user role.';
//   valid = valid && !!role;
  // Status validation
//   const status = document.getElementById('status').value;
//   document.getElementById('error-status').textContent = status ? '' : 'Select a status.';
//   valid = valid && !!status;
//   if (valid) {
//     alert('Form submitted successfully!');
//     e.target.reset();
//   }
// });

const dropdown = document.querySelector('.user-dropdown');
const profile = document.querySelector('.user-profile');
profile.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});


// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (dropdown.classList.contains('open')) {
    // If click is NOT inside dropdown or profile, close it
    if (!dropdown.contains(e.target) && !profile.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  }
});

// Add current year to footer
document.querySelector('.currentYear').textContent = new Date().getFullYear();

// Add current time with seconds to footer every second 24 hour format
setInterval(() => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
  document.querySelector('.currentTime').textContent = timeString;
}, 1000);


document.querySelectorAll('.submenu-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.closest('.has-submenu');
        const submenu = parent.querySelector('.submenu');
        const isOpen = parent.classList.contains('open');

        // Close all other open submenus
        document.querySelectorAll('.has-submenu.open').forEach(function(openItem) {
            if (openItem !== parent) {
                openItem.classList.remove('open');
                openItem.querySelector('.submenu').setAttribute('aria-hidden', 'true');
                openItem.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
            }
        });

        // Toggle current submenu
        parent.classList.toggle('open');
        submenu.setAttribute('aria-hidden', String(!parent.classList.contains('open')));
        this.setAttribute('aria-expanded', String(parent.classList.contains('open')));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.sidebar-toggle');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        toggleButton.setAttribute('aria-expanded', !isCollapsed);

        // Remove display: none from all submenus when sidebar is expanded
        if (!isCollapsed) {
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.style.display = '';
            });

            document.querySelectorAll('.has-submenu').forEach(item => {

                item.classList.remove('open');
                item.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    // Ensure submenu hover works only when sidebar is collapsed
    const submenuItems = document.querySelectorAll('.has-submenu');
    submenuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (sidebar.classList.contains('collapsed')) {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'block';
                }
            }
        });

        item.addEventListener('mouseleave', () => {
            if (sidebar.classList.contains('collapsed')) {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            }
        });
    });
});