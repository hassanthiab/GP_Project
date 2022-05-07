import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import axios from "../axios/axios";

let Verify = () => {
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [vSent, setVSent] = useState(false);

  let sendEmailV = () => {
    axios()
      .post("/api/email/verification-notification")
      .then((response) => {
        if (response.status == 202) setVSent(true);
        else if (response.status == 204) setVerified(true);
      })
      .catch((error) => {
        if (!error.response) return;
        setVSent(false);
        setMessage(error.response.data.message);
      });
  };

  return (
    <Fragment>
  
      {vSent ? (
        <div
          style={{ backgroundColor: "#222222", color: "#FFAA00" }}
          class="success card shadow  border-success"
        >
          <div class="card-body" style={{ textAlign: "center" }}>
            <strong>
              <span
                className={verified ? "text-success" : "text-danger"}
                style={{ fontSize: 19, fontWeight: "bold" }}
              >
                {" "}
                {verified
                  ? "Your email is already verified "
                  : " the email has been sent "}
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
                resend email
              </a>
            )}
          </div>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#222222", color: "#FFAA00" }}
          class="success card shadow  border-success"
        >
          <div class="card-body" style={{ textAlign: "center" }}>
            <strong>
              <span
                className={verified ? "text-success" : "text-danger"}
                style={{ fontSize: 19, fontWeight: "bold" }}
              >
                {" "}
                {verified
                  ? "Your email is already verified  "
                  : " Your email address is not verified. please, click the link to request an email verification. "}
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
                send email
              </a>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Verify;
