import { usePathname } from "next/navigation"
import Link from "next/link"
import { NavLinkProps } from "@/lib/interface"

export function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={`flex items-center gap-2 p-2 text-sm transition-colors ${pathname === href
                    ? 'rounded-l-md w-[239px] border-r-white border-y border-l border-gray-400 bg-white text-blue-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}>
            {children}
        </Link>
    )
}