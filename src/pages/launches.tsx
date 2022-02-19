import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Launches from "../components/Launches";

export async function getStaticProps() {
  const pastResponse = await fetch(
    "https://api.spacexdata.com/v3/launches/past"
  );
  const pastLaunchData = await pastResponse.json();

  const upcomingResponse = await fetch(
    "https://api.spacexdata.com/v3/launches/upcoming"
  );
  const upcomingLaunchData = await upcomingResponse.json();

  return {
    props: {
      pastLaunchData,
      upcomingLaunchData,
    },
    revalidate: 3600,
  };
}

const Home: NextPage = ({ pastLaunchData, upcomingLaunchData }: any) => {
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

        <div className={styles.launches}>
          <Launches title="Past Launches" launchList={pastLaunchData} />
          <Launches title="Upcoming Launches" launchList={upcomingLaunchData} />
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
