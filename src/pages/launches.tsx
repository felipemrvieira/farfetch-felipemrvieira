import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Launches from "../components/Launches";

const Home: NextPage = () => {
  const pastLaunchesData = [
    {
      id: 1,
      missionName: "FalconSat",
      missionPatch: "https://images2.imgbox.com/e1/e5/N51e3mCq_o.png",
      launchDate: "2019-01-01",
      launchSite: "VAFB",
    },
    {
      id: 2,
      missionName: "FalconSat",
      missionPatch: "https://images2.imgbox.com/e1/e5/N51e3mCq_o.png",
      launchDate: "2019-01-01",
      launchSite: "VAFB",
    },
  ];

  const futureLaunchesData = [
    {
      id: 1,
      missionName: "Future FalconSat",
      missionPatch: "https://images2.imgbox.com/e1/e5/N51e3mCq_o.png",
      launchDate: "2019-01-01",
      launchSite: "VAFB",
    },
    {
      id: 2,
      missionName: "Future FalconSat",
      missionPatch: "https://images2.imgbox.com/e1/e5/N51e3mCq_o.png",
      launchDate: "2019-01-01",
      launchSite: "VAFB",
    },
  ];
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
        <Launches title="Past Launches" launchList={pastLaunchesData} />
        <Launches title="Future Launches" launchList={futureLaunchesData} />
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
