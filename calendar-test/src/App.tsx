import { FC, useEffect, useRef, useState } from "react";
import Calendar, { CalendarRef } from "./Calendar";

const App: FC = () => {
  const ref = useRef<CalendarRef>(null);

  useEffect(() => {
    console.log(ref.current?.getDate().toLocaleDateString());

    setTimeout(() => {
      ref.current?.setDate(new Date("2025-5-4"));
    }, 3000);
  }, []);
  const [date, setDate] = useState(new Date("2027-1-1"));
  return (
    <>
      {/* 非受控模式 */}
      <Calendar
        defaultValue={new Date("2026-05-20")}
        onChange={(date) => {
          alert(date.toLocaleDateString());
        }}
        ref={ref}
      />
      <Calendar ref={ref} />
      {/* 受控模式 */}
      <Calendar
        value={date}
        onChange={(newDate) => {
          setDate(newDate);
          alert(newDate.toLocaleDateString());
        }}
      />
    </>
  );
};

export default App;
