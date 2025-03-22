import { Button, CloseButton, Drawer, Portal, Image } from "@chakra-ui/react";
import { Warrior } from "../services/types";

interface WarriorDataProps {
  open: boolean;
  setOpen: (e: boolean) => void;
  warrior: Warrior | null;
}

const WarriorData = ({ open, setOpen, warrior }: WarriorDataProps) => {

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="md">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{warrior?.name}</Drawer.Title>
            </Drawer.Header>
            <Image
              width="200px" height="450px" margin="0 auto"
              src={warrior?.image} alt={warrior?.name}
            />
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

export default WarriorData;