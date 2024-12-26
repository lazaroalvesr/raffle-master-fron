import { useResponsiveItemsPerPageProps } from "@/lib/interface"
import { useEffect, useState } from "react"

export const useResponsiveItemsPerPage = ({ itemsTablet, itemsDefault }: useResponsiveItemsPerPageProps) => {
    const [itemsPerPage, setItemsPerPage] = useState(8)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(itemsDefault)
            } else if (window.innerWidth >= 768) {
                setItemsPerPage(itemsTablet)
            } else {
                setItemsPerPage(itemsDefault)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return itemsPerPage
}