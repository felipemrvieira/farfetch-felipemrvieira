import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../../styles/Home.module.scss";
import Filter from "../components/Filter";
import Launches from "../components/Launches";
import StarIcon from "@mui/icons-material/Star";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";

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
  const [dateStartRange, setDateStartRange] = useState(new Date(2000, 0, 1));
  const [dateEndRange, setDateEndRange] = useState(new Date(2022, 0, 1));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const removeItem = (item: any) => {
    if (typeof window !== "undefined") {
      const storedLaunchs = JSON.parse(
        localStorage.getItem("favoriteLaunches") || "[]"
      );
      if (storedLaunchs) {
        const launchs = storedLaunchs.filter(
          (el: any) => el.mission_name !== item.mission_name
        );
        localStorage.setItem("favoriteLaunches", JSON.stringify(launchs));
        setOpen(false);
        toast.success("Launch removed from favorites!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const renderFavoriteLaunches = () => {
    if (typeof window !== "undefined") {
      const storedLaunchs = JSON.parse(
        localStorage.getItem("favoriteLaunches") || "[]"
      );
      if (storedLaunchs.length > 0) {
        return storedLaunchs.map((launch: any) => (
          <div
            className={styles.favoriteItem}
            key={launch.flight_number + launch.launch_date_unix}
            onClick={() => removeItem(launch)}
          >
            <img
              className="{style.missionPatch}"
              src={launch.mission_patch_small}
              alt={launch.mission_name}
              width="25"
              height="25"
            />
            <span>Flight Number: {launch.flight_number}</span>
            <br />
            <span>Mission Name: {launch.mission_name}</span>
            <span>{launch.flight_number}</span>
            <hr />
          </div>
        ));
      } else {
        return <div>No favorites</div>;
      }
    }
  };

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
          <span className={styles.favorites} onClick={handleOpen}>
            Favorites
            <StarIcon />
          </span>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={styles.modalContainer}>
              {renderFavoriteLaunches()}
            </div>
          </Modal>
        </div>
        <img
          className="{style.missionPatch}"
          src="spacex-logo.png"
          alt="spacex logo"
          width="225"
          // height="25"
        />
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
