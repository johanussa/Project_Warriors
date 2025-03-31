import { WarriorCreateProps, Warrior } from "../../services/types";
import { WarriorCreateComponent } from "./WarriorCreateComponents";
import { FormEvent, useState } from "react";
import { createWarrior } from "../../services/warriorService";

const WarriorCreate = ({ warriorTypes, warriorBreeds, warriorPowers, warriorImages, handlerAddWarrior }: WarriorCreateProps) => {

  const [warrior, setWarrior] = useState<Warrior>({
    name: "", image: "", health: 0, energy: 0,
    breedId: "", warriorTypeId: "", powersId: []
  });

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createWarrior({ warrior, handlerAddWarrior });
  }

  return (
    <form onSubmit={handlerSubmit} >
      <WarriorCreateComponent
        title="Crear nuevo guerrero"
        warriorTypes={warriorTypes}
        warriorBreeds={warriorBreeds}
        warriorPowers={warriorPowers}
        warriorImages={warriorImages}
        setWarrior={setWarrior}
      />
    </form>
  )
}

export default WarriorCreate