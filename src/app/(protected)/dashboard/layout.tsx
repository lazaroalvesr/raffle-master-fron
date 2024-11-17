"use client";

import { useState } from "react";
import AppSidebar from "../../_components/home/sidebar";
import { ButtonOpenSidebar } from "@/app/_components/util/buttonOpenSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [ativo, setAtivo] = useState(false);

    const setAtivoToggle = () => {
        setAtivo(!ativo);
    };

    return (
        <div className="flex min-h-screen relative">
            <AppSidebar ativo={ativo} setAtivo={setAtivo} />
            <main className="flex-1 relative">
                <ButtonOpenSidebar setOpen={setAtivoToggle} />
                <div>{children}</div>
            </main>
        </div>
    );
};

export default DashboardLayout;
