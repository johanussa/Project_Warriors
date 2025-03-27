import { Button, Fieldset, Stack } from "@chakra-ui/react";
import { Breed, Power, WarriorType, WarriorData } from "../../services/types";
import { FieldForm, ImageSelector, RadioGroup } from "./WarriorCreateComponents";
import { useState } from "react";

interface WarriorCreateProps {
  warriorTypes: WarriorType[];
  warriorBreeds: Breed[];
  warriorPowers: Power[];
  warriorImages: string[];
}

const WarriorCreate = ({ warriorTypes, warriorBreeds, warriorPowers, warriorImages }: WarriorCreateProps) => {

  const [warriorData, setWarriorData] = useState<WarriorData>({
    name: "", image: "", health: 0, energy: 0,
    breedId: "", warriorTypeId: "", powersId: []
  });

  return (
    <form action="">
      <Fieldset.Root size="lg" maxW="full" p="8">
        <Stack>
          <Fieldset.Legend fontSize="1.2rem" fontWeight="bold">Crear nuevo guerrero</Fieldset.Legend>
          <Fieldset.Content display="grid" gridTemplateColumns="65% 35%">
            <Fieldset.HelperText>
              Ingresar todos los datos requeridos y recordar que se debe agregar al menos 5 poderes
            </Fieldset.HelperText>
            <Fieldset.Content width="220px" >
              <ImageSelector warriorImages={warriorImages} />
            </Fieldset.Content>
          </Fieldset.Content>
        </Stack>

        <Fieldset.Content display="grid" gridTemplateColumns="1fr 1fr 1fr">
          <FieldForm label="Nombre" type="text" id="name" />
          <FieldForm label="Energia" id="energy" />
          <FieldForm label="Salud" id="health" />

          <RadioGroup label="Tipo de guerrero"
            options={warriorTypes.map(t => ({ id: t.idWarriorType, name: t.name, description: t.description }))} extra={false} />
          <RadioGroup label="Raza del guerrero"
            options={warriorBreeds.map(b => ({ id: b.idBreed, name: b.name, description: b.description, resistence: b.resistance }))} extra />
          <RadioGroup label="Elegir poderes"
            options={warriorPowers.map(p => ({ id: p.idPower, name: p.name, description: p.description }))} extra={false} />
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">
          Crear guerrero
        </Button>
      </Fieldset.Root>
    </form>
  )
}

export default WarriorCreate