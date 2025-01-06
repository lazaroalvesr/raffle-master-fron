"use client"

import React, { useState } from 'react'
import { Lock } from 'lucide-react'
import axios, { AxiosError } from 'axios'
import Link from 'next/link';

export default function ResetSenha() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            await axios.post('http://tecnewsbr.com.br/auth/send-recover-email', {
                email,
            })

            setSuccessMessage("Foi enviado um email com instruções para resetar sua senha!");
            setIsSubmitted(true)

        } catch (err: unknown) {
            if (err instanceof AxiosError && err.response) {
                setError(err.response.data?.message || 'Login failed. Please check your credentials.')
            } else {
                setError('An unexpected error occurred. Please try again later.')
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
                    {isSubmitted
                        ? 'Verifique seu e-mail para instruções'
                        : 'Insira seu e-mail para receber um link de reset de senha'}
                </p>
            </div>

            <div className="mt-8 sm:w-full mx-4 lg:w-[550px] md:mx-auto md:w-[600px]">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {!isSubmitted ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Endereço de e-mail
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
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
                                    disabled={loading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    {loading ? "Enviando Link...." : "Enviar link de reset"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-sm text-gray-700 mb-4">
                                Um e-mail com instruções para resetar sua senha foi enviado para {email}.
                            </p>
                            <p className="text-sm text-gray-700">
                                Se você não receber o e-mail em alguns minutos, verifique sua pasta de spam ou tente novamente.
                            </p>
                        </div>
                    )}

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Ou
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Voltar para o login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}