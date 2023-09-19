import moment from 'moment';

const defaultFormat: string = 'YYYY-MM-DD';

export function getMomentDate(date: string, format?: string, toString: boolean = false) {
    const _format = format || defaultFormat;
    const momentDate = moment(moment(date,_format));
    if (!toString)
        return momentDate;
    else 
        return momentDate.format(_format);
}

export function getMomentToday(format: string, toString: boolean = false) {
    const _format = format || defaultFormat;
    const momentDate = moment().startOf('day');
    if (!toString)
        return momentDate;
    else 
        return momentDate.format(_format);
}