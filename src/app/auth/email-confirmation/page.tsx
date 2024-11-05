import { CheckCircle } from "lucide-react";

export default function RaffleUnique() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    E-mail Confirmado!
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Seu endereço de e-mail foi verificado com sucesso.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        <p className="text-sm text-gray-700 mb-4">
                            Parabéns! Sua conta está agora totalmente ativada.
                        </p>
                        <p className="text-sm text-gray-700 mb-6">
                            Você já pode acessar todas as funcionalidades da nossa plataforma de rifas.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        <a href="/auth/login" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <p>Fazer Login</p>
                        </a>
                        <a href="/" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Ver Rifas Disponíveis
                        </a>
                    </div>

                    <div className="mt-6">
                        <p className="text-center text-xs text-gray-500">
                            Se você tiver alguma dúvida ou precisar de ajuda, não hesite em{' '}
                            <a href="/contato" className="text-indigo-600 hover:text-indigo-500">
                                entrar em contato
                            </a>{' '}
                            com nossa equipe de suporte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
