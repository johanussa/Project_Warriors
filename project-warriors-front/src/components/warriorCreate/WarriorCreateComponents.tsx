import { Button, Field, Input, HStack, RadioCard, CloseButton, Dialog, Portal, Span, Image } from "@chakra-ui/react";

export const ImageSelector = ({ warriorImages }: { warriorImages: string[] }) => (
    <Dialog.Root size="xl" placement="center" motionPreset="slide-in-bottom" >
        <Dialog.Trigger asChild>
            <Button variant="outline" >Elegir imagen del personaje</Button>
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
                        {warriorImages.map(image => (
                            <Image
                                key={image}
                                src={image}
                                boxSize="165px"
                                borderRadius="full"
                                fit="contain"
                                alt={image.slice(38)}
                                cursor="pointer"
                                border="1px solid #00000010"
                            />
                        ))}
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
);

interface FieldFormProps {
    label: string;
    id: string;
    type?: string;
}

export const FieldForm = ({ label, id, type = "number" }: FieldFormProps) => (
    <Field.Root>
        <Field.Label>{label}</Field.Label>
        <Input name={id} type={type} />
    </Field.Root>
);

interface RadioGroupProps {
    label: string;
    options: {
        id: string;
        name: string;
        description: string;
        resistence?: number;
    }[];
    extra: boolean
}

export const RadioGroup = ({ label, options, extra }: RadioGroupProps) => (
    <Field.Root gridColumn="span 3">
        <Field.Label>{label}</Field.Label>
        <RadioCard.Root defaultValue="next">
            <HStack align="stretch">
                {options.map(item => (
                    <RadioCard.Item key={item.id} value={item.id}>
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