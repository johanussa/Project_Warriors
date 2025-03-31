import { Button, CloseButton, Dialog, Portal, Span } from "@chakra-ui/react"
import { Warrior, WarriorUpdateProps } from "../../services/types";
import { WarriorCreateComponent } from "../warriorCreate/WarriorCreateComponents";
import { useState } from "react";

const WarriorUpdate = ({ warrior, warriorTypes, warriorBreeds, warriorPowers, warriorImages }: WarriorUpdateProps) => {

  const [warriorData, setWarrior] = useState<Warrior>({
    name: warrior.name,
    image: warrior.image,
    health: warrior.health,
    energy: warrior.energy,
    breedId: warrior.breed?.idBreed || "",
    warriorTypeId: warrior.warriorType?.idWarriorType || "",
    powersId: warrior.powers?.map(power => power.idPower) || [],
  });

  const handleUpdate = () => {
    // Example logic for updating
  };

  return (
    <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom" >
      <Dialog.Trigger asChild>
        <Button colorPalette="cyan">Actualizar</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <WarriorCreateComponent
                warrior={warriorData}
                title={`Actualizar información del guerrero: ${warrior.name}`}
                warriorTypes={warriorTypes}
                warriorBreeds={warriorBreeds}
                warriorPowers={warriorPowers}
                warriorImages={warriorImages}
                setWarrior={setWarrior}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default WarriorUpdate;