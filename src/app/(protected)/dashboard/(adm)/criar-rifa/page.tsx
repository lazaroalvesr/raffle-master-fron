/* eslint-disable */

"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatDate";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { InfoSectionCreateRaffle } from "@/app/_components/home/infoSectionCreateRaffle";
import axios from "axios";
import { BaseURL } from "@/app/api/api";
import Cookies from "js-cookie";
import { RaffleCreate } from "@/lib/interface";
import { useUser } from "@/app/hooks/useUsers";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import { ptBR } from "date-fns/locale"
import TiptapEditor from "@/app/_components/home/TiptapEditor";

export default function CriarRifa() {
    const { user } = useUser();
    const [image, setImage] = useState<File | null>(null);
    const [date, setDate] = useState<Date | undefined>();
    const token = Cookies.get("token");
    const [data, setData] = useState<RaffleCreate>({
        name: "",
        description: "",
        endDate: new Date(),
        startDate: new Date(),
        image: null as File | null,
        quantityNumbers: "",
        ticketPrice: ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [sucess, setSucess] = useState<String>();
    const [error, setError] = useState<String>();
    const [errorDate, setErrorDate] = useState<String>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData({ ...data, image: file });
            setImage(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        setData({ ...data, image: null });
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setImagePreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [image]);

    useEffect(() => {
        if (data.endDate) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (new Date(data.endDate) < today) {
                setErrorDate("A data do sorteio não pode ser no passado.");
            } else {
                setErrorDate("");
            }
        }
    }, [data.endDate]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSucess("");

        if (!data.name || !data.description || !data.quantityNumbers || !data.ticketPrice || !data.endDate || !data.image) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (errorDate) {
            return;
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("startDate", new Date().toISOString());
            formData.append("endDate", new Date(data.endDate).toISOString());
            formData.append("quantityNumbers", data.quantityNumbers);
            formData.append("ticketPrice", data.ticketPrice);
            if (user?.user.id) {
                formData.append("userId", user?.user.id);
            }
            if (data.image) {
                formData.append("image", data.image);
            }

            const response = await axios.post(`${BaseURL}raffle/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });

            console.log(response)

            if (response && response.status === 200) {
                setSucess("Rifa criada com sucesso!");
            }

            setSucess("Rifa criada com sucesso")
        } catch (error) {
            console.error("Erro ao criar a rifa:", error);
            setError("Houve um erro ao criar a rifa. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    console.log(data)


    return (
        <div className="flex flex-col w-full pt-[60px] lg:pt-[16px] pb-6 lg:pb-0">
            <div className="flex flex-col justify-between relative">
                <div className="flex w-full pl-8 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Criar Rifa</h1>
                </div>
                <div className="flex lg:flex-row flex-col w-full">
                    <div className="lg:w-[800px] w-full">
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="raffleName">Nome da Rifa</Label>
                                    <Input
                                        id="raffleName"
                                        placeholder="Ex: Kit Churrasco Premiado"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descrição</Label>
                                    <TiptapEditor
                                        onChange={(value) => setData({ ...data, description: value })}
                                        disabled={loading}
                                        placeholder="Descreva os detalhes da sua rifa..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="numberCount">Quantidade de Números</Label>
                                        <Input
                                            id="numberCount"
                                            type="number"
                                            placeholder="Ex: 100"
                                            value={data.quantityNumbers}
                                            onChange={(e) => setData({ ...data, quantityNumbers: e.target.value })}
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="price">Preço por Número</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="Ex: 10.00"
                                            value={data.ticketPrice}
                                            onChange={(e) => setData({ ...data, ticketPrice: e.target.value })}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between w-full space-x-4">
                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="date">Data do Sorteio</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    disabled={loading}
                                                    variant="outline"
                                                    className={cn(
                                                        "flex w-full justify-start",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                                    <span>{date ? formatDate(date) : "Selecione a data"}</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    locale={ptBR}
                                                    selected={data.endDate || new Date()}
                                                    onSelect={(selectedDate) => {
                                                        if (selectedDate) {
                                                            setData({ ...data, endDate: selectedDate });
                                                            setDate(selectedDate);
                                                        }
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errorDate && (
                                            <div className="text-red-600 text-sm mt-2">
                                                {errorDate}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="image" className="cursor-pointer">Imagem da Rifa</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="cursor-pointer"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                {image && imagePreview && (
                                    <div className="mt-4 lg:ml-7 relative w-fit">
                                        <Image
                                            src={imagePreview}
                                            width={500}
                                            height={200}
                                            alt="Preview"
                                            className="lg:max-w-full w-80 h-auto rounded-lg shadow-md"
                                        />
                                        <div
                                            className="absolute top-1 -right-6 cursor-pointer"
                                            onClick={handleRemoveImage}
                                            aria-disabled={loading}
                                            style={{ pointerEvents: loading ? 'none' : 'auto' }}
                                        >
                                            <FaRegTrashAlt color="red" size={20} />
                                        </div>
                                    </div>
                                )}

                                <CardFooter>
                                    <Button type="submit" className={`w-full ${loading ? 'bg-gray-300 text-gray-600' : ""}`}>
                                        {loading ? 'Criando Rifa...' : "Criar Rifa"}
                                    </Button>
                                </CardFooter>
                            </form>
                            {sucess && (
                                <div className="mt-4 p-4 bg-green-100 items-center flex text-center justify-center text-green-700 rounded-md">
                                    {sucess}
                                </div>
                            )}
                            {error && (
                                <div className="mt-4 p-4 bg-red-100 items-center flex text-center justify-center text-red-700 rounded-md">
                                    {error}
                                </div>
                            )}
                        </CardContent>
                    </div>
                    <div className="px-4 lg:px-0">
                        <InfoSectionCreateRaffle />
                    </div>
                </div>
            </div>
        </div >
    );
}
