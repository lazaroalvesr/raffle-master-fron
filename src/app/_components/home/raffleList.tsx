"use client"

import { useEffect, useState } from "react";
import { CardRaffle } from "../util/cardRaffle";
import { Rafle } from "@/lib/interface";
import getRaffles from "../../hooks/getRaffle";
import Loading from "../util/loadingCard";

export function RaffleList() {
    const [raffles, setRaffles] = useState<Rafle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const data = await getRaffles();
                setRaffles(data);
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (error) return <div>{error}</div>;

    return (
        <div className="md:ml-4 pt-[25px] grid grid-cols-1 gap-y-8 lg:grid-cols-3 md:grid-cols-2 lg:ml-0 m-auto items-center justify-center lg:justify-normal md:justify-normal">
            {raffles.map((item: Rafle) => (
                <CardRaffle
                    key={item.id}
                    href={`/rifa/${item.id}`}
                    quantityNumbers={item.quantityNumbers}
                    src={item.image || "/img/default.jpg"}
                    text={item.name || "Sem título"}
                />
            ))}
        </div>
    );
}
