import { Container, Flex, Card, Image, Span } from '@chakra-ui/react';
import { Warrior } from '../services/types';

interface WarriorListProps {
  warriors: Warrior[];
  handlerShowWarrior: (warrior: Warrior) => void
}

const WarriorList = ({ warriors, handlerShowWarrior }: WarriorListProps) => {

  return (
    <Container padding="6" width="100vw" height="100vh">
      <Flex gap="6" wrap="wrap" minWidth="300px" justify="center">
        {warriors.map((warrior) => (
          <Card.Root
            overflow="hidden" width="280px" key={warrior.idWarrior} cursor="pointer"
            bgColor="#00000060" color="#FFF" onClick={() => handlerShowWarrior(warrior)}
          >
            <Image
              width="100px" height="250px" margin="0 auto"
              src={warrior.image} alt={warrior.name}
            />
            <Card.Body bgColor="#000" p="3" pt="2">
              <Card.Title textAlign="center">{warrior.name}</Card.Title>
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
        ))}
      </Flex >
    </Container>
  );
}

export default WarriorList;