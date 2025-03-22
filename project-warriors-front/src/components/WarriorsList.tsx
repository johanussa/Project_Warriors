import { Container, Flex, For, Card, Image, Span } from '@chakra-ui/react';
import { Warrior } from '../services/types';

interface WarriorListProps {
  warriors: Warrior[];
  handlerShowWarrior: (warrior: Warrior) => void
}

const WarriorList = ({ warriors, handlerShowWarrior }: WarriorListProps) => {

  return (
    <Container padding="6" width="100vw" height="100vh">
      <Flex gap="6" wrap="wrap" minWidth="300px" justify="center">
        <For each={warriors} >
          {(warrior) => (
            <Card.Root
              overflow="hidden" width="280px" key={warrior.idWarrior} cursor="pointer"
              bgColor="#00000060" color="#FFF" onClick={() => handlerShowWarrior(warrior)}
            >
              <Image
                width="100px" height="250px" margin="0 auto"
                src={warrior.image} alt={warrior.name}
              />
              <Card.Body bgColor="#000" p="4">
                <Card.Title textAlign="center" pt="-2">{warrior.name}</Card.Title>
                <Card.Body p="0">
                  <For each={["Salud", "Energia"]} >
                    {(option, index) => (
                      <Card.Description display="flex" justifyContent="space-evenly" alignItems="center" color="#FFF">
                        <Span fontSize="18px" fontWeight="medium" letterSpacing="tight" width="150px">{option}: </Span>
                        <Span>{index === 1 ? warrior.health : warrior.energy}</Span>
                      </Card.Description>
                    )}
                  </For>
                </Card.Body>
              </Card.Body>
            </Card.Root>
          )}
        </For>
      </Flex >
    </Container>
  );
}

export default WarriorList;