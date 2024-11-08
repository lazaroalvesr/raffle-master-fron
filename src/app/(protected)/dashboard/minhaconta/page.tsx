/* eslint-disable */

'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useUser } from "@/app/hooks/useUsers"
import { getInitials } from "@/lib/getInitials"
import Image from "next/image"
import Cookies from "js-cookie";
import { dataProps } from "@/lib/interface"
import { BaseURL } from "@/app/api/api"

export default function ModalMinhaContaPage({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> })  {
    const { user, updateUser } = useUser()
    const [isEditing, setIsEditing] = useState(false)
    const token = Cookies.get("token");
    const [data, setData] = useState<dataProps>({
        name: "",
        surname: "",
        email: "",
        telephone: ""
    })
    const [isOpen, setIsOpen] = useState(false)

    function toggle() {
        setIsOpen(true)
    }

    useEffect(() => {
        if (user?.user) {
            setData({
                name: user.user.name,
                surname: user.user.surname,
                email: user.user.email,
                telephone: user.user.telephone,
            });
        }
    }, [user]);


    const handleSubmit = async (data: dataProps, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?.user?.id) {
            console.log("User ID is not available.");
            return;
        }

        try {
            const response = await fetch(
                `${BaseURL}auth/editUser/${user.user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();

            if (result.token) {
                Cookies.set('token', result.token);
            }

            updateUser({
                name: data.name,
                surname: data.surname,
                email: data.email,
                telephone: data.telephone,
            });

            setIsEditing(false);
            console.log("User data updated successfully");

        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };



    return (
        <Card className="w-full z-50 max-w-md mx-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute lg:right-[500px] md:right-[140px] md:top-[304px] md:rounded-l-none md:rounded-br-md right-4 items-center flex justify-center top-[30px] rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-[109px] lg:rounded-r-md w-12 h-12 bg-white">
                <Image
                    src="/img/icons/close.svg"
                    width={35}
                    height={35}
                    alt="Close modal icon"
                />
            </button>
            <CardHeader className="flex flex-col items-center space-y-4 pb-6 pt-8">
                <Avatar className="h-24 w-24">
                    <AvatarFallback>{getInitials(user?.user.name)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-2xl font-bold"></h2>
                    <p className="text-sm text-muted-foreground"></p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" value={user?.user.name} readOnly />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" value={user?.user.surname} readOnly />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={user?.user.email} readOnly />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" value={user?.user.telephone} type="tel" readOnly />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={toggle}>Editar informações</Button>
                    </DialogTrigger>
                    {isOpen ? (
                        <DialogContent className="w-[340px] rounded-md lg:w-full">
                            <DialogHeader>
                                <DialogTitle>Editar Perfil</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={(e) => handleSubmit(data, e)}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="editFirstName">Nome</Label>
                                            <Input
                                                id="editFirstName"
                                                name="firstName"
                                                type="text"
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="editLastName">Sobrenome</Label>
                                            <Input
                                                id="editLastName"
                                                name="lastName"
                                                type="text"
                                                onChange={(e) => setData({ ...data, surname: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="editEmail">Email</Label>
                                        <Input
                                            id="editEmail"
                                            name="email"
                                            type="email"
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="editPhone">Telefone</Label>
                                        <Input
                                            id="editPhone"
                                            name="phone"
                                            type="tel"
                                            onChange={(e) => setData({ ...data, telephone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit">Salvar alterações</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    ) : ""}

                </Dialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">Deletar conta</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                                e removerá seus dados de nossos servidores.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                Sim, deletar minha conta
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}