import { RaffleList } from './raffleList';

export default function RaffleAll() {
    return (
        <main className="max-w-7xl m-auto lg:px-12 md:px-8 pt-[90px] flex flex-col md:h-screen lg:h-full ">
            <h1 className="text-[32px] pl-4 lg:pl-4 text-[#111827] font-medium">
                Rifas em Destaque
            </h1>
            <div className=' h-full mb-12'>
                <RaffleList />
            </div>
        </main>
    );
}