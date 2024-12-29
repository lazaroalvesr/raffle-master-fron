export const MensagemAviso = ({ text }: { text: string }) => {
    return (
        <div className="bg-orange-500 w-full -bottom-14 rounded-md text-gray-50 text-center items-center justify-center flex text-1xl   h-12">
            {text}
        </div>
    )
}