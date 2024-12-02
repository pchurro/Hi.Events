import {Event} from "../../../types.ts";
import {formatDate} from "../../../utilites/dates.ts";

interface EventDateRangeProps {
    event: Event
}

export const EventDateRange = ({event}: EventDateRangeProps) => {
    const capitalizeFirstLetter = (text: string): string => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const formatDateWithCapitalization = (date: string, format: string): string => {
        const formatted = formatDate(date, format, event.timezone);
        return format.startsWith('ddd') ? capitalizeFirstLetter(formatted) : formatted;
    };

    const startDateFormatted = formatDateWithCapitalization(event.start_date, "ddd, D [de] MMM [de] YYYY [às] H:mm");
    const endDateFormatted = event.end_date ? formatDateWithCapitalization(event.end_date, "ddd, D [de] MMM [de] YYYY [às] H:mm") : null;
    const sameDayFormatted = formatDateWithCapitalization(event.start_date, "dddd, D [de] MMMM");
    const startTimeFormatted = formatDate(event.start_date, "H:mm", event.timezone);
    const endTimeFormatted = event.end_date ? formatDate(event.end_date, "H:mm", event.timezone) : null;
    const timezone = formatDate(event.start_date, "z", event.timezone);

    const isSameDay = event.end_date && event.start_date.substring(0, 10) === event.end_date.substring(0, 10);

    return (
        <>
            {isSameDay ? (
                <span>
                    {sameDayFormatted} · {startTimeFormatted} - {endTimeFormatted} {timezone}
                </span>
            ) : (
                <span>
                    {startDateFormatted}
                    {endDateFormatted && ` - ${endDateFormatted}`} {timezone}
                </span>
            )}
        </>
    );
}
