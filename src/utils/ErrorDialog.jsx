import React from "react";
import { Dialog, Flex, Button } from "@radix-ui/themes";

const ErrorDialog = ({trigger, children}, forwardRef) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    React.useEffect(() => {
        const k = forwardRef;
        function toggle() {
            setIsOpen(!isOpen)
        }
        k.current.addEventListener('click', toggle);
        return () => {
            k?.current?.removeEventListener('click', toggle)
        }
    }, [])
 return (
    <Dialog.Root modal={true} open={isOpen} onOpenChange={() => {
        setIsOpen(false)
    }} >
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Oops
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {children ? children : 'Something went wrong!'}
        </Flex>

        <Flex gap="3" mt="4" justify="end">

            <Dialog.Close>
              <Button>Close</Button>
            </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}


export default React.forwardRef(ErrorDialog)