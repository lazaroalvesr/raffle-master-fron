import { Button } from "@/components/ui/button"
import { ButtonCardBuyProps } from "@/lib/interface"

export const ButtonCardBuyRaffle = ({ number, onClick, loading }: ButtonCardBuyProps) => {
    return (

        <Button variant="outline" disabled={loading} className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`} onClick={onClick}>
            {number}
        </Button>

    )
}