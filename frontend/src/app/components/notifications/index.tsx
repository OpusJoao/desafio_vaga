import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function Notifications(){
    const [state, setState] = useState({
        bottom: 0,
    });
    const handleClickNotificationsHeader = () => {
        const currentState = state;
        currentState.bottom = currentState.bottom == 300 ? 0 : 300;
        setState(currentState);
    }
    return <Box 
    position='absolute' 
    w={300} 
    h={50} 
    bottom={state.bottom} 
    right={0} 
    m={4}
    backgroundColor='#14204a'
    borderRadius='lg'
    alignContent='center'
    justifyItems='center'
    cursor='pointer'
    onClick={() => handleClickNotificationsHeader()}
>
    <Text color='#a3cfff' fontSize='lg'>
        Notificações
    </Text>
</Box>
}