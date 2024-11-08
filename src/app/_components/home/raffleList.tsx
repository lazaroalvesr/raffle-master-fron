import { BaseURL } from "@/app/api/api";
import { CardRaffle } from "../util/cardRaffle";

interface Rafl{
    id: string
    image: string
    name: string
}

async function getRaffles() {
    const res = await fetch(`${BaseURL}raffle/getAll`, {
        headers: { accept: 'application/json' },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function RaffleList() {
    const raffles = await getRaffles();

    return (
        <div className="md:ml-4 pt-[25px] flex flex-col md:flex-row lg:w-[1220px] lg:ml-3 flex-wrap md:w-[800px] lg:flex-row gap-[30px] m-auto items-center justify-center lg:justify-normal md:justify-normal">
            {raffles.map((item: Rafl) => (
                <CardRaffle
                    key={item.id}
                    href={`/rifa/${item.id}`}
                    src={item.image || "/img/default.jpg"}
                    text={item.name || "Sem título"}
                />
            ))}
        </div>
    );
}