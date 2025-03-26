import { useEffect, useState } from "react";
import { Text, Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Breed, Power, Warrior, WarriorType } from "../services/types";
import { getAllWarriors, getWarriorTypes, getBreeds, getPowers, getImages } from "../services/warriorService";
import WarriorList from "../components/WarriorsList";
import WarriorData from "../components/WarriorData";
import WarriorCreate from "../components/WarriorCreate";

const WarriorPage = () => {

  const [warriors, setWarriors] = useState<Warrior[]>([]);
  const [warriorTypes, setWarriorTypes] = useState<WarriorType[]>([]);
  const [warriorBreeds, setWarriorBreeds] = useState<Breed[]>([]);
  const [warriorPowers, setWarriorPowers] = useState<Power[]>([]);
  const [warriorImages, setWarriorImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [idWarrior, setIdWarrior] = useState<string>("");

  useEffect(() => {
    const warriorsData = async () => {
      try {
        const [warriorsResponse, typesResponse, breedsResponse, powersResponse, imagesResponse] = await Promise.all([
          getAllWarriors(),
          getWarriorTypes(),
          getBreeds(),
          getPowers(),
          getImages()
        ]);
        setWarriors(warriorsResponse);
        setWarriorTypes(typesResponse);
        setWarriorBreeds(breedsResponse);
        setWarriorPowers(powersResponse);
        setWarriorImages(imagesResponse);
      } catch (error) {
        toast.error(`Se presento un error: ${error}`);
      } finally { setLoading(false); }
    }

    warriorsData();
  }, []);

  const handlerShowWarrior = (warrior: Warrior) => {
    setIdWarrior(warrior.idWarrior);
    setOpenInfo(prev => !prev);
  }

  if (loading) return (<Text textStyle="4xl">Cargando guerreros <Spinner size="sm" /></Text>);

  return (
    <>
      <WarriorCreate warriorTypes={warriorTypes} warriorBreeds={warriorBreeds} warriorPowers={warriorPowers} warriorImages={warriorImages}/>
      <WarriorList warriors={warriors} handlerShowWarrior={handlerShowWarrior} />
      {openInfo && <WarriorData open={openInfo} setOpen={setOpenInfo} idWarrior={idWarrior} />}
    </>
  )
}

export default WarriorPage;