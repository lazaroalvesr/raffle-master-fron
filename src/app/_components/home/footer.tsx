import { Clover, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-background border-t">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center gap-2">
                        <Clover className="h-8 w-8 text-green-500" />

                        <Link href="/" className="text-2xl font-semibold hover:text-primary">
                            Rifa Flow
                        </Link>

                    </div>
                    <div>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/rifas" className="text-sm text-muted-foreground hover:text-primary">
                                        Rifas
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary">
                                        Como Funciona
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contato" className="text-sm text-muted-foreground hover:text-primary">
                                        Contato
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">Facebook</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">Instagram</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    © 2024 Rifa Flow. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    )
}