import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Breed, Power, Warrior, WarriorType } from "../services/types";
import { Skeleton, Container, Flex } from "@chakra-ui/react";
import { getAllWarriors, getWarriorTypes, getBreeds, getPowers, getImages } from "../services/warriorService";
import { BtnCreateWarrior, WarriorList } from "../components/WarriorsList";
import WarriorData from "../components/warriorData/WarriorData";
import WarriorCreate from "../components/warriorCreate/WarriorCreate";

const WarriorPage = () => {

  const [warriors, setWarriors] = useState<Warrior[]>([]);
  const [warriorTypes, setWarriorTypes] = useState<WarriorType[]>([]);
  const [warriorBreeds, setWarriorBreeds] = useState<Breed[]>([]);
  const [warriorPowers, setWarriorPowers] = useState<Power[]>([]);
  const [warriorImages, setWarriorImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
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

  const handleShowWarrior = (warrior: Warrior) => {
    if (warrior.idWarrior) {
      setIdWarrior(warrior.idWarrior);
      setOpenInfo(prev => !prev);
    }
  }

  const handlerAddWarrior = (newWarrior: Warrior) => {
    setWarriors(prev => [...prev, newWarrior]);
    setOpenCreate(prev => !prev)
  };

  const handlerUpdateWarrior = (updatedWarrior: Warrior) => {
    setWarriors(prev => prev.map(warrior => warrior.idWarrior === updatedWarrior.idWarrior ? updatedWarrior : warrior));
    setOpenInfo(prev => !prev);
  }

  const handlerDeleteWarrior = (idWarrior: string) => {
    setWarriors(prev => prev.filter(warrior => warrior.idWarrior !== idWarrior));
  }

  if (loading) {
    return (
      <Container padding="6" width="100vw" height="100vh">
        <Flex gap="6" wrap="wrap" minWidth="300px" justify="center">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height="250px" width="280px" borderRadius="md" />
          ))}
        </Flex>
      </Container>
    );
  }

  return (
    <>
      <BtnCreateWarrior openCreate={openCreate} setOpenCreate={setOpenCreate} />
      {openCreate &&
        <WarriorCreate
          warriorTypes={warriorTypes}
          warriorBreeds={warriorBreeds}
          warriorPowers={warriorPowers}
          warriorImages={warriorImages}
          handlerAddWarrior={handlerAddWarrior} />}
      <WarriorList warriors={warriors} handleShowWarrior={handleShowWarrior} />
      {openInfo &&
        <WarriorData
          open={openInfo}
          setOpen={setOpenInfo}
          idWarrior={idWarrior}
          handlerDeleteWarrior={handlerDeleteWarrior}
          handlerUpdateWarrior={handlerUpdateWarrior}
          warriorTypes={warriorTypes}
          warriorBreeds={warriorBreeds}
          warriorPowers={warriorPowers}
          warriorImages={warriorImages}
        />}
    </>
  )
}

export default WarriorPage;