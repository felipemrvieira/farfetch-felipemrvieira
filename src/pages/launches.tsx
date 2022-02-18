import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import FutureLaunches from "../components/FutureLaunches";
import PastLaunches from "../components/PastLaunches";

const Home: NextPage = () => {
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
        <PastLaunches />
        <FutureLaunches />
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
