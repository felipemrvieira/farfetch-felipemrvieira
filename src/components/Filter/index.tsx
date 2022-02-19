import React from "react";
import style from "./filter.module.scss";
import { DateRangePicker } from "rsuite";

interface Props {
  success: boolean;
  failure: boolean;
  handleSuccessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFailureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  past: boolean;
  upcoming: boolean;
  handlePastChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpcomingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dateRange: any;
  handleDateRangeChange: any;
}

const Filter = ({
  success,
  failure,
  handleSuccessChange,
  handleFailureChange,
  past,
  upcoming,
  handlePastChange,
  handleUpcomingChange,
  dateRange,
  handleDateRangeChange,
}: Props) => {
  return (
    <div className={style.box}>
      <div className={style.content}>
        <label>
          Success
          <input
            name="isGoing"
            type="checkbox"
            checked={success}
            onChange={handleSuccessChange}
          />
        </label>
        <label>
          Failure
          <input
            name="isGoing"
            type="checkbox"
            checked={failure}
            onChange={handleFailureChange}
          />
        </label>
        <label>
          Past
          <input
            name="isGoing"
            type="checkbox"
            checked={past}
            onChange={handlePastChange}
          />
        </label>
        <label>
          Upcoming
          <input
            name="isGoing"
            type="checkbox"
            checked={upcoming}
            onChange={handleUpcomingChange}
          />
        </label>
        <DateRangePicker
          format="yyyy-MM-dd HH:mm:ss"
          value={dateRange}
          onChange={(range) => handleDateRangeChange(range)}
        />
      </div>
    </div>
  );
};

export default Filter;
