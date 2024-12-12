export const Loading = () => {
    return (
        <div className="flex justify-center w-full items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg">Carregando...</p>
        </div>
    )
}