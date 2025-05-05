import dayjs, { Dayjs } from "dayjs";
import cs from "classnames";
import MonthCalendar from "./MonthCaledar";
import Header from "./Header";
import "./index.scss";
import { CSSProperties, ReactNode, useState } from "react";
import { useControllableValue } from "ahooks";

export interface CalendarProps {
  value?: Dayjs;
  defaultValue?: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  //定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  //定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  //国际化相关
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const {
    value,
    style,
    className,
    onChange,
    dateRender,
    dateInnerContent,
    locale,
  } = props;
  const [curDate, setCurDate] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs(),
  });
  const [curMonth, setCurMonth] = useState<Dayjs>(curDate);
  //可以传入对象或者数组，会自动合并
  const classNames = cs("calendar", className);

  const selectedHandler = (date: Dayjs) => {
    setCurDate(date);
    setCurMonth(date);
  };

  const prevMonthHandler = () => {
    setCurMonth(curMonth.subtract(1, "month"));
  };

  const nextMonthHandler = () => {
    setCurMonth(curMonth.add(1, "month"));
  };

  const todayHandler = () => {
    const date = dayjs(Date.now());

    setCurDate(date);
    setCurMonth(date);
  };
  return (
    <div className={classNames} style={style}>
      <Header
        curMonth={curMonth}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
        todayHandler={todayHandler}
      />
      <MonthCalendar
        {...props}
        value={curDate}
        curMonth={curMonth}
        selectHandler={selectedHandler}
      />
    </div>
  );
}

export default Calendar;
