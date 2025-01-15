import { useState, useRef } from "react";
import { Ticket } from "lucide-react";

interface NumberPopoverProps {
    numbers: number[]
}

export function NumbersPopover({ numbers }: NumberPopoverProps) {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    const togglePopover = () => setIsOpen(!isOpen)

    return (
        <div className="relative">
            <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">
                    {numbers.slice(0, 4).join(", ")}
                </span>
                {numbers.length > 5 && (
                    <button
                        onClick={togglePopover}
                        className="text-blue-600 font-normal hover:underline">
                        ... +{numbers.length - 4} mais
                    </button>
                )}
            </div>

            {isOpen && numbers.length > 1 && (
                <div
                    ref={popoverRef}
                    className="absolute z-10 -top-20 left-48 p-4  bg-gray-50 rounded-md shadow-lg border border-gray-200">
                    <h3 className="font-semibold mb-2">Todos os números</h3>
                    <div className="grid grid-cols-6 gap-3 w-40 h-fit">
                        {numbers.map((num) => (
                            <span key={num} className="text-sm">{num}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}