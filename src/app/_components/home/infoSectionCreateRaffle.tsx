export const InfoSectionCreateRaffle = () => {
    return (
        <div className="bg-gray-100 p-4 lg:w-[440px] w-full h-fit rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
                Instruções para Criar sua Rifa
            </h2>
            <div className="space-y-4">
                <div>
                    <h3 className="font-medium">Nome da Rifa:</h3>
                    <p className="text-sm text-gray-600">
                        Insira um nome claro e descritivo que os participantes reconhecerão facilmente.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">Descrição:</h3>
                    <p className="text-sm text-gray-600">
                        Adicione uma descrição detalhada, incluindo prêmios, regras e informações relevantes para atrair mais participantes.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">Imagem:</h3>
                    <p className="text-sm text-gray-600">
                        Faça o upload de uma imagem em posição horizontal e de alta qualidade. Isso ajuda na visualização e atração de participantes.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">Data de Encerramento:</h3>
                    <p className="text-sm text-gray-600">
                        Selecione uma data limite para a venda dos bilhetes. Lembre-se de escolher uma data que permita ampla divulgação.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">Preço por Bilhete:</h3>
                    <p className="text-sm text-gray-600">
                        Defina o valor de cada bilhete para equilibrar entre acessibilidade e o valor dos prêmios oferecidos.
                    </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                    <p className="text-sm text-blue-700">
                        <strong>Dica:</strong> Uma imagem bem enquadrada e em posição horizontal garante uma aparência mais profissional na página da rifa!
                    </p>
                </div>
            </div>
        </div>
    )
}