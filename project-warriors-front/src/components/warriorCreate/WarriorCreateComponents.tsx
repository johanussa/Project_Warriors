import { Button, Field, Input, HStack, RadioCard, CloseButton, Dialog, Portal, Span, Image } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useState } from "react";
import { WarriorData } from "../../services/types";

interface ImageSelectorProps {
    warriorImages: string[];
    setWarriorData: (updater: (prevState: WarriorData) => WarriorData) => void;
}

export const ImageSelector = ({ warriorImages, setWarriorData }: ImageSelectorProps) => {

    const [image, setImage] = useState<string>("");

    const handlerChange = useCallback((image: string) => {
        setWarriorData(prevState => ({ ...prevState, image }));
        setImage(image);
    }, [setWarriorData]);

    return (
        <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom" >
            <Dialog.Trigger asChild transition={"all .5s ease-in-out"}>
                {renderSelectedButton({ image })}
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
                            {renderImageOptions({ warriorImages, image, handlerChange })}
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

const renderSelectedButton = ({ image }: { image: string }) => (
    image ? (
        <Button
            variant="outline"
            borderRadius="full"
            width="100px"
            height="100px"
            position="absolute"
            top="15px"
            right="50px"
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

interface ImageOptionsProps {
    warriorImages: string[];
    image: string;
    handlerChange: (image: string) => void;
}

const renderImageOptions = ({ warriorImages, image, handlerChange }: ImageOptionsProps) => (
    warriorImages.map(imageStr => (
        <Image
            key={imageStr}
            src={imageStr}
            boxSize="165px"
            borderRadius="full"
            fit="contain"
            alt={imageStr.slice(38)}
            cursor="pointer"
            border={imageStr === image ? "3px solid #000000" : "1px solid #00000010"}
            onClick={() => handlerChange(imageStr)}
            _hover={{ border: "2px solid #00000090", transform: "scale(1.05)" }}
        />
    ))
);

interface FieldFormProps {
    label: string;
    name: string;
    type?: string;
    handlerChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FieldForm = ({ label, name, type = "number", handlerChange }: FieldFormProps) => (
    <Field.Root>
        <Field.Label>{label}</Field.Label>
        <Input name={name} type={type} onChange={handlerChange} />
    </Field.Root>
);

interface RadioGroupProps {
    name: string;
    label: string;
    options: {
        id: string;
        name: string;
        description: string;
        resistence?: number;
    }[];
    extra: boolean;
    handlerChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup = ({ name, label, options, extra, handlerChange }: RadioGroupProps) => (
    <Field.Root gridColumn="span 3">
        <Field.Label>{label}</Field.Label>
        <RadioCard.Root name={name} onChange={handlerChange} defaultValue="next">
            <HStack align="stretch">
                {options.map(item => (
                    <RadioCard.Item key={item.id} value={item.id} >
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