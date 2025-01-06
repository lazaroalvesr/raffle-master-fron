/* eslint-disable */

"use client"

import { useEffect, useState } from "react";
import { RaffleInfoPaymento, RaffleSelect } from "@/lib/interface";
import getRaffles from "@/app/hooks/getRaffle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getInfoPaymentRaffle from "@/app/hooks/getInfoPaymentRaffle";
import { TablePagamentosAdm } from "@/app/_components/util/tablePagamentosAdm";
import { Loading } from "@/app/_components/util/loading";

const PaymentsTable = () => {
    const [selectedRaffle, setSelectedRaffle] = useState<string>('');
    const [raffles, setRaffles] = useState<RaffleSelect[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [infoPaymentRaffle, setInfoPaymentRaffle] = useState<RaffleInfoPaymento[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getRaffles();
                setRaffles(data);
                if (data.length > 0) {
                    setSelectedRaffle(data[0].id);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setError("Failed to fetch raffles");
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchInfoPaymentRaffle() {
            if (!selectedRaffle) return;
            try {
                setLoading(true);
                const data = await getInfoPaymentRaffle({ selectedRaffle });
                setInfoPaymentRaffle(data);
            } catch (err) {
                setError("Failed to fetch payment info");
            } finally {
                setLoading(false);
            }
        }

        fetchInfoPaymentRaffle();
    }, [selectedRaffle]);

    return (
        <div className="flex flex-col w-full pt-[60px] lg:pt-[16px]">
            <div className="flex flex-col justify-between">
                <div className="flex w-full md:flex-row lg:flex-row pb-4 md:pb-0 lg:pb-0 flex-col justify-between pl-8 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200 lg:w-full">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight">Histórico de vendas</h1>
                    <div className="pr-6">
                        <Select onValueChange={setSelectedRaffle} value={selectedRaffle}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {raffles.map((raffle) => (
                                    <SelectItem key={raffle.id} value={raffle.id}>
                                        {raffle.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className="px-4 w-full">
                        <TablePagamentosAdm raffles={infoPaymentRaffle} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentsTable;
