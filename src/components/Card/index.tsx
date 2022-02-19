import React from "react";
import Zoom from "react-reveal/Zoom";
import style from "./card.module.scss";

interface Props {
  launch: Launch;
}

interface Launch {
  flight_number: number;
  launch_date_unix: number;
  launch_year: string;
  mission_name: string;
  launch_success: boolean;
  launch_date: string;
  launch_site: string;
  rocket_name: string;
  mission_patch_small: string;
}

const Launches = ({
  flight_number,
  launch_date_unix,
  launch_year,
  launch_success,
  mission_name,
  mission_patch_small,
  rocket_name,
}: Launch) => {
  return (
    <Zoom delay={50} fraction={0.1}>
      <div className={style.launch}>
        <div className={style.mission}>
          <div className={style.groupInfo}>
            <span>Mission Status</span>
            <p>
              {launch_success == undefined
                ? "Not launched yet"
                : launch_success
                ? "Success"
                : "Failure"}
            </p>
          </div>
          <img
            className={style.missionPatch}
            src={mission_patch_small}
            alt={mission_name}
            width="150"
            height="150"
          />
          <div className={style.missionTitle}>
            <span>Mission</span>
            <p>
              {mission_name} - {launch_year}
            </p>
          </div>

          <div className={style.groupInfo}>
            <span>Launch number</span>
            <p>{flight_number}</p>
          </div>
          <div className={style.groupInfo}>
            <span>Rocket</span>
            <p>{rocket_name}</p>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Launches;
