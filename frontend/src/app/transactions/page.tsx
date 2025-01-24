"use client"
import { Flex, HStack, Stack, Table, Text } from "@chakra-ui/react";
import Content from "../components/content";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../../components/ui/pagination";
import { useEffect, useState } from "react";

export default function TrasactionsPage() {
    const [transactions, setTransactions] = useState({
        data: [],
        totalItems: 0,
    });
    const router = useRouter();
    const handleSendTransactions = () => {
        router.push('/transactions-file');
    }

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
        .then((res) => res.json())
        .then((data) => {
            setTransactions(data)
            console.log(transactions)
        })
        .catch((e) => {
            setTransactions({data:[]})
        })
    },[])

    return (
        <Content>
            <Stack w='full'>
                <Flex justifyContent='space-between' w='full'>
                    <Text fontSize='3xl' fontWeight='medium'>Transações</Text>
                    <Button fontSize='xl' onClick={() => handleSendTransactions()}>Enviar Transações</Button>
                </Flex>
                <Stack width="full" gap="5">
                    <Table.Root size="sm" showColumnBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Data</Table.ColumnHeader>
                                <Table.ColumnHeader>Cliente Id</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Valor</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {transactions && transactions.data.map((item) => (
                                <Table.Row key={item._id}>
                                    <Table.Cell>{item.date}</Table.Cell>
                                    <Table.Cell>{item.customerId}</Table.Cell>
                                    <Table.Cell textAlign="end">{item.amount}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>

                    <PaginationRoot justifyItems='center' count={transactions.totalItems} pageSize={10} page={transactions.currentPage}>
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