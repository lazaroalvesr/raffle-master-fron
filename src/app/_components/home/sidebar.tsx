import Link from 'next/link'
import { Clover, Home, Ticket, HelpCircle, Headphones, DollarSign, SquarePen } from 'lucide-react'
import { IoMdClose } from 'react-icons/io'
import { NavLink } from '../util/linkRedirect'
import { UserNav } from './useNav'
import { useUser } from '@/app/hooks/useUsers'
import { Role, SidebarProps } from '@/lib/interface'

export default function Sidebar({ ativo, setAtivo }: SidebarProps) {
    const { user } = useUser()

    const isUser = user?.user?.role === Role.USER;
    const isAdm = user?.user?.role === Role.ADM

    return (
        <aside className={`flex flex-col fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${ativo ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <div className="flex items-center gap-2">
                    <Clover className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-bold">Rifa Flow</span>
                </div>
                <button className="lg:hidden" onClick={() => setAtivo(!ativo)}>
                    <IoMdClose size={30} />
                </button>
            </div>

            <div className="flex flex-col flex-grow overflow-y-auto">
                <div className="flex-grow p-4">
                    <div className="space-y-4">
                        <div>
                            <h2 className="mb-2 text-sm font-medium text-gray-500">Menu Principal</h2>
                            <nav className="space-y-1">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
                                >
                                    <Home className="h-5 w-5" />
                                    Início
                                </Link>
                                <Link
                                    href="/rifas"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
                                >
                                    <Ticket className="h-5 w-5" />
                                    Rifas
                                </Link>
                                <Link
                                    href="/como-funciona"
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50"
                                >
                                    <HelpCircle className="h-5 w-5" />
                                    Como Funciona?
                                </Link>
                            </nav>
                        </div>
                        {isUser ? (
                            <div>
                                <h2 className="mb-2 text-sm font-medium text-gray-500">Meus Bilhetes</h2>
                                <nav className="space-y-1">
                                    <NavLink href="/dashboard/meusbilhetes">
                                        <Ticket className="h-5 w-5" />
                                        <span>Bilhetes</span>
                                    </NavLink>
                                    <Link
                                        href="/como-funciona"
                                        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-50">
                                        <Headphones className="h-5 w-5" />
                                        Suporte
                                    </Link>
                                </nav>
                            </div>

                        ) : (
                            <div>
                                <h2 className="mb-2 text-sm font-medium text-gray-500">Minhas Rifas</h2>
                                <nav className="space-y-1">
                                    <NavLink href="/dashboard/gerenciar-rifas">
                                        <Ticket className="h-5 w-5" />
                                        <span>Gerenciar Rifas</span>
                                    </NavLink>
                                    <NavLink href="/dashboard/historico-vendas">
                                        <DollarSign className="h-5 w-5" />
                                        <span>Pagamentos</span>
                                    </NavLink>
                                    <NavLink href="/dashboard/criar-rifa">
                                        <SquarePen className="h-5 w-5" />
                                        <span>Criar Rifa</span>
                                    </NavLink>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 p-4 mt-auto">
                <UserNav name={user?.user?.name} email={user?.user?.email} isAdm={isAdm} />
            </div>
        </aside>
    )
}