import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";
import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout () {
  return (
    <div className={css.container}>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Outlet/>
      </Suspense>
    </div>
  );
}