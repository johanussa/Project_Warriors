import { OnWarriorChangeProps } from "./types";

export const onWarriorChange = ({ event, setWarrior }: OnWarriorChangeProps) => {
    const { name, value } = event.target;

    setWarrior(prevState => ({
        ...prevState,
        [name]: name === "powersId" ? togglePower(prevState.powersId, value) : value
    }));
}

const togglePower = (powers: string[], powerId: string): string[] => {
    return powers.includes(powerId)
        ? powers.filter(id => id !== powerId)
        : [...powers, powerId];
};