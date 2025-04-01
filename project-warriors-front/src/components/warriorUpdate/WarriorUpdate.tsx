import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { Warrior, WarriorUpdateProps } from "../../services/types";
import { WarriorCreateComponent } from "../warriorCreate/WarriorCreateComponents";
import { FormEvent, useState } from "react";
import { updateWarrior } from "../../services/warriorService";

const WarriorUpdate = ({ warrior, warriorTypes, warriorBreeds, warriorPowers, warriorImages, handlerUpdateWarrior }: WarriorUpdateProps) => {

  const [warriorUp, setWarriorUp] = useState<Warrior>({
    idWarrior: warrior.idWarrior,
    name: warrior.name,
    image: warrior.image,
    health: warrior.health,
    energy: warrior.energy,
    breedId: warrior.breed?.idBreed || "",
    warriorTypeId: warrior.warriorType?.idWarriorType || "",
    powersId: warrior.powers?.map(power => power.idPower) || [],
  });

  const handlerUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = updateWarrior(warriorUp);
    if (response !== null) handlerUpdateWarrior(warriorUp);    
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
              <form onSubmit={handlerUpdate}>
                <WarriorCreateComponent
                  warrior={warriorUp}
                  title={`Actualizar información del guerrero: ${warrior.name}`}
                  warriorTypes={warriorTypes}
                  warriorBreeds={warriorBreeds}
                  warriorPowers={warriorPowers}
                  warriorImages={warriorImages}
                  setWarrior={setWarriorUp}
                  isUpdate
                />
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default WarriorUpdate;