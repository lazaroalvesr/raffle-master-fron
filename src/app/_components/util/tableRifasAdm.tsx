/* eslint-disable */

"use client"

import { useState } from "react";
import { formatDate } from "@/lib/formatDate";
import { InfoRaffleProps, RaffleUniqueADM, RaffleUniqueEdit } from "@/lib/interface";
import { Info } from "lucide-react";
import InfoCardRaffle from "./infoCardRaffle";
import { FaRegTrashAlt } from "react-icons/fa";
import { SquarePen } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/app/hooks/formatCurrency ";
import { ptBR } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { IoMdClose } from "react-icons/io";
import TruncatedText from "./truncate";
import TiptapEditor from "../home/TiptapEditor";
import Image from "next/image";

export const TableRifasAdm = ({
    raffles,
    onDelete,
    onEdit,
}: {
    raffles: RaffleUniqueADM[];
    onDelete: (raffleId: string) => void;
    onEdit: (raffleId: string, updatedRaffle: RaffleUniqueEdit) => void;
}) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRaffle, setSelectedRaffle] = useState<InfoRaffleProps | null>(null);
    const [raffleEditData, setRaffleEditData] = useState<RaffleUniqueEdit | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    function toggle(raffles: any) {
        setSelectedRaffle(raffles);
        setShow(!show);
    }

    const close = () => {
        setShow(false);
        setSelectedRaffle(null);
    };

    const isRaffleActive = (endDate: string) => {
        const currentDate = new Date();
        return new Date(endDate) > currentDate;
    };

    const openEditModal = (raffle: RaffleUniqueADM) => {
        setRaffleEditData({
            ...raffle,
            image: null
        });
        setShowEdit(true);
        setImagePreview(null);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (raffleEditData) {
            onEdit(raffleEditData.id, raffleEditData);
            setShowEdit(false);
            setImagePreview(null);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            setRaffleEditData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    image: file
                };
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (raffleEditData) {
            const { name, value } = e.target;
            setRaffleEditData({
                ...raffleEditData,
                [name]: value,
            });
        }
    };

    const handleDescriptionChange = (value: string) => {
        if (raffleEditData) {
            setRaffleEditData({
                ...raffleEditData,
                description: value,
            });
        }
    };

    return (
        <div className="w-full overflow-y-auto custom-scrollbar lg:h-[580px]">
            <div className="rounded-xl w-full lg:mx-0 border bg-white shadow-sm">
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-50/40">
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500">Nome</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Números Disponíveis</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Quantidade de Números</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:hidden">Data do Sorteio</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Valor p/Número</th>
                                <th className="py-4 px-4 text-left text-sm font-medium text-gray-500 hidden lg:table-cell md:table-cell">Status</th>
                                <th className="py-4 px-4 text-center text-sm font-medium text-gray-500 lg:hidden table-cell md:table-cell">Informações</th>
                                <th className="py-4 px-4 text-center text-sm font-medium text-gray-500 ">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {raffles.map((rifa, index) => (
                                <tr key={index} className="border-b transition-colors hover:bg-gray-50/50">
                                    <td className="py-4 px-4">
                                        <div className="flex flex-col">
                                            <TruncatedText
                                                text={rifa.name}
                                                className="font-medium w-24 lg:w-fit text-gray-900"
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-sm font-medium text-emerald-700">
                                                {rifa.availableTickets} números
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell md:hidden">
                                        <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-sm font-medium text-emerald-700">
                                                {rifa.quantityNumbers} números
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell md:hidden">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {formatDate(rifa.endDate)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                        <span className="text-sm font-medium text-gray-900">
                                            {formatCurrency(Number(rifa.ticketPrice))}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 hidden lg:table-cell md:table-cell">
                                        <button
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${isRaffleActive(rifa.endDate)
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                        >
                                            {isRaffleActive(rifa.endDate) ? 'Ativa' : 'Inativa'}
                                        </button>
                                    </td>

                                    <td className="py-4 px-4 lg:hidden ">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => toggle(rifa)}
                                                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900">
                                                <Info className="h-5 w-5" />
                                                <span className="sr-only">Ver informações</span>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-center lg:pt-4 pt-6 gap-4 ">
                                        <button className="cursor-pointer" onClick={() => openEditModal(rifa)}>
                                            <SquarePen size={20} />
                                        </button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button>
                                                    <FaRegTrashAlt size={18} color="red" />
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tem certeza que deseja excluir esta rifa? Esta ação não pode ser desfeita.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onDelete(rifa.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white">
                                                        Sim, excluir rifa
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {show && selectedRaffle && (
                <div className="fixed px-4 z-50 lg:px-0 w-full left-0 top-0 m-auto h-screen flex items-center justify-center bg-gray-400/50">
                    <div className="animate-modalShow w-full">
                        <InfoCardRaffle
                            name={selectedRaffle.name}
                            availableTickets={selectedRaffle.availableTickets}
                            endDate={selectedRaffle.endDate}
                            ticketPrice={selectedRaffle.ticketPrice}
                            isRaffleActive={isRaffleActive}
                            close={close}
                            quantityNumbers={selectedRaffle.quantityNumbers}
                            onClick={selectedRaffle.onClick}
                        />
                    </div>
                </div>
            )}
            {showEdit &&
                (
                    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="relative">
                            <button onClick={() => setShowEdit(false)} className="absolute lg:-right-12 md:-right-12 md:top-[0.5px] md:rounded-l-none md:rounded-br-md right-3 z-20 items-center flex justify-center top-3 rounded-b-none lg:rounded-b-none lg:rounded-br-md rounded-md lg:rounded-l-none lg:top-0 lg:rounded-r-md w-12 h-12 lg:bg-white md:bg-white">
                                <IoMdClose size={30} />
                            </button>
                            <div className="bg-white rounded-tr-none rounded-l-lg rounded-br-lg lg:w-[640px]  relative">
                                <div className="p-6">
                                    <h1 className="mb-5 text-3xl font-bold tracking-tight">Editar Rifa</h1>
                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div className="flex w-full  justify-between gap-4">
                                            <div className="w-full">
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="quantityNumbers" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Quantidade de Números
                                                </label>
                                                <input
                                                    type="number"
                                                    id="quantityNumbers"
                                                    name="quantityNumbers"
                                                    onChange={handleChange}
                                                    min="1"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <TiptapEditor
                                                value={raffleEditData?.description || ''}
                                                onChange={handleDescriptionChange}
                                                placeholder="Descreva os detalhes da sua rifa..."
                                            />
                                        </div>

                                        <div className="space-y-2 flex gap-4 items-center">
                                            <div>
                                                <Label htmlFor="endDate">Data do Sorteio</Label>
                                                <div className="w-full">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                className="h-[40px] mt-2 w-44 justify-start"
                                                                variant="outline"
                                                            >
                                                                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                                                <span>
                                                                    {raffleEditData?.endDate
                                                                        ? formatDate(raffleEditData.endDate)
                                                                        : "Selecione a data"}
                                                                </span>
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                locale={ptBR}
                                                                selected={raffleEditData?.endDate || new Date()}
                                                                onSelect={(selectedDate) =>
                                                                    setRaffleEditData((prev) => {
                                                                        if (!prev) return prev;
                                                                        return {
                                                                            ...prev,
                                                                            endDate: selectedDate ?? prev.endDate,
                                                                            id: prev.id,
                                                                        };
                                                                    })
                                                                }
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>

                                            <div className="w-32">
                                                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Valor do Número
                                                </label>
                                                <input
                                                    type="number"
                                                    id="ticketPrice"
                                                    name="ticketPrice"
                                                    onChange={handleChange}
                                                    min="0"
                                                    step="0.01"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>

                                        </div>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div className="space-y-2">
                                                <div>
                                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                        Imagem da Rifa
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="image"
                                                        name="image"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                                    />
                                                </div>
                                            </div>
                                            {imagePreview && (
                                                <div className="lg:-mt-16 md:-mt-16 md:ml-12 lg:ml-12">
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        width={200}
                                                        height={200}
                                                        className="w-52 max-h-40 object-cover rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowEdit(false);
                                                    setImagePreview(null);
                                                }}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors w-[calc(50%-0.5rem)]"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors w-[calc(50%-0.5rem)]"
                                            >
                                                Salvar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </div >
    );
};

/*
 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md relative">
                    <div className="p-6">
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2 w-56">
                                            <Label htmlFor="endDate">Data do Sorteio</Label>
                                            <div className="w-full">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            className="w-full  justify-start"
                                                            variant="outline">
                                                            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                                                            <span>{raffleEditData.endDate ? formatDate(raffleEditData.endDate) : "Selecione a data"}</span>
                                                        </Button>

                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            locale={ptBR}
                                                            selected={raffleEditData.endDate || new Date()}
                                                            onSelect={(selectedDate) => {
                                                                if (selectedDate) {
                                                                    setRaffleEditData({ ...raffleEditData, endDate: selectedDate });
                                                                }
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                <div>
                                    <label htmlFor="quantityNumbers" className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantidade de Números
                                    </label>
                                    <input
                                        type="number"
                                        id="quantityNumbers"
                                        name="quantityNumbers"
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                        Valor do Número
                                    </label>
                                    <input
                                        type="number"
                                        id="ticketPrice"
                                        name="ticketPrice"
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                        Imagem da Rifa
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        onChange={handleChange}
                                        accept="image/*"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors w-[calc(50%-0.5rem)]">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors w-[calc(50%-0.5rem)]"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

*/


/*


            {raffleEditData && (
                <form onSubmit={handleEditSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={raffleEditData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={raffleEditData.description}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 resize-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="space-y-2 w-56">
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date of Raffle</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-start px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                                        <span>{raffleEditData.endDate ? formatDate(raffleEditData.endDate) : "Select Date"}</span>
                                    </button>

                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="quantityNumbers" className="block text-sm font-medium text-gray-700">Number of Tickets</label>
                                <input
                                    id="quantityNumbers"
                                    name="availableTickets"
                                    type="number"
                                    className="mt-1 block w-56 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    min="1"
                                    value={raffleEditData.availableTickets}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">Ticket Price</label>
                                <input
                                    id="ticketPrice"
                                    name="ticketPrice"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    value={raffleEditData.ticketPrice}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div className="space-y-2 w-full">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 cursor-pointer">Raffle Image</label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowEdit(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-40"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-40"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}*/