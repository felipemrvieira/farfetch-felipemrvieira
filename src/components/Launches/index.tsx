import React from "react";
import Image from "next/image";

import style from "./launches.module.scss";

interface Props {
  launchList?: Launch[];
  title: string;
}

interface Launch {
  id: number;
  missionName: string;
  missionPatch: string;
  launchDate: string;
  launchSite: string;
}

const Launches: React.FC<Props> = ({ title, launchList }) => {
  return (
    <>
      <h2 className={style.header}>{title}</h2>
      {launchList &&
        launchList.map((launch) => (
          <div className={style.launch} key={launch.id}>
            <div className={style.mission}>
              <h4>{launch.missionName}</h4>
              <p>{launch.missionPatch}</p>
              <Image
                src={launch.missionPatch}
                alt={launch.missionName}
                width="100"
                height="100"
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default Launches;
