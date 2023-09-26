import React from "react";
import { Heading, Text } from "@radix-ui/themes";
const Header = () => {
  return (
    <header style={{ textAlign: "center" }}>
      <Heading mb="2" size="8">
        College Application Tracker
      </Heading>
      <Text color="gray" style={{ textTransform: "capitalize" }}>
        Easily manage your college applications
      </Text>
    </header>
  );
};

export default Header;
