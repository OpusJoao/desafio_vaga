import { List } from "@chakra-ui/react"
import { MdOutlineDashboard, MdOutlineFilePresent, MdOutlineMoney, MdOutlinePerson } from "react-icons/md"
import SideBarItem from "../sidebarItem"
import { usePathname } from "next/navigation"

const items = [
    {
        label: 'Bem vindo',
    },
    {
        type: 'link',
        label: 'Dashboard',
        icon: MdOutlineDashboard,
        path: '/dashboard'
    },
    {
        type: 'link',
        label: 'Clientes',
        icon: MdOutlinePerson,
        path: '/customers'
    },
    {
        type: 'link',
        label: 'Transações',
        icon: MdOutlineMoney,
        path: '/transactions'
    },
    {
        type: 'link',
        label: 'Arquivo de Transações',
        icon: MdOutlineFilePresent,
        path: '/transactions-file'
    }
]

export default function SideBarGroupItem(){
    const pathname = usePathname()
    return <List.Root variant='plain'>
        {items.map((item, index) => (
            <List.Item key={index}><SideBarItem item={item} isActive={pathname == item.path}/></List.Item>
        ))}
    </List.Root>
}