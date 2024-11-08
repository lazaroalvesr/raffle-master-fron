"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/app/hooks/useAuth';
import { AxiosError } from 'axios';

export default function FormularioLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });

      if (response && response.success) {
        setSuccessMessage("Login realizado com sucesso! Bem-vindo de volta!");

      } else {
        setError('Login failed. Please check your credentials.');
      }

    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        // Check if the error is an AxiosError
        setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      } else {
        // Handle unexpected errors
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error during login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl items-center  h-[600px] overflow-hidden max-w-4xl w-full flex">
        <div className="w-1/2 hidden md:block">
          <Image
            src="/img/cara-sorrindo.jpg"
            width={400}
            height={400}
            alt="Bilhetes de rifa coloridos"
            className="w-full h-fit object-cover "
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Entrar na sua conta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-1 block w-full px-3 text-gray-800 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
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
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"                  placeholder="Digite sua senha"
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
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/auth/sendRecoverEmail" className="font-medium text-blue-600 hover:text-blue-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </form>
          <div className='w-full border-b mt-6'></div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a href="register" className="font-medium text-blue-600 hover:underline">
              Registre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

