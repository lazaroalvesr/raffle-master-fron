import { useState } from "react";
import { Crown, Info, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { User, UserResponse } from "@/lib/interface";
import { formatTelephone, formatTelephoneLinkWhatsapp } from "@/lib/formatTelephone";
import { useResponsiveItemsPerPage } from "@/app/hooks/useResponsiveItemsPerPage";
import { PaginationControl } from "./pagination";

export const TableUserAll = ({ users }: { users: UserResponse }) => {
    const [show, setShow] = useState(false)
    const [selectUser, setSelecteUser] = useState<User | null>(null)
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = useResponsiveItemsPerPage({
        itemsTablet: 13,
        itemsDefault: 7,
    });

    const totalPages = Math.ceil(users.count / itemsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1)
    }

    const toggle = (user: User) => {
        setSelecteUser(user)
        setShow(!show)
    }

    const close = () => {
        setShow(false)
        setSelecteUser(null)
    }

    const displayedUsers = users.user.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full pb-12">
            <div className="rounded-md lg:mx-0 border bg-white shadow-sm">
                <div className="overflow-x-auto w-full table-container lg:h-[450px] h-[533px] md:h-[790px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50/40">
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Nome</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">SobreNome</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Email</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Telefone</th>
                                <th className="py-4 px-4 text-center text-sm font-medium text-gray-500 lg:hidden table-cell md:hidden">Informações</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {users.count === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        <div className="mx-auto flex flex-col items-center justify-center py-4">
                                            <SearchX className="h-6 w-6 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">
                                                Não há registros de usuários no Sistema.
                                                <br />
                                                Novos Usuários aparecerão aqui assim que forem realizados.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                displayedUsers.map((user, index) => (
                                    <tr key={index} className="border-b transition-colors hover:bg-gray-50/50">
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium w-28 truncate text-gray-900">{user.name}</span>
                                                <span className="absolute right-12">
                                                    {user.role === 'ADM' ? <Crown className="h-6 w-6 text-yellow-400" /> : ""}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                            <div className="flex flex-col">
                                                <span className="font-medium w-28 lg:w-16 truncate text-gray-900">{user.surname}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                            <div className="flex flex-col">
                                                <span className="font-medium w-40 lg:w-full truncate text-gray-900">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 hidden lg:table-cell md:table-cell w-fit">
                                            <div className="flex flex-col">
                                                <Link href={formatTelephoneLinkWhatsapp(user.telephone)} target="_blank" rel="noopener noreferrer" className="font-medium flex items-center gap-4 w-40 lg:w-30 truncate text-gray-900">
                                                    <Image
                                                        src="/img/icons/Icone-zap.png"
                                                        width={20}
                                                        alt="e"
                                                        height={20}
                                                    />
                                                    {formatTelephone(user.telephone)}
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 lg:hidden md:hidden">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => toggle(user)}
                                                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                                >
                                                    <Info className="h-5 w-5" />
                                                    <span className="sr-only">Ver informações</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {show && (
                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow w-full bg-white p-4 rounded-lg max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Informações do Usuário</h2>
                            <button onClick={close} className="text-gray-500 hover:text-gray-700">
                                ✕
                            </button>
                        </div>
                        {selectUser && (
                            <div className="space-y-2">
                                <p><strong>Nome:</strong> {selectUser.name}</p>
                                <p><strong>Sobrenome:</strong> {selectUser.surname}</p>
                                <p><strong>Email:</strong> {selectUser.email}</p>
                                <p><strong>Telefone:</strong> {formatTelephone(selectUser.telephone)}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="mt-8">
                <PaginationControl
                    setCurrentPage={setCurrentPage}
                    handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

export default TableUserAll;