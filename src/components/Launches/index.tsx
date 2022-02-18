import React from "react";
import Image from "next/image";

import style from "./launches.module.scss";

interface Props {
  launchList?: Launch[];
  title: string;
}

interface Launch {
  flight_number: number;
  launch_date_unix: number;
  launch_year: string;
  mission_name: string;
  launch_success: boolean;
  launch_date: string;
  launch_site: string;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string;
    mission_patch_small: string;
  };
}

const Launches: React.FC<Props> = ({ title, launchList }) => {
  return (
    <>
      <h2 className={style.header}>{title}</h2>
      {launchList &&
        launchList.map((launch) => (
          <div
            className={style.launch}
            key={launch.flight_number + launch.launch_date_unix}
          >
            <div className={style.mission}>
              <h4>
                {launch.mission_name} - {launch.launch_year}
              </h4>
              <p>Rocket: {launch.rocket.rocket_name}</p>
              <p>
                Mission Status:{" "}
                {launch.launch_success == undefined
                  ? "Not launched yet"
                  : launch.launch_success
                  ? "Success"
                  : "Failure"}
              </p>
              <img
                src={launch.links.mission_patch_small}
                alt={launch.mission_name}
                width="100"
                height="100"
              />
            </div>
            <hr />
          </div>
        ))}
    </>
  );
};

export default Launches;
