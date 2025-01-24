"use client"

import { HStack, Flex } from "@chakra-ui/react"
import SideBarMenu from "../sidebar"
import React, { ReactElement } from "react"

export default function Content({ children }: { children: ReactElement }) {
    return <HStack w='full' h='100vh' padding={8} gap={8}>
        <SideBarMenu />
        <Flex
            as='aside'
            w='full'
            h='full'
            borderWidth={2}
            alignItems='center'
            padding={6}
            flexDirection='column'
            justifyContent='center'
            borderRadius='lg'
        >
            <HStack gap="10" width="full" h='full' alignItems='flex-start'>
                {children}
            </HStack>
        </Flex>
    </HStack>
}