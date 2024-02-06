import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const ResetEmail = ({ userFirstname, resetPasswordToken }) => {
  return (
    <Html>
      <Head />
      <Preview>Nextforms reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/public/favicon.png`}
            width="40"
            height="40"
            alt="Nextforms"
          />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Nextforms
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={`${baseUrl}/resetPassword/${resetPasswordToken}`}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>Good luck!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetEmail;

const main = {
  backgroundColor: "#fff",
  padding: "10px 0",
}

const container = {
  backgroundColor: "#1a212d",
  padding: "45px",
  borderRadius: "4px"
}

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#fff",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#0654be",
  borderRadius: "4px",
  border: "none",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "210px",
  padding: "14px 7px",
}

