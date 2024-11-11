import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaUser } from "react-icons/fa";
import { LogOut, User } from 'lucide-react'
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { useUser } from "@/app/hooks/useUsers";

export const DropDownNavUser = () => {
    const { logout } = useAuth()
    const { user } = useUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <FaUser size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 mt-2" align="end" forceMount>
                <DropdownMenuGroup>
                    <Link href={`${user?.user?.role === 'USER' ? "/dashboard/meusbilhetes" : "/dashboard/minhaconta"}`}>
                        <DropdownMenuItem className='cursor-pointer'>
                            <User />
                            Minha conta
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}