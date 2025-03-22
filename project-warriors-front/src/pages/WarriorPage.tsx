import { Text, Spinner } from "@chakra-ui/react";
import { Warrior } from "../services/types";
import { useEffect, useState } from "react";
import { getAllWarriors } from "../services/warriorService";
import WarriorList from "../components/WarriorsList";
import WarriorData from "../components/WarriorData";

const WarriorPage = () => {

  const [warriors, setWarriors] = useState<Warrior[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [warriorShow, setWarriorShow] = useState<Warrior | null>(null);

  useEffect(() => {
    const warriorsData = async () => {
      try {
        const response = await getAllWarriors();
        setWarriors(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    warriorsData();
  }, []);

  const handlerShowWarrior = (warrior: Warrior) => {
    setWarriorShow(warrior);
    setOpenInfo(!openInfo);
  }

  if (loading) return (<Text textStyle="4xl">Cargando guerreros <Spinner size="sm" /></Text>);

  return (
    <>
      <WarriorList warriors={warriors} handlerShowWarrior={handlerShowWarrior} />
      <WarriorData open={openInfo} setOpen={setOpenInfo} warrior={warriorShow} />
    </>
  )
}

export default WarriorPage;