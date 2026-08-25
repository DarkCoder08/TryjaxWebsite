(function () {
    // Base business hours defined in a specific timezone
    const BASE_TIMEZONE = 'America/Denver'; // Mountain Time
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
            close: shift(closeTime.hour, closeTime.minute, offsetMs),
            adjusted: offsetMs !== 0
        };
    }

    function updateHours() {
        const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const converted = convertHours(BASE_TIMEZONE, userTz, HOURS.open, HOURS.close);
        const tzLabel = userTz.replace(/_/g, ' ');
        const text = `Mon - Fri: ${converted.open} - ${converted.close} (${tzLabel})`;
        const noteText = converted.adjusted
            ? `These hours have been adjusted to your local time zone (${tzLabel}).`
            : '';

        // Contact page business hours card
        const el = document.getElementById('business-hours');
        if (el) {
            el.textContent = text;
        }

        // Timezone adjustment note (hidden via CSS :empty when no adjustment was needed)
        const noteEl = document.getElementById('business-hours-note');
        if (noteEl) {
            noteEl.textContent = noteText;
        }

        // Footer business hours
        const footerEl = document.getElementById('footer-business-hours');
        if (footerEl) {
            footerEl.textContent = text;
        }

        // Footer timezone adjustment note (hidden via CSS :empty when no adjustment was needed)
        const footerNoteEl = document.getElementById('footer-business-hours-note');
        if (footerNoteEl) {
            footerNoteEl.textContent = noteText;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHours);
    } else {
        updateHours();
    }
})();
