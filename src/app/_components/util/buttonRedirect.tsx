import { useUser } from "@/app/hooks/useUsers"
import { Role } from "@/lib/interface"
import Link from "next/link"

export const ButtonRedirect = () => {
    const { user } = useUser()

    const roleUser = user?.role === Role.USER ? "/dashboard/meusbilhetes" : "/dashboard/minhaConta"
    const text = user?.role === Role.USER ? "Meus Bilhetes" : "Minha Conta"

    return (
        <Link href={roleUser}>
            <button className='bg-[#50c878] hover:bg-[#73e398] transition .3s ease-out text-white rounded-md w-32 h-10'>
                {text}
            </button>
        </Link>
    )
}