export const CardRaffleLoading = () => {
    return (
        <div className="lg:w-[373px] h-[500px] w-[350px] animate-pulse border-2 border-[#D9D9D9] rounded-md">
            <div className="h-[266px] lg:w-full w-[350px] flex rounded-md border border-gray-50">
                <div className="bg-gray-500 w-full rounded-t-md"></div>
            </div>
            <div className="pt-[19px] flex flex-col items-center justify-center">
                <p className="bg-gray-500 w-80 h-12 rounded-md"></p>
                <div className="pt-[24px] flex gap-[19px]">
                    <div className="bg-gray-500 w-[92px] h-[53px] rounded-md"></div>
                    <div className="bg-gray-500 w-[92px] h-[53px]  rounded-md"></div>
                    <div className="bg-gray-500 w-[92px] h-[53px] rounded-md"></div>
                </div>
                <div className="bg-gray-500 text-white flex  items-center justify-center w-[312px] mt-[19px] rounded-md h-[41px]"></div>
            </div>
        </div>
    )
}