import { Dayjs } from "dayjs";
import { useContext } from "react";
import LocalContext from "./LocaleContext";
import allLocales from "./locale";

interface HeaderProps {
  curMonth: Dayjs;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
  todayHandler: () => void;
}

function Header({
  curMonth,
  prevMonthHandler,
  nextMonthHandler,
  todayHandler,
}: HeaderProps) {
  const localeContext = useContext(LocalContext);
  const CalendarContext = allLocales[localeContext.locale];

  return (
    <div className="calendar-header">
      <div className="calendar-header-left">
        <div className="calendar-header-icon" onClick={prevMonthHandler}>
          &lt;
        </div>
        <div className="calendar-header-value">
          {curMonth.format(CalendarContext.formatMonth)}
        </div>
        <div className="calendar-header-icon" onClick={nextMonthHandler}>
          &gt;
        </div>
        <button className="calendar-header-btn" onClick={todayHandler}>
          {CalendarContext.today}
        </button>
      </div>
    </div>
  );
}

export default Header;
