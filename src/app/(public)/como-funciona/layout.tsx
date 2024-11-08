import Footer from "@/app/_components/home/footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {children}
            <Footer/>
        </section>
    )
}