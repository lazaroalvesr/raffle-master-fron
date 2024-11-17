"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";

export default function FormularioCadastro() {
    const { register } = useAuth();

    const [name, setNome] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [telephone, setTelephone] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const router = useRouter();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
   
    const formatTelephone = (value: string) => {
        value = value.replace(/\D/g, '');
        value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        return value;
    };
    
    const handleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatTelephone(e.target.value);
        setTelephone(formattedValue);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await register({ name, email, telephone, password, surname });

            if (response.success) {
                setSuccessMessage("Conta criada com sucesso! Você pode fazer login agora.");
                setTimeout(() => {
                    router.push("/auth/login");
                }, 3000);
            } else {
                setError(response.message || "Failed to register");
            }

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An unexpected error occurred");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed m-auto w-full  flex bg-gradient-to-br h-full from-gray-100 to-gray-200 items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full flex">
                <div className="w-1/2 hidden md:block">
                    <Image
                        src="/img/pessoa-sorrindo.jpeg"
                        alt="Bilhetes de rifa coloridos"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">Crie sua conta</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={name}
                                disabled={loading}
                                onChange={(e) => setNome(e.target.value)}
                                className="mt-1 block w-full px-3 text-gray-800 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Seu nome"
                            />
                        </div>
                        <div>
                            <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                required
                                value={surname}
                                disabled={loading}
                                onChange={(e) => setSurname(e.target.value)}
                                className="mt-1 block w-full px-3 text-gray-800 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Seu sobrenome"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                disabled={loading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="seu@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>

                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    disabled={loading}
                                    className="mt-1 block w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-800"
                                >
                                    {showPassword ?
                                        <Image
                                            src={"/img/icons/eye-hide.png"}
                                            width={20}
                                            height={20}
                                            alt="eye hiden"
                                        /> : (
                                            <Image
                                                src={"/img/icons/eye-view.png"}
                                                width={20}
                                                height={20}
                                                alt="eye view"
                                            />
                                        )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Celular</label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                required
                                disabled={loading}
                                value={telephone}
                                maxLength={15}
                                onChange={handleTelephoneChange}
                                className="mt-1 block w-full px-3 py-2 text-gray-800 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="(11) 98765-4321"
                            />
                        </div>
                        {error && (
                            <div className="mb-4 text-red-600 text-sm">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="mb-4 text-green-600 text-sm">
                                {successMessage}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registrando...
                                </>
                            ) : (
                                'Criar Conta'
                            )}
                        </button>
                    </form>
                    <div className='w-full border-b mt-6'></div>
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Já tem uma conta?{" "}
                        <a href="login" className="font-medium text-blue-600 hover:underline">
                            Faça login
                        </a>
                    </p>
                    <p className="mt-4 text-center text-xs text-gray-500">
                        Ao se registrar, você concorda com nossos{" "}
                        <a href="#" className="underline hover:text-gray-700">
                            Termos de Serviço
                        </a>{" "}
                        e{" "}
                        <a href="#" className="underline hover:text-gray-700">
                            Política de Privacidade
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
