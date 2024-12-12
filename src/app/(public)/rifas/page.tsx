import { RaffleList } from "@/app/_components/home/raffleList";
import Loading from "@/app/_components/util/loadingCard";
import { Suspense } from "react";

export default function RafflePafe() {
    return (
        <section className="max-w-7xl m-auto lg:px-12 md:px-8 pt-[90px] pb-[120px]">
            <h1 className="text-[32px] pl-4 lg:pl-4 text-[#111827] font-medium">
                Todas as rifas
            </h1>
            <Suspense fallback={<Loading />}>
                <RaffleList />
            </Suspense>
        </section>
    )
}