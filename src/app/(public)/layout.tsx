import Header from "../_components/home/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <Header/>
            {children}
        </section>
    )
}