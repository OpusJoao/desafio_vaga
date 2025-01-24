"use client"
import { Badge, Flex, HStack, Spinner, Stack, Table, Text, useFileUpload, useFileUploadContext } from "@chakra-ui/react";
import Content from "../components/content";
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "../../components/ui/pagination";
import { Button } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../../components/ui/file-upload"
import { useCallback, useEffect, useState } from "react";
import { toaster } from "../../components/ui/toaster";
import { json } from "stream/consumers";

const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]
export default function TrasactionsFilePage() {
    const [transFiles, setTransFiles] = useState({ data: [] });
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const updateData = () => {
        fetch('http://localhost:3000/transction-engine/list-transaction-process',
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJ1c2VybmFtZSI6ImpvZGV2IiwiaWF0IjoxNzM3NzA3MDMzLCJleHAiOjE3Mzc3MTA2MzN9.gD2paRnjiOvpgbR4dSmAAFEsTLoC6wCEZFP9qlzqN9Q'
                }
            }).then(res => res.json())
            .then(data => {
                setTransFiles(data);
            })
    }

    const getColorBadgeByStatus = (status: string): string => {
        const map = {
            uploaded: 'yellow',
            processing: 'blue',
            error: 'red',
            finished: 'green'
        }

        return map[status]
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 B";

        const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));

        const fileSize = (bytes / Math.pow(1024, i)).toFixed(2);
        return `${fileSize} ${sizes[i]}`;
    }

    const calculateTimeDifference = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const differenceInMilliseconds = endDate - startDate;

        if (differenceInMilliseconds < 0) {
            return "A data de início é maior que a data de fim.";
        }

        const seconds = Math.floor(differenceInMilliseconds / 1000) % 60;
        const minutes = Math.floor(differenceInMilliseconds / (1000 * 60)) % 60;
        const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60)) % 24;
        const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        let result = "";
        if (days > 0) result += `${days} dia${days > 1 ? "s" : ""}, `;
        if (hours > 0 || days > 0) result += `${hours} hora${hours > 1 ? "s" : ""}, `;
        if (minutes > 0 || hours > 0 || days > 0) result += `${minutes} minuto${minutes > 1 ? "s" : ""}, `;
        result += `${seconds} segundo${seconds > 1 ? "s" : ""}`;

        return result;
    }

    const handleSubmitFile = () => {
        setIsLoading(true);

        // Verifica se há arquivos aceitos
        if (!file || !file.acceptedFiles || file.acceptedFiles.length === 0) {
            toaster.create({
                title: "Selecione um arquivo antes de enviar.",
            })
            return;
        }

        // Cria o objeto FormData
        const formData = new FormData();
        formData.append('file', file.acceptedFiles[0]);

        setIsLoading(true);

        fetch('http://localhost:3000/transction-engine/process-transactions', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ${response.status}: ${response.statusText}`);
                }
                return true;
            })
            .then(data => {
                toaster.create({
                    title: "Requisição feita com sucesso",
                    description: "Transação processada com sucesso!", // Mensagem opcional
                });
            })
            .catch(err => {
                toaster.create({
                    title: "Ocorreu um erro.",
                    description: err.message,
                });
            })
            .finally(() => {
                setIsLoading(false);
            });

    };

    const getTransactionFiles = (page = 1) => {
        setIsLoading(true);
        fetch('http://localhost:3000/transction-engine/list-transaction-process?page=' + page,
            {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJ1c2VybmFtZSI6ImpvZGV2IiwiaWF0IjoxNzM3NzA3MDMzLCJleHAiOjE3Mzc3MTA2MzN9.gD2paRnjiOvpgbR4dSmAAFEsTLoC6wCEZFP9qlzqN9Q'
                }
            }).then(res => res.json())
            .then(data => {
                setTransFiles(data);
                setIsLoading(false);
            })

    }

    const handleChangeFile = (file) => {
        setFile(file);
    }

    const handlePageChange = (page) => {
        getTransactionFiles(page.page);

    }

    useEffect(updateData, [])
    return (
        <Content>
            <Stack w='full' gap={4}>
                <Text w='full' fontSize='3xl' fontWeight='medium'>Arquivos de Transações</Text>
                <FileUploadRoot allowDrop={true} onFileChange={(file) => handleChangeFile(file)}>
                    <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm">
                            <HiUpload /> Enviar arquivo de transação
                        </Button>
                    </FileUploadTrigger>
                    <FileUploadList />
                </FileUploadRoot>
                <Button w={56} onClick={() => handleSubmitFile()}>{isLoading ? <Spinner /> : 'Enviar'}</Button>
                <Stack width="full" gap="5">
                    <Table.Root size="sm" showColumnBorder>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Data</Table.ColumnHeader>
                                <Table.ColumnHeader>Nome do arquivo</Table.ColumnHeader>
                                <Table.ColumnHeader>Tamanho</Table.ColumnHeader>
                                <Table.ColumnHeader>Tempo de processamento</Table.ColumnHeader>
                                <Table.ColumnHeader>Status</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {transFiles.data.map((item) => (
                                <Table.Row key={item._id}>
                                    <Table.Cell>{item.startDate}</Table.Cell>
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{formatFileSize(item.size)}</Table.Cell>
                                    <Table.Cell>{calculateTimeDifference(item.startDate, item.updatedAt)}</Table.Cell>
                                    <Table.Cell>
                                        <Badge colorPalette={getColorBadgeByStatus(item.status)}>{item.status}</Badge>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>

                    {transFiles.totalPages > 1 && <PaginationRoot justifyItems='center' count={transFiles.totalItems} pageSize={10} page={transFiles.currentPage} onPageChange={(page) => handlePageChange(page)}>
                        <HStack wrap="wrap">
                            <PaginationPrevTrigger />
                            <PaginationItems />
                            <PaginationNextTrigger />
                        </HStack>
                    </PaginationRoot>}
                </Stack>
            </Stack>
        </Content>
    )
}