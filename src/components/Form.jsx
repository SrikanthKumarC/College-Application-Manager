import React from "react";
import { CollegeContext } from "../providers/CollegeProvider";
import { TextField, Checkbox, Flex, Text, Button } from "@radix-ui/themes";
const Form = ({ collegeId, collegeProp, feeProp, isAppliedProp }) => {
  const [college, setCollege] = React.useState(collegeProp || "");
  const [fee, setFee] = React.useState(feeProp || "");
  const [isApplied, setIsApplied] = React.useState(isAppliedProp || false);
  const { handleSubmit, editCollege } = React.useContext(CollegeContext);
  const BUTTON_TEXT = collegeId ? "Edit College" : "Add College";
  const uniqueId = React.useId();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setCollege("");
        setFee("");
        setIsApplied(false);
        if (collegeId) editCollege(collegeId, college, isApplied, fee);
        else handleSubmit(college, isApplied, fee);
      }}
    >
      <TextField.Root>
        <TextField.Input
          size="3"
          id="college_name"
          required
          variant="classic"
          value={college}
          placeholder="College Name"
          onChange={(e) => {
            setCollege(e.target.value);
          }}
        />
      </TextField.Root>
      <TextField.Root mt="2">
        <TextField.Slot>$</TextField.Slot>
        <TextField.Input
          required
          size="3"
          id="fee"
          variant="classic"
          type="number"
          value={fee}
          onChange={(e) => {
            setFee(e.target.value);
          }}
          placeholder="Fee"
        />
      </TextField.Root>
      <Text asChild size="3" mt="2">
        <Flex align="center" gap="2">
          <Checkbox
            id={`${uniqueId}-checkbox`}
            checked={isApplied}
            onCheckedChange={() => setIsApplied(!isApplied)}
          />
          <label id={`${uniqueId}-label`} htmlFor={`${uniqueId}-checkbox`}>
            Applied?
          </label>
        </Flex>
      </Text>
      <Button mt="3" size="3" variant="surface">
        {BUTTON_TEXT}
      </Button>
    </form>
  );
};
export default Form;
