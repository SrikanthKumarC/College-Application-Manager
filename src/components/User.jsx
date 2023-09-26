import React from "react";
import { Card, Flex, Avatar, Text, Box, Inset } from "@radix-ui/themes";
import { format } from "date-fns";
import { Camera } from "lucide-react";
import { LogOut } from "lucide-react";
const ICON_STROKE_WIDTH = 1.3;

const User = ({ imageURL, name, lastLogin, singOut }) => {
  return (
    <Card mt="2">
      <Flex justify={"space-between"}>
        <Flex gap="3" align="center" p="2">
          <Avatar size="4" src={`${imageURL}`} radius="full" fallback="T" />
          <Box>
            <Text as="div" size="4" weight="bold">
              Hello, {name}!
            </Text>
            {lastLogin ? (
              <Text as="div" size="2" color="gray">
                Welcome back! You last logged in at:{" "}
                {format(new Date(lastLogin), "d LLL yyyy 'at' hh:mm b")}
              </Text>
            ) : (
              <Text as="div" size="2" color="gray">
                Welcome, start by adding your first college!
              </Text>
            )}
          </Box>
        </Flex>
        <Inset
          side="right"
          pr="current"
        >
          <Flex
            align="center"
            justify="center"
            pr="2"
            style={{ height: "100%" }}
          >
            <LogOut onClick={singOut} size={32} strokeWidth={ICON_STROKE_WIDTH} />
          </Flex>
        </Inset>
      </Flex>
    </Card>
  );
};

export default User;
