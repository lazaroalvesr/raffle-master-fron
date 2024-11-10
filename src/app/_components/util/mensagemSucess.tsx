export const MensagemSucess = ({ text }: { text: string }) => {
    return (
        <div className="bg-emerald-400 w-96 -bottom-14 rounded-md text-gray-50 text-center items-center justify-center flex text-1xl   h-12">
            {text}
        </div>
    )
}