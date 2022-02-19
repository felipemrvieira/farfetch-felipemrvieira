import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import Filter from "../components/Filter";
import Launches from "../components/Launches";

export async function getStaticProps() {
  const response = await fetch("https://api.spacexdata.com/v3/launches");
  const launchData = await response.json();

  return {
    props: {
      launchData,
    },
    revalidate: 3600,
  };
}

const Home: NextPage = ({ launchData }: any) => {
  const [success, setSuccess] = useState(true);
  const [failure, setFailure] = useState(true);
  const [past, setPast] = useState(true);
  const [upcoming, setUpcoming] = useState(true);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

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
  function handleDateRangeChange(date: any) {
    console.log(date);
  }

  const pastLaunch = launchData.filter(function (el: any) {
    return success && failure
      ? (el.upcoming === false && el.launch_success === true) ||
          (el.upcoming === false && el.launch_success === false)
      : el.upcoming === false && el.launch_success === success;
  });

  const upcomingLanch = launchData.filter(function (el: any) {
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
          dateRange={dateRange}
          handleDateRangeChange={handleDateRangeChange}
        />

        <div className={styles.launches}>
          {past && <Launches title="Past Launches" launchList={pastLaunch} />}
          {upcoming && (
            <Launches title="Upcoming Launches" launchList={upcomingLanch} />
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
