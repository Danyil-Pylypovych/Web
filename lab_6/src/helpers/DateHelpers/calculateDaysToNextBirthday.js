import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

export const daysUntilBirthday = birthday => {
    dayjs.extend(utc)
    const today = dayjs().utcOffset(0);
    const nextBirthday = dayjs(birthday).utc().year(today.year());

    let diffDays = nextBirthday.diff(today, 'day');
    if (nextBirthday.isBefore(today)) {
        diffDays = 365 + diffDays;
    }
    return diffDays;
};

