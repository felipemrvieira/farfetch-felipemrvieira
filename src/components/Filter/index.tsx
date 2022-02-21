import React from "react";
import style from "./filter.module.scss";
import { DatePicker } from "rsuite";

interface Props {
  success: boolean;
  failure: boolean;
  handleSuccessChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFailureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  past: boolean;
  upcoming: boolean;
  handlePastChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpcomingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dateStartRange: string;
  dateEndRange: string;
  handleStartDateChange: (date: any) => void;
  handleEndDateChange: (date: any) => void;
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
  dateStartRange,
  dateEndRange,
  handleStartDateChange,
  handleEndDateChange,
}: Props) => {
  return (
    <div className={style.box}>
      <div className={style.content}>
        <div className={style.inputGroup}>
          <label className={style.label}>Successful Mission</label>
          <div>
            <label>
              Successful
              <input
                name="success"
                type="checkbox"
                checked={success}
                onChange={handleSuccessChange}
              />
            </label>
            <label>
              Failed
              <input
                name="failure"
                type="checkbox"
                checked={failure}
                onChange={handleFailureChange}
              />
            </label>
          </div>
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}> Mission Time</label>
          <div>
            <label>
              Past missions
              <input
                name="past"
                type="checkbox"
                checked={past}
                onChange={handlePastChange}
              />
            </label>
            <label>
              Upcoming missions
              <input
                name="isGoing"
                type="checkbox"
                checked={upcoming}
                onChange={handleUpcomingChange}
              />
            </label>
          </div>
        </div>
        <div className={style.inputGroup}>
          <label className={style.label}>Launch range</label>
          <div>
            <DatePicker
              value={new Date(dateStartRange)}
              format="yyyy-MM-dd HH:mm:ss"
              onChange={(range) => handleStartDateChange(range)}
            />
            <DatePicker
              value={new Date(dateEndRange)}
              format="yyyy-MM-dd HH:mm:ss"
              onChange={(range) => handleEndDateChange(range)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
