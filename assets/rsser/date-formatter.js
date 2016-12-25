var dater = {
    date_options: {
        "weekday": "short", // OR long
        "year": "numeric",
        "month": "short", // OR long
        "day": "numeric",
        "timeZone": "Asia/Kolkata",
        "hour12": true,
        "hour": "2-digit",
        "minute": "2-digit"
    },

    // British English uses day-month-year order and 24-hour time without AM/PM
    lang_option: 'en-GB',

    format: function (date_str) {

        return (new Date(date_str).toLocaleString(dater.lang_option, dater.date_options));
    }

}