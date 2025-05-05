import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar
        defaultValue={dayjs("2025-5-4")}
        onChange={(date) => {
          alert(date.format("YYYY-MM-DD"));
        }}
      />
    </div>
  );
}

export default App;
