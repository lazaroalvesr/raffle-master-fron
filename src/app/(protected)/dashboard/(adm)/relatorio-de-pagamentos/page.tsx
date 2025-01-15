/* eslint-disable */

"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { PaymentInfoAllProps } from "@/lib/interface";
import { Loading } from "@/app/_components/util/loading";
import getPaymentInfoAll from "@/app/hooks/getPaymentInfoAll";
import { TablePagamentosAll } from "@/app/_components/util/tablePagamentoAll";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const RelatorioDePagamentos = () => {
    const [error, setError] = useState<string | null>(null);
    const [infoPaymentRaffle, setInfoPaymentRaffle] = useState<PaymentInfoAllProps[][]>([]);
    const [loading, setLoading] = useState(true);
    const [searchUser, setSearchUser] = useState<string>('')

    useEffect(() => {
        async function fetchInfoPaymentRaffle() {
            try {
                setLoading(true);
                const data = await getPaymentInfoAll(searchUser);
                setInfoPaymentRaffle(data);
                console.log(data)
            } catch (err) {
                setError("Failed to fetch payment info");
            } finally {
                setLoading(false);
            }
        }

        fetchInfoPaymentRaffle();
    }, [searchUser]);

    const handleSearchUser = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchUser(event.target.value)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col justify-between">
                <div className="flex w-full md:flex-row  pt-[60px] lg:pt-[16px] lg:flex-row pb-4 md:pb-0 lg:pb-2 flex-col justify-between pl-8 lg:pl-6 border-b md:pl-8 mb-6 border-gray-200 lg:w-full">
                    <h1 className="text-3xl font-bold tracking-tight">Relatório de Pagamentos</h1>
                    <div className="flex space-x-2 items-center py-2 lg:py-0 md:py-0 justify-center mr-5">
                        <Input
                            type="text"
                            placeholder="ex: jonDoe@gmail.com"
                            className="flex-grow"
                            value={searchUser}
                            onChange={handleSearchUser}
                        />
                        <Button className="w-4 h-8">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className="px-4 w-full">
                        <TablePagamentosAll raffles={infoPaymentRaffle[0]} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatorioDePagamentos;
