import { useEffect, useState } from "react";
import { Button, CloseButton, Drawer, Portal, Image } from "@chakra-ui/react";
import { Warrior, WarriorDataProps } from "../../services/types";
import { deleteWarrior, getWarriorById } from "../../services/warriorService";
import { ButtonConfirm, LoadingScreen, WarriorBreed, WarriorPowers, WarriorStatus, WarriorTypeComp } from "./WarriorDataComponents";
import WarriorUpdate from "../warriorUpdate/WarriorUpdate";

const WarriorData = ({ open, setOpen, idWarrior, handlerDeleteWarrior, warriorTypes, warriorBreeds, warriorImages, warriorPowers }: WarriorDataProps) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [warrior, setWarrior] = useState<Warrior>({
    name: "", image: "", health: 0, energy: 0,
    breedId: "", warriorTypeId: "", powersId: []
  });

  useEffect(() => {
    if (!idWarrior || idWarrior === warrior?.idWarrior) return;

    const getWarrior = async () => {
      const response = await getWarriorById(idWarrior);
      if (response) setWarrior(response);
      setLoading(false);
    }
    getWarrior();
  }, [idWarrior]);

  const handleDelete = (idWarrior: string | undefined) => {
    if (idWarrior) {
      deleteWarrior(idWarrior);
      setOpen(false);
      handlerDeleteWarrior(idWarrior);
    }
  }

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="md">
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            {loading ? (<LoadingScreen />) : (
              <>
                <Drawer.Header pb="0">
                  <Drawer.Title textStyle="2xl">{warrior?.name}</Drawer.Title>
                </Drawer.Header>
                <Image
                  width="100%" height="450px" fit="contain"
                  src={warrior?.image} alt={warrior?.name}
                />
                <Drawer.Body mt="3">
                  <WarriorStatus warrior={warrior} />
                  <WarriorBreed breed={warrior?.breed} />
                  <WarriorTypeComp warriorType={warrior?.warriorType} />
                  <WarriorPowers powers={warrior?.powers} />
                </Drawer.Body>
                <Drawer.Footer>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cerrar</Button>
                  <WarriorUpdate
                    warrior={warrior}
                    warriorTypes={warriorTypes}
                    warriorBreeds={warriorBreeds}
                    warriorPowers={warriorPowers}
                    warriorImages={warriorImages}
                  />
                  <ButtonConfirm warrior={warrior} handleDelete={handleDelete} />
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </>
            )}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}

export default WarriorData;