export default function MinhaConta() {
    return (
        <div className="bg-white w-[592px] shadow-md relative">
            <div className="p-4">
                <div className="pb-4">
                    <h1 className="text-xl font-bold">Minha Conta</h1>
                </div>
                <button
                    className="absolute lg:top-0  right-0 -top-12 md:-top-12 md:right-0 text-4xl text-black bg-white lg:rounded-r-md lg:rounded-tl-none rounded-b-none rounded-md w-12 h-12"

                >
                    &times;
                </button>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="text"
                            required
                            value={""}
                            className="mt-1 block w-full px-3 text-gray-800 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="dsdsdsd"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-3 text-gray-800 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="seu@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input
                            type="tel"
                            id="telephone"
                            name="telephone"
                            required
                            value={""}
                            className="mt-1 block w-full px-3 text-gray-800 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="dsdsdsd"
                        />
                    </div>
                    <div className="flex w-full justify-between pt-4">
                        <button className="bg-[#F48824] hover:bg-orange-500 text-white px-4 py-3 rounded-md">Editar Informações</button>
                        <button className="bg-[#FF0000] hover:bg-red-600 text-white px-4 py-3 rounded-md">Deletar Conta</button>
                    </div>
                </form>
            </div>
        </div>
    )
}