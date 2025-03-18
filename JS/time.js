// Function to update the date and time
function updateDateTime() {
        const dateTimeElement = document.getElementById('datetime');
        if (dateTimeElement) {
            const currentDate = new Date();
            dateTimeElement.textContent = currentDate.toLocaleString();
        }
    }
    
    // Update the date and time immediately
    updateDateTime();
    
    // Update the date and time every second (optional)
    setInterval(updateDateTime, 1000);