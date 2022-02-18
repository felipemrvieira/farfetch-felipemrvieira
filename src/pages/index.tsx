import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Farfetch - @felipemrvieira</title>
        <meta
          name="description"
          content="Farfetch challenge - @felipemrvieira"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Farfetch Challenge{" "}
          <a href="https://github.com/felipemrvieira">@felipemrvieira</a>
        </h1>
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
