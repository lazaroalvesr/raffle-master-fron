export const CardUniqueRaffleLoading = () => {
    return (
        <div className="animate-pulse lg:flex-row  flex-col md:flex-row pt-[70px] h-fit flex gap-8 md:gap-4">
            <div className="lg:w-[500px] pb-8 w-[360px]  flex h-fit flex-col items-center bg-gray-500 rounded-md">
                <div className="bg-gray-400 w-full h-28 rounded-t-md">
                    <div className="ml-7 mt-8 flex flex-col gap-2">
                        <div className="w-44 h-8 rounded-md bg-gray-500"></div>
                        <div className="w-60 h-4 rounded-md bg-gray-500"></div>
                    </div>
                </div>
                <div className="bg-gray-400 lg:w-[440px] w-72 rounded-md mt-4 h-44"></div>
                <div className="lg:w-[440px] w-full pl-9 mt-4 lg:pl-0 flex flex-col gap-4">
                    <div className="bg-gray-400 w-44 h-8 rounded-md"></div>
                    <div className="bg-gray-400 w-44 h-8 rounded-md"></div>
                    <div className="bg-gray-400 w-44 h-8 rounded-md"></div>
                </div>
            </div>
            <div className="flex flex-col gap-y-4">
                <div className="lg:w-[500px] w-[360px] md:w-[380px] pb-8 flex flex-col items-center bg-gray-500 rounded-md">
                    <div className="bg-gray-400 w-full h-20 rounded-t-md">
                        <div className="ml-7 mt-6 flex flex-col gap-2">
                            <div className="w-44 h-8 rounded-md bg-gray-500"></div>
                        </div>
                    </div>
                    <div className="lg:w-[440px] px-4 lg:px-0 mt-7 flex flex-col gap-4">
                        <div className="flex w-full gap-12 lg:gap-0 justify-between">
                            <div className="bg-gray-400 w-32 h-8 rounded-md"></div>
                            <div className="bg-gray-400 w-32 h-8 rounded-md"></div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="bg-gray-400 w-36 h-8 rounded-md"></div>
                            <div className="bg-gray-400 w-20 h-8 rounded-md"></div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="bg-gray-400 w-32 h-8 rounded-md"></div>
                            <div className="bg-gray-400 w-32 h-8 rounded-md"></div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-[500px] w-[360px] md:w-[380px]   flex flex-col items-center bg-gray-500 rounded-md">
                    <div className="bg-gray-400 w-full h-20 rounded-t-md">
                        <div className="ml-7 mt-6 flex flex-col gap-2">
                            <div className="w-44 h-8 rounded-md bg-gray-500"></div>
                        </div>
                    </div>
                    <div className="flex lg:w-[424px] pb-8 flex-col items-center mt-8">
                        <div className="lg:w-full w-80 h-4 rounded-md bg-gray-400"></div>
                        <div className="flex mt-4 gap-3 items-center">
                            <div className="bg-gray-400 w-9 h-9 rounded-md"></div>
                            <div className="bg-gray-400 lg:w-[330px] w-52 h-12 rounded-md"></div>
                            <div className="bg-gray-400 w-9 h-9 rounded-md"></div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-x-2 gap-y-4">
                            <div className="bg-gray-400 lg:w-[136px] w-24 h-12 rounded-md"></div>
                            <div className="bg-gray-400 lg:w-[136px] w-24 h-12 rounded-md"></div>
                            <div className="bg-gray-400 lg:w-[136px] w-24 h-12 rounded-md"></div>
                            <div className="bg-gray-400 lg:w-[136px] w-24 h-12 rounded-md"></div>
                            <div className="bg-gray-400 lg:w-[136px] w-24 h-12 rounded-md"></div>
                        </div>
                        <div className="mt-4">
                            <div className="bg-gray-400 lg:w-[420px] w-80 h-12 rounded-md"></div>
                        </div>
                        <div className="bg-gray-400 mt-8 w-full h-12 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}