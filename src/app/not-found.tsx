import Link from 'next/link'
import { AlertTriangle, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Página não encontrada</h1>
        <p className="text-xl text-gray-600 mb-8">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
        <Button asChild className="bg-[#50c878] hover:bg-[#45b569] text-white">
          <Link href="/" className="inline-flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </div>
  )
}