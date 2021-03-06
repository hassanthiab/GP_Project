import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import axios from "../axios/axios";
import NavTop from '../Homepage/NavTop.jsx';

let Verify = () => {
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");

  let sendEmailV = () => {
    axios()
      .post("/api/email/verification-notification")
      .then((response) => {
        if (response.status == 204) setVerified(true);
      })
      .catch((error) => {
        if (!error.response) return;

        setMessage(error.response.data.message);
      });
  };

  return (
    <Fragment>
        <NavTop/>
      <div class="container">
        <div class="row" style={{ marginTop: 40 }}>
          <div class="col-sm-3"></div>
          <div
            style={{ backgroundColor: "#222222", color: "#FFAA00" }}
            class="col-sm-6 success card shadow  border-success"
          >
            <div class="card-body" style={{ textAlign: "center" }}>
              <strong>
                <span
                  className={verified ? "text-success" : "text-danger"}
                  style={{ fontSize: 19, fontWeight: "bold" }}
                >
                  {" "}
                  {verified
                    ? "your email is already verified "
                    : " the verification email has been sent to ..@..com, please check your email "}
                </span>
              </strong>
              {verified ? (
                ""
              ) : (
                <a
                  onClick={sendEmailV}
                  style={{ fontSize: 19, fontWeight: "bold" }}
                  href="#"
                >
                  Resend email
                </a>
              )}
            </div>
          </div>

          <div class="col-sm-3"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Verify;
