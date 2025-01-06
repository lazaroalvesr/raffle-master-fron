"use client"

import { use, useState } from 'react'
import { Lock } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function EditPost({ params }: { params: Promise<{ recoverToken: string }> }) {
    const { recoverToken } = use(params);
    const router = useRouter()

    const [password, setPassword] = useState(String)
    const [passwordConfirmation, setPasswordConfirmation] = useState(String)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmationPassword, setShowConfirmationPassword] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.patch(`http://tecnewsbr.com.br/auth/reset-password/${recoverToken}`, {
                password,
                passwordConfirmation
            })

            setSuccessMessage("Senha alterada com sucesso!")
            setTimeout(() => {
                router.push("/auth/login")
            }, 200)

        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || 'Falha no envio. Verifique suas credenciais.')
            } else {
                setError('Um erro inesperado ocorreu. Tente novamente mais tarde.')
            }
            console.error('Error during login:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Lock className="h-12 w-12 text-indigo-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Resetar sua senha
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Digite sua nova senha abaixo
                </p>
            </div>

            <div className="mt-8 sm:w-full mx-4 lg:w-[550px] md:mx-auto md:w-[600px]">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="mt-1 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nova Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="appearance-none block w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-sm leading-5 text-gray-800"
                            >
                                {showPassword ? (
                                    <Image
                                        src={"/img/icons/eye-hide.png"}
                                        width={20}
                                        height={20}
                                        alt="eye hiden"
                                    />
                                ) : (
                                    <Image
                                        src={"/img/icons/eye-view.png"}
                                        width={20}
                                        height={20}
                                        alt="eye view"
                                    />
                                )}
                            </button>
                        </div>

                        <div className="mt-1 relative">
                            <label htmlFor="confirmation-password" className="block text-sm font-medium text-gray-700">
                                Confirme sua Senha
                            </label>
                            <input
                                id="confirmation-password"
                                name="confirmation-password"
                                type={showConfirmationPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                disabled={loading}
                                className="appearance-none block w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Digite sua senha"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                                className="absolute inset-y-0 right-0 top-5 pr-3 flex items-center text-sm leading-5 text-gray-800"
                            >
                                {showConfirmationPassword ? (
                                    <Image
                                        src={"/img/icons/eye-hide.png"}
                                        width={20}
                                        height={20}
                                        alt="eye hiden"
                                    />
                                ) : (
                                    <Image
                                        src={"/img/icons/eye-view.png"}
                                        width={20}
                                        height={20}
                                        alt="eye view"
                                    />
                                )}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {successMessage && (
                            <div className="mb-4 text-green-600 text-sm">
                                {successMessage}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                        ${loading ? 'bg-gray-400 ' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}                                >
                                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
