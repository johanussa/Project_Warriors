import { Button, Field, Fieldset, Input, NativeSelect, Stack, HStack, RadioCard, CloseButton, Dialog, Portal, Span, Image } from "@chakra-ui/react";
import { Breed, Power, WarriorType } from "../services/types"

interface WarriorCreateProps {
  warriorTypes: WarriorType[];
  warriorBreeds: Breed[];
  warriorPowers: Power[];
  warriorImages: string[];
}

const WarriorCreate = ({ warriorTypes, warriorBreeds, warriorPowers, warriorImages }: WarriorCreateProps) => {

  return (
    <Fieldset.Root size="lg" maxW="full" p="8">
      <Stack>
        <Fieldset.Legend fontSize="1.2rem" fontWeight="bold">Crear nuevo guerrero</Fieldset.Legend>
        <Fieldset.Content display="grid" gridTemplateColumns="65% 35%">
          <Fieldset.HelperText>
            Ingresar todos los datos requeridos y recordar que se debe agregar al menos 5 poderes
          </Fieldset.HelperText>
          <Fieldset.Content width="220px" >
            <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom" >
              <Dialog.Trigger asChild>
                <Button variant="outline" >
                  Elegir imagen del personaje
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content >
                    <Dialog.Header>
                      <Dialog.Title>Selecciona una imagen</Dialog.Title>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </Dialog.Header>
                    <Dialog.Body display="flex" flexWrap="wrap" justifyContent="space-around">
                      {warriorImages.map(image => <Image width="150px" height="450px" src={image} cursor="pointer" />)}
                    </Dialog.Body>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          </Fieldset.Content>
        </Fieldset.Content>
      </Stack>

      <Fieldset.Content display="grid" gridTemplateColumns="1fr 1fr 1fr">
        <Field.Root>
          <Field.Label>Nombre</Field.Label>
          <Input name="name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Energia</Field.Label>
          <Input name="energy" type="number" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Salud</Field.Label>
          <Input name="health" type="number" />
        </Field.Root>

        <Field.Root gridColumn="span 3">
          <Field.Label>Tipo de guerrero</Field.Label>
          <RadioCard.Root defaultValue="next">
            <HStack align="stretch">
              {warriorTypes.map((type) => (
                <RadioCard.Item key={type.idWarriorType} value={type.idWarriorType}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText fontSize="1rem">{type.name}</RadioCard.ItemText>
                      <RadioCard.ItemDescription>{type.description}</RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>
        </Field.Root>

        <Field.Root gridColumn="span 3">
          <Field.Label>Raza del guerrero</Field.Label>
          <RadioCard.Root defaultValue="next">
            <HStack align="stretch">
              {warriorBreeds.map((breed) => (
                <RadioCard.Item key={breed.idBreed} value={breed.idBreed}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText fontSize="1rem">{breed.name}</RadioCard.ItemText>
                      <RadioCard.ItemDescription>{breed.description}</RadioCard.ItemDescription>
                      <RadioCard.ItemDescription>
                        <Span fontSize=".9rem" fontWeight="medium">Resistencia: </Span>{breed.resistance}
                      </RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>
        </Field.Root>

        <Field.Root gridColumn="span 3">
          <Field.Label>Elegir poderes</Field.Label>
          <RadioCard.Root defaultValue="next">
            <HStack align="stretch">
              {warriorPowers.map((power) => (
                <RadioCard.Item key={power.idPower} value={power.idPower}>
                  <RadioCard.ItemHiddenInput />
                  <RadioCard.ItemControl>
                    <RadioCard.ItemContent>
                      <RadioCard.ItemText fontSize="1rem">{power.name}</RadioCard.ItemText>
                      <RadioCard.ItemDescription>{power.description}</RadioCard.ItemDescription>
                    </RadioCard.ItemContent>
                    <RadioCard.ItemIndicator />
                  </RadioCard.ItemControl>
                </RadioCard.Item>
              ))}
            </HStack>
          </RadioCard.Root>
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Crear guerrero
      </Button>
    </Fieldset.Root>
  )
}

export default WarriorCreate