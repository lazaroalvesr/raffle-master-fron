'use client'

import { useState, useEffect } from "react"

import { RaffleUniqueEdit } from "@/lib/interface"

interface EditRaffleModalProps {
    open: boolean;
    raffleId: string | null;
    onOpenChange: (open: boolean) => void;
    onSubmit: (updatedData: RaffleUniqueEdit) => void;
    initialData: RaffleUniqueEdit | null;
}

export default function EditRaffleModal({ open, onOpenChange, onSubmit, initialData, raffleId }: EditRaffleModalProps) {
    const [raffleData, setRaffleData] = useState<RaffleUniqueEdit | null>(initialData);

    useEffect(() => {
        if (initialData) {
            setRaffleData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRaffleData((prevData) => {
            const newData = prevData ?? {
                id: '',
                name: '',
                description: '',
                endDate: '',
                ticketPrice: '',
                availableTickets: 0,
                onDelete: undefined, 
            };
    
            return { ...newData, [name]: value };
        });
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (raffleData && raffleId) {
            onSubmit({ ...raffleData, id: raffleId });
        }
    };

    if (!raffleData) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Editar Rifa</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome da Rifa</Label>
                        <Input
                            type="text"
                            name="name"
                            value={raffleData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={raffleData.description}
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="endDate">Data do Sorteio</Label>
                        <Input
                            id="endDate"
                            type="date"
                            value={raffleData.endDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantityNumbers">Quantidade de Números</Label>
                            <Input
                                id="quantityNumbers"
                                type="number"
                                min="1"
                                value={raffleData.availableTickets}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticketPrice">Valor do Número</Label>
                            <Input
                                id="ticketPrice"
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={raffleData.ticketPrice}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="submit">Salvar</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
