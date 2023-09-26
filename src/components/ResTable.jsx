import {
  Table,
  Card,
  Heading,
  Badge,
  Tooltip,
  Button,
  Flex,
  Text,
  Dialog,
  AlertDialog,
} from "@radix-ui/themes";
import React from "react";
import { CollegeContext } from "../providers/CollegeProvider";
import { XCircle, Pencil } from "lucide-react";
import { red, blue } from "@radix-ui/colors";
import Dialogue from "../utils/Dialogue";
import Form from "./Form";
import { ICON_STROKE_WIDTH, ICON_SIZE } from "../utils/constants";

let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const ResTable = () => {
  const { collegeData: data, handleDelete } = React.useContext(CollegeContext);
  if (!data) return;
  if (data.length < 1) return;
  return (
    <>
      <Table.Root size="3" mt='4' variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>College</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={20}></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={20}></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((college) => {
            return (
              <Table.Row
                key={college.id}
                style={{ textTransform: "capitalize" }}
              >
                <Table.RowHeaderCell>{college.name}</Table.RowHeaderCell>
                <Table.Cell>{USDollar.format(college.fee)}</Table.Cell>
                <Table.Cell width={20}>
                  <Badge color={college.college_applied ? "green" : "blue"}>
                    {college.college_applied ? "Applied" : "not applied"}
                  </Badge>{" "}
                </Table.Cell>
                <Table.Cell width={30}>
                  <Dialogue
                    trigger={
                      <XCircle
                        strokeWidth={ICON_STROKE_WIDTH}
                        size={ICON_SIZE}
                        color={red.red10}
                      />
                    }
                    onConfirmation={() => {
                      handleDelete(college.id);
                    }}
                  >
                    <>
                      <Heading>Are you sure? </Heading>
                      <Text>You won't be able to get this back again!</Text>
                    </>
                  </Dialogue>{" "}
                </Table.Cell>
                <Table.Cell width={30}>
                  <Dialogue
                    trigger={
                      <Pencil
                        strokeWidth={ICON_STROKE_WIDTH}
                        size={ICON_SIZE}
                        color={blue.blue10}
                      />
                    }
                  >
                    <Form
                      collegeId={college.id}
                      collegeProp={college.name}
                      feeProp={college.fee}
                      isAppliedProp={college.applied}
                    />
                  </Dialogue>{" "}
                  <Tooltip content="edit"></Tooltip>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default React.memo(ResTable);
