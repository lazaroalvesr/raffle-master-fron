import { Suspense } from 'react';
import { RaffleList } from './raffleList';
import Loading from '../util/loadingCard';

export default function Main() {
    return (
        <main className="max-w-7xl m-auto lg:px-12 md:px-8 pt-[90px] pb-[120px]">
            <h1 className="text-[32px] pl-4 lg:pl-4 text-[#111827] font-medium">
                Rifas em Destaque
            </h1>
            <Suspense fallback={<Loading />}>
                <RaffleList />
            </Suspense>
        </main>
    );
}