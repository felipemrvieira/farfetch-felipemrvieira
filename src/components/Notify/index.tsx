import React from "react";
import style from "./notify.module.scss";

const Notify = ({ children }: any) => {
  return <div className={style.container}>{children}</div>;
};

export default Notify;
