import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import SideBarGroupItem from "./sidebarGroupItem";

export default function SideBarMenu() {
    return <Flex
        as='aside'
        w='full'
        h='full'
        maxW={350}
        borderWidth={2}
        alignItems='center'
        padding={6}
        flexDirection='column'
        justifyContent='flex-start'
        borderRadius='lg'
    >
        <Text fontSize='4xl' fontWeight='bold'>
            Zestra
        </Text>
        <React.Fragment>
            <Box w='full'>
                <SideBarGroupItem />
            </Box>
        </React.Fragment>
    </Flex>
}