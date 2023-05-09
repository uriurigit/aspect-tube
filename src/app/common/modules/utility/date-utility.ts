import { DayOfTheWeekConstants } from '@common/constants/moment/day-of-the-week.constants';
import { forCountEach } from './array-utility';

export const getWeekDateList = (mdate): Array<any> => {
    const weekDateList = [];
    weekDateList.push(mdate.clone().startOf('week'));

    return forCountEach(
        weekDateList,
        (index) => weekDateList[index].clone().add(1, 'd'),
        7 - 1
    );
};

export const monthEach = (mdate, filter, callBack) => {
    const countMdate = mdate.clone().startOf('month');

    let weekIndex = 1;
    do {
        if (countMdate.day() === DayOfTheWeekConstants.sun) {
            weekIndex++;
        }
        if (filter(countMdate.clone(), weekIndex)) {
            callBack(countMdate);
        }
    } while (countMdate.month() === countMdate.add(1, 'd').month());
};
