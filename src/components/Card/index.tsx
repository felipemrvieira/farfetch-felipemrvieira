import React from "react";
import Zoom from "react-reveal/Zoom";
import style from "./card.module.scss";
import StarIcon from "@mui/icons-material/Star";

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
  launch_date_utc: string;
  launch_site: string;
  rocket_name: string;
  mission_patch_small: string;
}

function handleFavoritClick(launch: Launch) {
  console.log(launch);

  const storedLaunchs = JSON.parse(localStorage.getItem("favoriteLaunches"));

  if (storedLaunchs) {
    const launchs = [...storedLaunchs, launch];
    localStorage.setItem("favoriteLaunches", JSON.stringify(launchs));
  } else {
    const launchs = [launch];
    localStorage.setItem("favoriteLaunches", JSON.stringify(launchs));
  }

  // localStorage.removeItem("favoriteLaunches");
}

const Launches = ({
  flight_number,
  launch_date_unix,
  launch_date_utc,
  launch_date,
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
          <div className={style.header}>
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
            <span className={style.favorite}>
              <StarIcon
                onClick={() =>
                  handleFavoritClick({
                    flight_number,
                    launch_date_unix,
                    launch_date_utc,
                    launch_date,
                    launch_year,
                    launch_success,
                    mission_name,
                    mission_patch_small,
                    rocket_name,
                  })
                }
              />
            </span>
          </div>
          <img
            className={style.missionPatch}
            src={mission_patch_small}
            alt={mission_name}
            width="125"
            height="125"
          />
          {/* <br />
          {launch_date_unix}
          <br />
          {launch_date_utc}
          <br />
          {launch_date}
          <br /> */}
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
