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
  success: boolean;
  failure: boolean;
  dateStartRange: string;
  dateEndRange: string;
}

interface Launch {
  flight_number: number;
  launch_date_unix: number;
  launch_year: string;
  launch_date: string;
  launch_date_utc: string;
  mission_name: string;
  launch_success: boolean;
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
  success,
  failure,
  dateStartRange,
  dateEndRange,
}) => {
  const [launches, setLaunches] = useState(launchList);

  const getMoreLaunchs = async () => {
    const res = await fetch(
      `https://api.spacexdata.com/v3/launches/${path}?limit=4&offset=${launches.length}`
    );
    const newLaunches = await res.json();
    setLaunches((launches) => [...launches, ...newLaunches]);
  };

  const filteredLaunches = launches.filter(function (el: any) {
    return (
      new Date(el.launch_date_utc) >= new Date(dateStartRange) &&
      new Date(el.launch_date_utc) <= new Date(dateEndRange)
    );
  });
  // const filteredLaunches = launches.filter(function (el: any) {
  //   if (success && failure) {
  //     return (
  //       (el.launch_date_unix >=
  //         Math.floor(new Date(dateStartRange.toString()).getTime() / 1000) &&
  //         el.launch_date_unix <=
  //           Math.floor(new Date(dateEndRange.toString()).getTime() / 1000) &&
  //         el.launch_success === true) ||
  //       el.launch_success === false ||
  //       el.launch_success == undefined
  //     );
  //   } else if (!success && !failure) {
  //     return el.launch_success == undefined;
  //   } else if (success && !failure) {
  //     return el.launch_success === true;
  //   } else if (!success && failure) {
  //     return el.launch_success === false;
  //   }
  // });

  function hasMoreData() {
    return filteredLaunches.length === 0
      ? false
      : filteredLaunches.length < spacexApiCount;
  }

  return (
    <div className={style.launchesWrapper}>
      <h2 className={style.header}>{title}</h2>

      <p>{dateStartRange}</p>
      <p>{dateEndRange}</p>
      {String(dateStartRange < dateEndRange)}

      <div className={style.launchesList}>
        <InfiniteScroll
          scrollThreshold={1}
          dataLength={filteredLaunches.length}
          next={getMoreLaunchs}
          hasMore={hasMoreData()}
          loader={<Notify>Loading more launches...</Notify>}
          endMessage={<Notify>No more launches to show</Notify>}
        >
          {filteredLaunches &&
            filteredLaunches.map((launch) => (
              <Card
                key={launch.flight_number + launch.launch_date_unix}
                flight_number={launch.flight_number}
                launch_date_unix={launch.launch_date_unix}
                launch_year={launch.launch_year}
                mission_name={launch.mission_name}
                launch_success={launch.launch_success}
                launch_date={launch.launch_date}
                launch_date_utc={launch.launch_date_utc}
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
