import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import Notify from "../components/Notify";

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
        <Link href="/launches" passHref={true}>
          <a>
            <Notify>Fasten your seat belts</Notify>
          </a>
        </Link>
        <p className={styles.codebase}>
          The codebase for this project can be seen{" "}
          <a href="https://github.com/felipemrvieira/farfetch-felipemrvieira">
            here
          </a>
        </p>
      </main>
    </div>
  );
};

export default Home;
