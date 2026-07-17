(function () {
    // Base business hours defined in a specific timezone
    const BASE_TIMEZONE = 'America/Denver'; // Eastern Time
    const HOURS = {
        open: { hour: 9, minute: 0 },
        close: { hour: 17, minute: 0 }
    };

    function formatTime(hour, minute) {
        const period = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
        const displayMinute = minute.toString().padStart(2, '0');
        return `${displayHour}:${displayMinute}${period}`;
    }

    function convertHours(baseTz, targetTz, openTime, closeTime) {
        const now = new Date();
        const offsetMs = new Date(now.toLocaleString('en-US', { timeZone: targetTz })) - new Date(now.toLocaleString('en-US', { timeZone: baseTz }));
        const shift = (h, m, offset) => {
            const d = new Date();
            d.setHours(h, m, 0, 0);
            d.setTime(d.getTime() + offset);
            return formatTime(d.getHours(), d.getMinutes());
        };
        return {
            open: shift(openTime.hour, openTime.minute, offsetMs),
            close: shift(closeTime.hour, closeTime.minute, offsetMs)
        };
    }

    function updateHours() {
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const converted = convertHours(BASE_TIMEZONE, userTz, HOURS.open, HOURS.close);
        const tzLabel = userTz.replace(/_/g, ' ');
        const text = `Mon - Fri: ${converted.open} - ${converted.close} (${tzLabel})`;

        // Contact page business hours card
        const el = document.getElementById('business-hours');
        if (el) {
            el.textContent = text;
        }

        // Footer business hours
        const footerEl = document.getElementById('footer-business-hours');
        if (footerEl) {
            footerEl.textContent = text;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHours);
    } else {
        updateHours();
    }
})();
