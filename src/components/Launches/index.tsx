import React from "react";
import Image from "next/image";
import Card from "../Card";
import style from "./launches.module.scss";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Notify from "../Notify";

interface Props {
  launchList?: Launch[] | undefined;
  title: string;
  path: string;
  spacexApiCount: number;
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

const Launches: React.FC<Props> = ({
  title,
  launchList,
  path,
  spacexApiCount,
}) => {
  const [launchs, setLaunchs] = useState(launchList);

  const getMoreLaunchs = async () => {
    const res = await fetch(
      `https://api.spacexdata.com/v3/launches/${path}?limit=4&offset=${launchs.length}`
    );
    const newLaunchs = await res.json();
    setLaunchs((launchs) => [...launchs, ...newLaunchs]);
  };

  return (
    <div className={style.launchesWrapper}>
      <h2 className={style.header}>{title}</h2>
      <div className={style.launchesList}>
        <InfiniteScroll
          dataLength={launchs.length}
          next={getMoreLaunchs}
          hasMore={launchs.length < spacexApiCount}
          loader={<Notify>Loading more launches...</Notify>}
          endMessage={<Notify>No more launches to show</Notify>}
        >
          {launchs &&
            launchs.map((launch) => (
              <Card
                key={launch.flight_number + launch.launch_date_unix}
                flight_number={launch.flight_number}
                launch_date_unix={launch.launch_date_unix}
                launch_year={launch.launch_year}
                mission_name={launch.mission_name}
                launch_success={launch.launch_success}
                launch_date={launch.launch_date}
                launch_site={launch.launch_site}
                rocket_name={launch.rocket.rocket_name}
                mission_patch_small={launch.links.mission_patch_small}
              />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Launches;
