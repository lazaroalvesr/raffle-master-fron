import { AuthProvider } from "../contexts/AuthContext";
import { ClientCookiesProvider } from "../contexts/ClientCookiesProvider";

export function Providers({ children }: React.PropsWithChildren) {
    return (
        <ClientCookiesProvider>
            <AuthProvider>{children}</AuthProvider>
        </ClientCookiesProvider>
    );
}
