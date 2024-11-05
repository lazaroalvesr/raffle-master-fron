import { AuthProvider } from "../contexts/AuthContext";
import { CLientCookiesProvider } from "../contexts/ClientCookiesProvider";

export function Providers({ children }: React.PropsWithChildren) {
    return (
        <CLientCookiesProvider>
            <AuthProvider>{children}</AuthProvider>
        </CLientCookiesProvider>
    );
}
