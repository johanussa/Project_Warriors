import { useCallback, useState } from "react";
import { Button, Field, Input, HStack, RadioCard, CloseButton, Dialog, Portal, Span, Image, CheckboxCard, CheckboxGroup, Flex, Text, Fieldset, Stack } from "@chakra-ui/react";
import { ImageSelectorProps, ImageOptionsProps, FieldFormProps, RadioGroupProps, WarriorCreateCompProps } from "../../services/types";
import { onWarriorChange } from "../../services/warriorUtils";

export const ImageSelector = ({ warriorImages, setWarriorData, image }: ImageSelectorProps) => {

    const [selectedImage, setSelectedImage] = useState<string>(image || "");

    const handleImageChange = useCallback((image: string) => {
        setWarriorData(prevState => ({ ...prevState, image }));
        setSelectedImage(image);
    }, [setWarriorData]);

    return (
        <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom" >
            <Dialog.Trigger as="span">
                <SelectedImageButton image={selectedImage} />
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
                        <Dialog.Body display="flex" flexWrap="wrap" justifyContent="space-around" gap="1" >
                            <ImageOptions
                                warriorImages={warriorImages}
                                selectedImage={selectedImage}
                                onImageChange={handleImageChange}
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

const SelectedImageButton = ({ image }: { image: string }) => (
    image ? (
        <Button
            variant="outline"
            borderRadius="full"
            width="100px"
            height="100px"
            position="absolute"
            top="40px"
            right="80px"
            transition={"all .4s ease-in-out"}
        >
            <Image
                src={image}
                boxSize="100px"
                borderRadius="full"
                fit="contain"
                alt="Selected Character"
            />
        </Button>
    ) : (
        <Button variant="outline">Elegir imagen del personaje</Button>
    )
);

const ImageOptions = ({ warriorImages, selectedImage, onImageChange }: ImageOptionsProps) => (
    warriorImages.map(imageStr => (
        <Image
            key={imageStr}
            src={imageStr}
            boxSize="165px"
            borderRadius="full"
            fit="contain"
            alt={imageStr.slice(38)}
            cursor="pointer"
            border={imageStr === selectedImage ? "3px solid #000000" : "1px solid #00000010"}
            onClick={() => onImageChange(imageStr)}
            _hover={{ border: "2px solid #00000090", transform: "scale(1.05)" }}
        />
    ))
);

export const FieldForm = ({ label, name, type = "number", handlerChange, value }: FieldFormProps) => (
    <Field.Root>
        <Field.Label>{label}</Field.Label>
        <Input name={name} type={type} onChange={handlerChange} value={value} />
    </Field.Root>
);

export const RadioGroup = ({ value, name, label, options, extra, handlerChange, width = "160px" }: RadioGroupProps) => (
    <Field.Root gridColumn="span 3" >
        <Field.Label>{label}</Field.Label>
        <RadioCard.Root name={name} onChange={handlerChange} defaultValue={value} >
            <HStack align="stretch" flexWrap="wrap">
                {options.map(item => (
                    <RadioCard.Item key={item.id} value={item.id} minWidth={width} _hover={{ bgColor: "#00000010" }}>
                        <RadioCard.ItemHiddenInput />
                        <RadioCard.ItemControl>
                            <RadioCard.ItemContent>
                                <RadioCard.ItemText fontSize="1rem">{item.name}</RadioCard.ItemText>
                                <RadioCard.ItemDescription>{item.description}</RadioCard.ItemDescription>
                                {extra && (
                                    <RadioCard.ItemDescription>
                                        <Span fontSize=".9rem" fontWeight="medium">Resistencia: </Span>{item?.resistence}
                                    </RadioCard.ItemDescription>
                                )}
                            </RadioCard.ItemContent>
                            <RadioCard.ItemIndicator />
                        </RadioCard.ItemControl>
                    </RadioCard.Item>
                ))}
            </HStack>
        </RadioCard.Root>
    </Field.Root>
);

export const CheckboxPowers = ({ options, handlerChange, powers }: RadioGroupProps) => (
    <CheckboxGroup name="powersId" onChange={handlerChange} gridColumn="span 3" defaultValue={powers} >
        <Text textStyle="sm" fontWeight="medium">Elegir poderes</Text>
        <Flex gap="2" flexWrap="wrap">
            {options.map((item) => (
                <CheckboxCard.Root  key={item.id} value={item.id} minWidth="160px" _hover={{ bgColor: "#00000010" }}>
                    <CheckboxCard.HiddenInput />
                    <CheckboxCard.Control>
                        <CheckboxCard.Content>
                            <CheckboxCard.Label>{item.name}</CheckboxCard.Label>
                            <CheckboxCard.Description>
                                {item.description}
                            </CheckboxCard.Description>
                        </CheckboxCard.Content>
                        <CheckboxCard.Indicator />
                    </CheckboxCard.Control>
                </CheckboxCard.Root>
            ))}
        </Flex>
    </CheckboxGroup>
);

export const WarriorCreateComponent = ({ warrior, warriorTypes, warriorBreeds, warriorPowers, warriorImages, setWarrior, title }: WarriorCreateCompProps) => (
    <Fieldset.Root size="lg" maxW="full" p="8" pt="0">
        <Stack>
            <Fieldset.Legend fontSize="1.3rem" fontWeight="bold">{title}</Fieldset.Legend>
            <Fieldset.Content display="grid" gridTemplateColumns="65% 35%">
                <Fieldset.HelperText>
                    Ingresar todos los datos requeridos y recordar que se debe agregar al menos 5 poderes
                </Fieldset.HelperText>
                <Fieldset.Content width="220px" >
                    <ImageSelector warriorImages={warriorImages} setWarriorData={setWarrior} image={warrior?.image} />
                </Fieldset.Content>
            </Fieldset.Content>
        </Stack>

        <Fieldset.Content display="grid" gridTemplateColumns="1fr 1fr 1fr">
            <FieldForm value={warrior?.name} label="Nombre" type="text" name="name" handlerChange={(event) => onWarriorChange({ event, setWarrior })} />
            <FieldForm value={warrior?.energy} label="Energia" name="energy" handlerChange={(event) => onWarriorChange({ event, setWarrior })} />
            <FieldForm value={warrior?.health} label="Salud" name="health" handlerChange={(event) => onWarriorChange({ event, setWarrior })} />

            <RadioGroup value={warrior?.warriorTypeId} name="warriorTypeId" label="Tipo de guerrero" handlerChange={(event) => onWarriorChange({ event, setWarrior })}
                options={warriorTypes.map(t => ({ id: t.idWarriorType, name: t.name, description: t.description }))} extra={false} />
            <RadioGroup value={warrior?.breedId} name="breedId" label="Raza del guerrero" handlerChange={(event) => onWarriorChange({ event, setWarrior })} width="260px"
                options={warriorBreeds.map(b => ({ id: b.idBreed, name: b.name, description: b.description, resistence: b.resistance }))} extra />
            <CheckboxPowers
                handlerChange={(event) => onWarriorChange({ event, setWarrior })} powers={warrior?.powersId}
                options={warriorPowers.map(p => ({ id: p.idPower, name: p.name, description: p.description }))} />
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start">Crear guerrero</Button>
    </Fieldset.Root>
);