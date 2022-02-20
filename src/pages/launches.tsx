import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import Filter from "../components/Filter";
import Launches from "../components/Launches";
import StarIcon from "@mui/icons-material/Star";

export async function getStaticProps() {
  const pastResponse = await fetch(
    "https://api.spacexdata.com/v3/launches/past?limit=4&offset=0"
  );
  const pastLaunchData = await pastResponse.json();
  const pastLaunchDataSize = pastResponse.headers.get("spacex-api-count");

  const upcomingResponse = await fetch(
    "https://api.spacexdata.com/v3/launches/upcoming?limit=4&offset=0"
  );
  const upcomingLaunchData = await upcomingResponse.json();
  const upcomingLaunchDataSize =
    upcomingResponse.headers.get("spacex-api-count");

  return {
    props: {
      pastLaunchData,
      pastLaunchDataSize,
      upcomingLaunchData,
      upcomingLaunchDataSize,
    },
    revalidate: 3600,
  };
}

const Home: NextPage = ({
  pastLaunchData,
  upcomingLaunchData,
  pastLaunchDataSize,
  upcomingLaunchDataSize,
}: any) => {
  const [success, setSuccess] = useState(true);
  const [failure, setFailure] = useState(true);
  const [past, setPast] = useState(true);
  const [upcoming, setUpcoming] = useState(true);
  const [dateStartRange, setDateStartRange] = useState(new Date(2010, 0, 1));
  const [dateEndRange, setDateEndRange] = useState(new Date(2022, 0, 1));

  function handleSuccessChange(event: any) {
    const target = event.target;
    setSuccess(target.checked);
  }
  function handleFailureChange(event: any) {
    const target = event.target;
    setFailure(target.checked);
  }
  function handlePastChange(event: any) {
    const target = event.target;
    setPast(target.checked);
  }
  function handleUpcomingChange(event: any) {
    const target = event.target;
    setUpcoming(target.checked);
  }

  function handleStartDateChange(date: any) {
    console.log(date);
    setDateStartRange(date);
  }
  function handleEndDateChange(date: any) {
    console.log(date);
    setDateEndRange(date);
  }

  const pastLaunch = pastLaunchData.filter(function (el: any) {
    return success && failure
      ? (el.upcoming === false && el.launch_success === true) ||
          (el.upcoming === false && el.launch_success === false)
      : el.upcoming === false && el.launch_success === success;
  });

  const upcomingLanch = upcomingLaunchData.filter(function (el: any) {
    return el.upcoming === true && el.launch_success == undefined;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Launches - Farfetch - @felipemrvieira</title>
        <meta
          name="description"
          content="Farfetch challenge - @felipemrvieira"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <span className={styles.favorites}>
            Favorites
            <StarIcon />
          </span>
        </div>
        <h1 className={styles.title}>Launches</h1>

        <Filter
          success={success}
          failure={failure}
          handleSuccessChange={handleSuccessChange}
          handleFailureChange={handleFailureChange}
          past={past}
          upcoming={upcoming}
          handlePastChange={handlePastChange}
          handleUpcomingChange={handleUpcomingChange}
          dateStartRange={dateStartRange.toString()}
          dateEndRange={dateEndRange.toString()}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

        <div className={styles.launches}>
          {past && (
            <Launches
              title="Past Launches"
              launchList={pastLaunch}
              path="past"
              spacexApiCount={pastLaunchDataSize}
              success={success}
              failure={failure}
              dateStartRange={dateStartRange.toString()}
              dateEndRange={dateEndRange.toString()}
            />
          )}
          {upcoming && (
            <Launches
              title="Upcoming Launches"
              launchList={upcomingLanch}
              path="upcoming"
              spacexApiCount={upcomingLaunchDataSize}
              success={success}
              failure={failure}
              dateStartRange={dateStartRange.toString()}
              dateEndRange={dateEndRange.toString()}
            />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/felipemrvieira"
          target="_blank"
          rel="noopener noreferrer"
        >
          Farfetch - @felipemrvieira
        </a>
      </footer>
    </div>
  );
};

export default Home;
