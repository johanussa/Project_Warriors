import { Container, Flex, Card, Image, Span, VStack, HStack, Separator, Button } from '@chakra-ui/react';
import { BtnCreateWarriorProps, WarriorListProps } from '../services/types';

export const WarriorList = ({ warriors, handleShowWarrior }: WarriorListProps) => (
  <Container p="5" width="100%" maxWidth="100%">
    <Flex gap="6" wrap="wrap" minWidth="300px" justify="center">
      {
        warriors.length === 0 ? (
          <VStack textAlign="center" fontWeight="medium">No hay guerreros para mostrar</VStack>
        ) : (
          warriors.map((warrior) => (
            <Card.Root
              overflow="hidden" width="280px" key={warrior.idWarrior} cursor="pointer"
              bgColor="#00000060" color="#FFF" onClick={() => handleShowWarrior(warrior)}
            >
              <Image
                width="100%" height="220px" fit="contain"
                src={warrior.image} alt={warrior.name}
              />
              <Card.Body bgColor="#000" p="3" pt="2">
                <Card.Title textAlign="center" style={{textTransform: "capitalize"}}>{warrior.name}</Card.Title>
                <Card.Body p="0">
                  {["Salud", "Energia"].map((option, index) => (
                    <Card.Description display="flex" justifyContent="space-evenly" alignItems="center" color="#FFF" key={option}>
                      <Span fontSize="18px" fontWeight="medium" letterSpacing="tight" width="150px">{option}: </Span>
                      <Span>{index === 1 ? warrior.health : warrior.energy}</Span>
                    </Card.Description>
                  ))}
                </Card.Body>
              </Card.Body>
            </Card.Root>
          ))
        )
      }
    </Flex >
  </Container>
);

export const BtnCreateWarrior = ({ openCreate, setOpenCreate }: BtnCreateWarriorProps) => (
  <HStack m="5" >
    <Separator flex="1" />
    <Button
      width="150px"
      _hover={{ transform: "scale(1.05)" }}
      transition={"transform .3s ease-in-out"}
      onClick={() => setOpenCreate(prev => !prev)}
    >
      {openCreate ? "Cancelar" : "Crear guerrero"}
    </Button>
    <Separator flex="1" />
  </HStack>
);