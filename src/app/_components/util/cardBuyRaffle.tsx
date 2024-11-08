import { useState } from "react";
import { BuyCardProps } from "@/lib/interface";
import { Ticket } from "lucide-react";
import Image from "next/image";
import { ButtonCardBuyRaffle } from "./buttonCardBuyRaffle";

export const CardBuyRaffle = ({
    title,
    quantityNumbers,
    handleSubmit,
    successMessage,
    errorMessage,
    loading,
}: BuyCardProps) => {
    const [count, setCount] = useState(1);

    const handleSetCount = (value: number) => {
        setCount(prevCount => Math.min(prevCount + value, quantityNumbers));
    };

    const handleDecrement = () => {
        if (count > 1) setCount(count - 1);
    };

    const handleBuyTicket = () => {
        if (count > 0 && count <= quantityNumbers) {
            handleSubmit(count);
        }
    };

    return (
        <div className="relative">
            <div className="border border-[#D9D9D9] md:w-[380px] mx-3 lg:mx-0 lg:w-[480px] rounded-md pb-8">
                <div className="border-b border-[#D9D9D9] bg-[#F6F5F5] text-center py-[12px] rounded-t-md">
                    <p className="text-gray-800 text-[24px] font-medium">{title}</p>
                </div>
                <div className="flex flex-col items-center pt-[20px]">
                    <span className="font-medium text-[20px] text-black text-center">
                        Participe sem estresse! O site faz a escolha dos números para você!
                    </span>
                    <div className="mt-[20px] border items-center flex border-black w-[330px] lg:w-[430px] h-[70px] rounded-[10px]">
                        <div className="flex items-center justify-center m-auto gap-4">
                            <button onClick={handleDecrement}>
                                <Image
                                    src="/img/icons/icon-decrement.png"
                                    width={47}
                                    height={47}
                                    alt="Decrement icon"
                                />
                            </button>
                            <div className="bg-[#111827] w-[190px] lg:w-[280px] h-[42px] flex items-center justify-center rounded-[10px] text-center text-[24px] text-white">
                                {count}
                            </div>
                            <Ticket className="w-8 h-8 mr-2 text-primary" />
                        </div>
                    </div>
                    <div className="pt-[20px] flex flex-wrap items-center m-auto justify-normal w-[330px] lg:w-[430px] gap-3 lg:gap-7">
                        <ButtonCardBuyRaffle number="+1" onClick={() => handleSetCount(1)} loading={loading} />
                        <ButtonCardBuyRaffle number="+5" onClick={() => handleSetCount(5)} loading={loading} />
                        <ButtonCardBuyRaffle number="+10" onClick={() => handleSetCount(10)} loading={loading} />
                        <ButtonCardBuyRaffle number="+15" onClick={() => handleSetCount(15)} loading={loading} />
                        <ButtonCardBuyRaffle number="+20" onClick={() => handleSetCount(20)} loading={loading} />

                    </div>
                    <button
                        onClick={handleBuyTicket}
                        disabled={loading}
                        className={`bg-[#111827] w-[330px] lg:w-[430px] h-[62px] rounded-[10px] mt-[20px] font-medium text-[25px] text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Comprando..." : "Pagar"}
                    </button>
                </div>
            </div>
            <div className="absolute lg:w-[440px] w-[300px] flex items-center justify-center m-auto left-10 lg:left-5 md:left-14 -bottom-4 md:-bottom-12 lg:-bottom-12">
                {successMessage && <div className="alert alert-success rounded-md w-full bg-emerald-400 text-center py-2 text-white">{successMessage}</div>}
                {errorMessage && <div className="alert alert-error w-full bg-red-500 rounded-md text-white text-center py-2">{errorMessage}</div>}
            </div>
        </div>
    );
};
