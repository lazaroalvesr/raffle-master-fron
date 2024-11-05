import { RaffleList } from "@/app/_components/home/raffleList";
import Loading from "@/app/_components/util/loadingCard";
import { Suspense } from "react";

export default function RafflePafe() {
    return (
        <section className="max-w-7xl m-auto lg:px-12 md:px-8 pt-[90px] pb-[120px]">
            <Suspense fallback={<Loading />}>
                <RaffleList />
            </Suspense>
        </section>
    )
}