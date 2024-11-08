'use client'
import * as React from "react"
import { Clover, Home, Ticket, HelpCircle, Gift } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { UserNav } from "./useNav"
import { useUser } from "@/app/hooks/useUsers"
import Link from "next/link"
import { NavLink } from "../util/linkRedirect"

export default function AppSidebar() {
    const { user } = useUser()

    return (
        <Sidebar>
            <SidebarContent className="sr-only">Menu de navegação</SidebarContent>
            <SidebarHeader className="border-b border-border p-4">
                <div className="flex items-center gap-2">
                    <Clover className="h-6 w-6 text-green-500" />
                    <span className="text-xl font-bold">Rifa Flow</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/">
                                        <Home className="h-4 w-4" />
                                        <span>Início</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/rifas">
                                        <Ticket className="h-4 w-4" />
                                        <span>Rifas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/como-funciona">
                                        <HelpCircle className="h-4 w-4" />
                                        <span>Como Funciona?</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Meus Bilhetes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <NavLink href="/dashboard/meusbilhetes">
                                        <Ticket className="h-4 w-4" />
                                        <span>Bilhetes</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/bilhetes/ativos">
                                        <Gift className="h-4 w-4" />
                                        <span>Minhas Rifas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/como-funciona">
                                        <HelpCircle className="h-4 w-4" />
                                        <span>Suporte</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="flex-1" />
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupContent className="hover:bg-sidebar-accent cursor-pointer py-2 rounded-lg">
                        <UserNav
                            name={user?.user.name}
                            email={user?.user.email}
                        />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}