import React from "react";
import Container from '@material-ui/core/Container';
import "../Login/LoginStyle.css"
export const Submit = () => {
  return (
    <Container className="Login" maxWidth="sm" style={{ marginTop: '4rem' }}>
      <h3>Thank you for submitting, we will be in touch!</h3>
    </Container>
  );
};