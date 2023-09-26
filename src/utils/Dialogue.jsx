import { Dialog, Flex, Button } from "@radix-ui/themes";
import React from "react";
function Dialogue({ trigger, title, description, onConfirmation, children }) {
  return (
    <Dialog.Root modal={true}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {children}
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          {onConfirmation && (
            <Dialog.Close>
              <Button onClick={onConfirmation}>Delete</Button>
            </Dialog.Close>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default Dialogue;
