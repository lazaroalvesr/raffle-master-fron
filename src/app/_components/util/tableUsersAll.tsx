/* eslint-disable */

"use client"

import { useState } from "react";
import { UserAllProps } from "@/lib/interface";
import { Info, SearchX } from "lucide-react";
import { formatTelephone, formatTelephoneLinkWhatsapp } from "@/lib/formatTelephone";
import Link from "next/link";
import InfoUsers from "./infoUsers";
import Image from "next/image";

export const TableUserAll = ({ users }: { users: UserAllProps[] }) => {
    const [show, setShow] = useState(false);
    const [selectUser, setSelectUser] = useState<UserAllProps | null>(null);

    function toggle(raffles: any) {
        setSelectUser(raffles);
        setShow(!show);
    }

    const close = () => {
        setShow(false);
        setSelectUser(null);
    };

    return (
        <div className="w-full overflow-y-auto custom-scrollbar lg:h-[580px]">
           
            <div className="rounded-xl lg:mx-0 border bg-white shadow-sm">
                <div className="overflow-x-auto w-full">
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
                            {users.length === 0 ? (
                                <tr className="">
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
                                users.map((user, index) => (
                                    <tr key={index} className="border-b transition-colors hover:bg-gray-50/50">
                                        <td className="py-4 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium w-28 truncate text-gray-900">{user.name}</span>
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
                                                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
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
                    <div className="animate-modalShow w-full">
                        <InfoUsers
                            name={selectUser?.name}
                            surname={selectUser?.surname}
                            email={selectUser?.email}
                            telephone={formatTelephone(selectUser?.telephone)}
                            close={close}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
