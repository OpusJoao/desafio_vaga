import { Badge, Box, Heading, Link, List, Text } from "@chakra-ui/react";

export default function SideBarItem({ item, isActive }: { item: any, isActive: boolean }) {
    const { icon, notifications, messages, path, label } = item;
    if (item.type == 'link') {
        return <Box
            display='flex'
            alignItems='center'
            my='6'
            justifyContent='center'
        >
            <Link
                href={path}
                as={Link}
                gap={1}
                display='flex'
                alignItems='center'
                fontWeight='medium'
                w='full'
                color={isActive ? 'white' : 'gray.400'}
                _hover={{ textDecoration: 'none', color: 'white' }}
            >
                <List.Indicator as={icon} fontSize={22} m={0} />
                <Text>{label}</Text>
                {notifications && (
                    <Badge
                        borderRadius='full'
                        colorScheme='red'
                        w={6}
                        textAlign='center'
                    >
                        {notifications}
                    </Badge>
                )}
                {messages && (
                    <Badge
                        borderRadius='full'
                        colorScheme='green'
                        w={6}
                        textAlign='center'
                    >
                        {messages}
                    </Badge>
                )}
            </Link>
        </Box>
    }
    return <Heading
        color='gray.400'
        fontWeight='medium'
        textTransform='uppercase'
        fontSize='sm'
        borderTopWidth={1}
        borderColor='gray.700'
        pt={8}
        my={8}
        w='full'
    >
        <Text>{label}</Text>
    </Heading>
}