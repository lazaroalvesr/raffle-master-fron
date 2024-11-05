"use client";

import { DescriptionCardProps } from "@/lib/interface";
import { useState } from "react";

export const CardDescriptionRaffle = ({ title }: DescriptionCardProps) => {
    const [show, setShow] = useState(false);

    function toggle() {
        setShow(!show);
    }

    return (
        <div className="border border-[#D9D9D9] md:w-[380px] lg:w-[591px] mx-3 md:mx-0 lg:mx-0 rounded-md flex flex-col">
            <div className="border-b border-[#D9D9D9] bg-[#F6F5F5] text-center py-[12px] rounded-t-md">
                <p className="text-gray-800 text-[24px] font-medium ">{title}</p>
            </div>
            <div
                className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${show ? "max-h-[1000px]" : "max-h-[200px]"
                    } lg:max-h-full md:max-h-full`}
            >
                <div className="lg:text-[20px] px-4 lg:px-0 animeLeftMobile font-medium text-black lg:w-[551px] pt-[30px] lg:pt-[49px] mb-8 flex flex-col gap-4 justify-center m-auto">
                    <h2 className="lg:text-[20px] text-[22px]">
                        🍖 Pacote Churrasco Completo: O Sonho dos Amantes de Carne! 🍻
                    </h2>
                    <p>
                        Delicie-se com uma verdadeira iguaria culinária com nosso Pacote Churrasco Completo! Esta
                        oferta exclusiva inclui 7 suculentas peças de picanha 🥩, renomadas por seu sabor rico e
                        textura macia, perfeitamente grelhadas na brasa. Acompanhando essa refeição carnuda, estão
                        quatro chopes gelados 🍺, o complemento ideal para sua experiência de churrasco saborosa.
                    </p>
                    <p>
                        Seja para receber amigos 🤗 ou desfrutar de uma noite tranquila 🌙, este pacote garante um
                        banquete memorável que satisfará todos os seus desejos. Não perca a chance de elevar seu
                        churrasco—garanta seus ingressos agora! 🎟️🔥
                    </p>
                </div>
            </div>

            <button
                onClick={toggle}
                className="bg-[#F6F5F5] py-3 border-t md:hidden border-[#D9D9D9] font-medium text-gray-800 lg:hidden flex text-center items-center justify-center">
                {show ? "Mostrar menos" : "Mostrar mais"}
            </button>
        </div>
    );
};
