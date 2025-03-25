import { Drawer, VStack, Spinner, Text, DataList, Span } from "@chakra-ui/react";
import { Warrior, Breed, WarriorType, Power } from "../services/types";

export const LoadingScreen = () => (
    <VStack colorPalette="teal" mt="200px">
        <Spinner color="colorPalette.600" />
        <Text textStyle="xl" color="colorPalette.600">Cargando...</Text>
    </VStack>
);

export const WarriorStatus = ({ warrior }: { warrior: Warrior | null }) => (
    <Drawer.Description>
        <Drawer.Title mb="2">Estado</Drawer.Title>
        <DataList.Root orientation="horizontal" mb="2" ml="5" gap="1">
            {["Salud", "Energia"].map((option, index) => (
                <DataList.Item key={option}>
                    <DataList.ItemLabel fontWeight="medium" fontSize=".9rem">{option}</DataList.ItemLabel>
                    <DataList.ItemValue>{index === 1 ? warrior?.health : warrior?.energy}</DataList.ItemValue>
                </DataList.Item>
            ))}
        </DataList.Root>
    </Drawer.Description>
);

export const WarriorBreed = ({ breed }: { breed?: Breed }) => (
    <Drawer.Description mb="1">
        <Drawer.Title mb="2">Raza</Drawer.Title>
        <Drawer.Description ml="5">
            <Span fontSize="1rem" fontWeight="bold">{breed?.name}</Span>
            <Text><Span fontSize=".9rem" fontWeight="medium">Descripción: </Span>{breed?.description}</Text>
            <Text><Span fontSize=".9rem" fontWeight="medium">Resistencia: </Span>{breed?.resistance}</Text>
        </Drawer.Description>
    </Drawer.Description>
);

export const WarriorTypeComp = ({ warriorType }: { warriorType?: WarriorType }) => (
    <Drawer.Description>
        <Drawer.Title mb="2">Tipo de guerrero</Drawer.Title>
        <Drawer.Description ml="5">
            <Span fontSize="1rem" fontWeight="bold">{warriorType?.name}</Span>
            <Text mb="2"><Span fontSize=".9rem" fontWeight="medium">Descripción: </Span>{warriorType?.description}</Text>
        </Drawer.Description>
    </Drawer.Description>
);

export const WarriorPowers = ({ powers }: { powers?: Power[] }) => (
    <Drawer.Description>
        <Drawer.Title mb="2">Poderes</Drawer.Title>
        {powers?.map((power) => (
            <Drawer.Description key={power.name} ml="5">
                <Span fontSize="1rem" fontWeight="bold">{power.name}</Span>
                <Text><Span fontSize=".9rem" fontWeight="medium">Descripción: </Span>{power.description}</Text>
                <Text><Span fontSize=".9rem" fontWeight="medium">Efecto: </Span>{power.effect}</Text>
                <Text><Span fontSize=".9rem" fontWeight="medium">Daño: </Span>{power.damage}</Text>
                <Text><Span fontSize=".9rem" fontWeight="medium">Energía consumida: </Span>{power.powerEnergyConsumed}</Text>
            </Drawer.Description>
        ))}
    </Drawer.Description>
);