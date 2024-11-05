import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../../_components/home/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen">
                <AppSidebar />

                <main className="flex-1">
                    <div className="md:hidden">
                        <SidebarTrigger />
                    </div>
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;