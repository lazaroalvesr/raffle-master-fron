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
import Cookies from "js-cookie";
import { dataProps, Role } from "@/lib/interface"
import { BaseURL } from "@/app/api/api"
import { IoMdClose } from "react-icons/io"
import { Crown } from "lucide-react"
import axios from "axios"
import { formatTelephone } from "@/lib/formatTelephone"

export default function ModalMinhaContaPage({ setIsModalOpen }: { setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { user, updateUser, deleteAccount } = useUser()
    const isAdmin = user?.user.role === Role.ADM

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const token = Cookies.get("token");
    const [data, setData] = useState<dataProps>({
        name: "",
        surname: "",
        email: "",
        telephone: ""
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    function toggle() {
        setIsOpen(true)
    }

    const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({
            ...prevData,
            telephone: formatTelephone(e.target.value)
        }));
    };

    useEffect(() => {
        if (user) {
            setData({
                name: data.name,
                surname: data.surname,
                email: data.email,
                telephone: data.telephone,
            });
        }
    }, [user]);

    const updateField = (field: keyof dataProps, value: string) => {
        const sanitizedValue = value.trim();
        setData((prev) => ({
            ...prev,
            [field]: sanitizedValue,
            ...(field === 'telephone' ? { telephone: formatTelephone(value) } : {}),
        }));
    };

    const handleSubmit = async (data: dataProps, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);
        setLoading(true);

        if (!user?.user.id) {
            setError("User ID is not available.");
            setLoading(false);
            return;
        }

        const filteredData: Partial<dataProps> = Object.fromEntries(
            Object.entries(data).filter(([key, value]) =>
                value !== "" && value !== user.user[key as keyof typeof user.user]
            )
        );

        try {
            const response = await axios.patch(
                `${BaseURL}auth/editUser/${user.user.id}`,
                filteredData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = response.data;

            if (result.token) {
                Cookies.set('token', result.token);
            }

            updateUser({
                ...user.user,
                ...filteredData,
            });

            setIsEditing(false);
            setSuccess("Informações atualizadas com sucesso!");
        } catch (e) {
            console.error("Erro ao buscar dados:", e);
            setError("Erro ao atualizar as informações. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full z-50 max-w-md mx-auto relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute lg:-right-[38px] md:-right-[42px] md:-top-[0.5px] md:rounded-l-none md:rounded-br-md right-0 items-center flex justify-center -top-[40px] rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:-top-[0.1px] lg:rounded-r-md w-12 h-12 bg-white">
                <IoMdClose size={30} />
            </button>
            <CardHeader className="relative flex flex-col items-center space-y-4 pb-6 pt-8">
                {isAdmin && (
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 transform">
                        <Crown className="h-8 w-8 text-yellow-400" />
                    </div>
                )}
                <Avatar className="h-24 w-24">
                    <AvatarFallback>{getInitials(user?.user?.name || "")}</AvatarFallback>
                </Avatar>
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
                    <Input id="phone" value={formatTelephone(user?.user.telephone)} type="tel" readOnly />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={toggle}>Editar informações</Button>
                    </DialogTrigger>
                    {isOpen && (
                        <DialogContent className="w-fit px-4 md:w-full">
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
                                                className="w-32 lg:w-full md:w-full"
                                                disabled={loading}
                                                onChange={(e) => updateField("name", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="editLastName">Sobrenome</Label>
                                            <Input
                                                id="editLastName"
                                                name="lastName"
                                                type="text"
                                                className="w-32 lg:w-full md:w-full"
                                                disabled={loading}
                                                onChange={(e) => updateField("surname", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="editEmail">Email</Label>
                                        <Input
                                            id="editEmail"
                                            name="email"
                                            type="email"
                                            className="w-72 lg:w-full md:w-full"
                                            disabled={loading}
                                            onChange={(e) => updateField("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="editPhone">Telefone</Label>
                                        <Input
                                            id="editPhone"
                                            name="telephone"
                                            type="tel"
                                            className="w-72 lg:w-full md:w-full"
                                            disabled={loading}
                                            value={data.telephone}
                                            onChange={handleTelephoneChange}
                                        />
                                    </div>
                                    <div className="flex items-center  flex-col justify-between">
                                        <div className="py-4">
                                            {error && (
                                                <div className=" text-sm lg:text-base text-red-700 rounded-md">
                                                    {error}
                                                </div>
                                            )}
                                            {success && (
                                                <div className=" text-sm lg:text-base text-green-700 rounded-md">
                                                    {success}
                                                </div>
                                            )}
                                        </div>

                                        <DialogFooter className="w-full lg:gap-32 gap-6">
                                            <Button
                                                disabled={loading}
                                                type="button" variant="outline"
                                                className="w-full"
                                                onClick={() => setIsEditing(false)}>
                                                Cancelar
                                            </Button>
                                            <Button disabled={loading} type="submit" className="w-full">
                                                {loading ? "Salvando..." : "Salvar alterações"}
                                            </Button>

                                        </DialogFooter>
                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    )}
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
                            <AlertDialogAction className="bg-destructive text-destructive-foreground" onClick={() => deleteAccount(user?.user.id, token)}>
                                Sim, deletar minha conta
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
