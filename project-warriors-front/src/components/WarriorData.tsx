import { useEffect, useState } from "react";
import { Button, CloseButton, Drawer, Portal, Image } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Warrior } from "../services/types";
import { getWarriorById } from "../services/warriorService";
import { LoadingScreen, WarriorBreed, WarriorPowers, WarriorStatus, WarriorTypeComp } from "./WarriorDataComponents";

interface WarriorDataProps {
  open: boolean;
  setOpen: (event: boolean) => void;
  idWarrior: string;
}

const WarriorData = ({ open, setOpen, idWarrior }: WarriorDataProps) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [warrior, setWarrior] = useState<Warrior | null>(null);

  useEffect(() => {
    if (!idWarrior || idWarrior === warrior?.idWarrior) return;

    const getWarrior = async () => {
      try {
        const response = await getWarriorById(idWarrior);
        setWarrior(response);
      } catch (error) {
        toast.error(`Se presento un error: ${error}`);
      } finally { setLoading(false); }
    }

    getWarrior();
  }, [idWarrior]);

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
                  width="200px" height="450px" margin="0 auto 6px"
                  src={warrior?.image} alt={warrior?.name}
                />
                <Drawer.Body>
                  <WarriorStatus warrior={warrior}/>
                  <WarriorBreed breed={warrior?.breed}/>
                  <WarriorTypeComp warriorType={warrior?.warriorType}/>
                  <WarriorPowers powers={warrior?.powers}/>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cerrar</Button>
                  <Button>Actualizar</Button>
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