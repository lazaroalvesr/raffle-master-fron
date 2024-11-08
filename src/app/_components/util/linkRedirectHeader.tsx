import { usePathname } from "next/navigation"
import Link from "next/link"
import { NavLinkProps } from "@/lib/interface"


export function NavLinkHeader({ href, children }: NavLinkProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`text-gray-700 hover:bg-gray-100/80 transition duration-300 ease-in hover:text-[#50c878] px-3 py-2 rounded-md lg:text-[18px] text-lg font-medium ${pathname === href
                    ? 'bg-gray-100/80 text-[#50c878]'
                    : ''
                }`}
        >
            {children}
        </Link>
    )
}