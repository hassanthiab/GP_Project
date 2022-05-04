import React from "react";
import Container from '@material-ui/core/Container';
import NavTop from "../Homepage/NavTop";

import "../Login/LoginStyle.css"
export const Submit = () => {
  return (
    <React.Fragment>
        <NavTop/>

    <Container className="Login" maxWidth="sm" style={{ marginTop: '4rem' }}>
      <h3>Thank you for submitting, we will be in touch!</h3>
    </Container>
    </React.Fragment>

  );
};