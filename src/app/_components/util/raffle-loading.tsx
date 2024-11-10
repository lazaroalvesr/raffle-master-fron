export const CardRaffleLoading = () => {
    return (
        <div className="lg:w-[382px] h-[450px] w-[350px] relative animate-pulse border-2 border-[#D9D9D9] rounded-md">
            <div className="h-[215px] lg:w-full w-[350px] flex rounded-md border border-gray-50">
                <div className="bg-gray-500 w-full rounded-t-md"></div>
            </div>
            <div className="pt-[19px] lg:w-[334px] w-[300px]  m-auto gap-3 flex flex-col justify-center">
                <span className="bg-gray-50 absolute w-[150px] h-[30px] top-44 rounded-md"></span>
                <div className="flex justify-between w-full items-center">
                    <span className="bg-gray-500 w-[150px] h-[40px] rounded-full"></span>
                    <div className="flex gap-3">
                        <span className="bg-gray-500 w-[38px] h-[22px] rounded-md"></span>
                        <span className="bg-gray-500 w-[38px] h-[22px] rounded-md"></span>
                    </div>
                </div>
                <div className="mt-2 flex flex-col gap-4">
                    <span className="bg-gray-500 w-[150px] h-[30px] rounded-md"></span>
                    <span className="bg-gray-500 w-[150px] h-[30px] rounded-md"></span>
                </div>
                <span className="bg-gray-500 w-full mt-2 h-[40px] rounded-md"></span>
            </div>
        </div>
    )
}