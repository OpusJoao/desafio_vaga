"use client"
import { Flex, HStack, Stack, Table, Text } from "@chakra-ui/react";
import Content from "../components/content";
import { useRouter } from "next/navigation";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../../components/ui/pagination";
import { useEffect, useState } from "react";

export default function CostumersPage() {
    const [customers, setCustomers] = useState({data: []});
    const items = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
    ]

    useEffect(() => {
            fetch('http://localhost:3000/customers', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJ1c2VybmFtZSI6ImpvZGV2IiwiaWF0IjoxNzM3NzA3MDMzLCJleHAiOjE3Mzc3MTA2MzN9.gD2paRnjiOvpgbR4dSmAAFEsTLoC6wCEZFP9qlzqN9Q'
                }
            })
            .then((res) => res.json())
            .then((data) => {
                setCustomers(data)
            })
            .catch((e) => {
                setCustomers({data:[]})
            })
        },[])
    return (
        <Content>
            <Stack w='full'>
                <Flex justifyContent='space-between' w='full'>
                    <Text fontSize='3xl' fontWeight='medium'>Clientes</Text>
                </Flex>
                <Stack width="full" gap="5">
                    <Table.Root size="sm" showColumnBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Nome</Table.ColumnHeader>
                                <Table.ColumnHeader>Documento</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customers && customers.data.map((item) => (
                                <Table.Row key={item._id}>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.document}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>

                    <PaginationRoot justifyItems='center' count={customers.totalItems} pageSize={10} page={customers.currentPage}>
                        <HStack wrap="wrap">
                            <PaginationPrevTrigger />
                            <PaginationItems />
                            <PaginationNextTrigger />
                        </HStack>
                    </PaginationRoot>
                </Stack>
            </Stack>
        </Content>
    )
}