import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleGetUser = async () => {
  //   const user = await axios.get("/api/user");
  //   console.log(user);
  // };

  const handleLogOut = async () => {
    const user = await axios.post("/api/auth/logout");
    if (user.data.bool === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(async () => {
    const user = await axios.get("/api/user");
    if (user.data.bool === true) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="cont">
      <nav
        className="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <div className="container-fluid">
          <Link href={"/"}>
            <div className="navbar-brand cursor">Ikrom Cargo</div>
          </Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a aria-current="page" className="nav-link" href="/invoices">
                Admin
              </a>
            </li>
            <li className="nav-item">
              <a aria-current="page" className="nav-link" href="/table">
                Invoice
              </a>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <div className="nav-link cursor" onClick={handleLogOut}>
                  Logout
                </div>
              ) : (
                <div className="nav-link cursor  ">
                  <Link href={"/login"}>
                    <div>Login</div>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <div
        id="carouselExampleDark"
        className="   carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img src="./images/s1.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>YOUR PASSION BEGINS FROM HERE</h5>
              <p>All kind of new brand clothes of your choice just for you.</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="./images/s2.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>BEING PREPARED IN ONE BOX</h5>
              <p>
                In a very secure and clean wrapped box which is sealed just for
                you.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="./images/s3.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>ALL THE WAY TO YOUR HOUSE</h5>
              <h5>CONTACT TO IKROM CARGO +998913131122</h5>
              <p>
                Delivered to you in a few days, so enjoy our service and we are
                ready for your next order!.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="bg">
        <div className="fs-1 text-info  text-center">
          IKROM CARGO +998913131122
        </div>
      </div>
    </div>
  );
}
