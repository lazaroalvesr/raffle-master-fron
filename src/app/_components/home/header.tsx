"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '../../hooks/useUsers'
import { NavLinkHeader } from '../util/linkRedirectHeader'
import { Clover } from 'lucide-react'
import { ButtonRedirect } from '../util/buttonRedirect'
import { DropDownNavUser } from '../util/dropDownNavUser'

export default function Header() {
    const { user } = useUser()
    const [ativo, setAtivo] = useState(false);

    function toggle() {
        setAtivo(!ativo)
    }

    return (
        <header className="shadow-md bg-white">
            <div className="max-w-8xl lg:mx-12 px-4 sm:px-6 lg:px-3">
                <div className="flex lg:justify-around md:justify-around items-center py-4">
                    <div className=" flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Clover className="h-10 w-10 text-green-500" />
                            <span className="ml-2 text-[32px]  text-gray-900">Rifa Flow</span>
                        </Link>
                    </div>

                    <button
                        className="lg:hidden md:hidden absolute right-5"
                        onClick={toggle}
                        aria-label="Botão de abrir Menu Mobile"
                    >
                        {ativo ? (
                            <Image src="/img/icons/x.svg" alt="Ícone fechar menu" width={40} height={40} />
                        ) : (
                            <Image src="/img/icons/menu-deep.svg" alt="Ícone abrir menu" width={40} height={40} />
                        )}
                    </button>
                    <nav className={`flex lg:h-12 lg:gap-60 md:gap-0 items-center lg:flex-row md:h-auto lg:space-x-4 md:items-center md:mr-8 lg:mr-0
    ${ativo ?
                            'z-40 absolute flex-col bg-white py-12 gap-y-3 text-center left-0 w-full top-20 transition-all duration-500 ease-in-out max-h-[300px] opacity-100'
                            :
                            'z-40 absolute lg:static md:static md:flex-row flex-col bg-white py-0 gap-y-0 text-center left-0 w-full lg:w-fit md:w-fit top-20 transition-all duration-500 ease-in-out opacity-0 md:opacity-100 lg:opacity-100 overflow-auto h-0'}`}>

                        <nav className='flex lg:flex-row gap-4 flex-col md:flex-row'>
                            <NavLinkHeader href="/">
                                Início
                            </NavLinkHeader>
                            <NavLinkHeader href="/rifas">
                                Rifas
                            </NavLinkHeader>
                            <NavLinkHeader href="/como-funciona">
                                Como Funciona?
                            </NavLinkHeader>
                        </nav>

                        <nav className='lg:h-auto lg:w-[190px] md:ml-5 md:h-auto flex pt-4 md:pt-0 lg:pt-0'>
                            {user ? (
                                <div>
                                    <div className='flex gap-4 items-center'>
                                        <ButtonRedirect />
                                        <DropDownNavUser />
                                    </div>
                                </div>
                            ) : (
                                <div className='w-[190px]'>
                                    <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md lg:text-[18px] text-lg font-medium">
                                        Entrar
                                    </Link>
                                    <Link href="/auth/register" className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md lg:text-[18px] text-lg font-medium">
                                        Criar conta
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </nav>
                </div >
            </div >
        </header >
    )
}