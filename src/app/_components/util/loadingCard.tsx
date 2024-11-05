import { CardRaffleLoading } from "./raffle-loading";

export default function Loading() {
    return (
        <div className="md:ml-4 pt-[25px] flex flex-col md:flex-row lg:w-[1220px] lg:ml-3 flex-wrap md:w-[800px] lg:flex-row gap-[30px] m-auto items-center justify-center lg:justify-normal md:justify-normal">
            {[1, 2, 3].map((index) => (
                <CardRaffleLoading key={index} />
            ))}
        </div>
    );
}