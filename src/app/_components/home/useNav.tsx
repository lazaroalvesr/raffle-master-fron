import ModalMinhaContaPage from "@/app/(protected)/dashboard/(user)/_minhaconta/page"
import { useAuth } from "@/app/hooks/useAuth"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/getInitials"
import { UserNavProps } from "@/lib/interface"
import { Crown, LogOut, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { createPortal } from "react-dom"

export function UserNav({ email, name, isAdm }: UserNavProps) {
  const { logout } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const Modal = () => {
    return createPortal(
      <div className="fixed inset-0 flex px-4 lg:px-0 items-center justify-center bg-black bg-opacity-50 z-50">
        <ModalMinhaContaPage setIsModalOpen={setIsModalOpen} />
      </div>,
      document.body
    );
  };


  return (
    <DropdownMenu>
      {isModalOpen && <Modal />}

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative hover:bg-gray-50 gap-2 w-full items-center justify-between h-full rounded-lg">
          <div className="flex items-center gap-2">
            {isAdm && (
              <div className="absolute -top-1 left-[35px] -translate-x-1/2 transform">
                <Crown className="h-8 w-8 text-yellow-400" />
              </div>
            )}
            <Avatar className="h-9 w-9 -scroll-ml-3 border">
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs w-32 overflow-hidden text-left leading-none whitespace-nowrap text-ellipsis text-muted-foreground">{email}</p>
            </div>
          </div>
          <div className="min-w-[20px]">
            <Image
              className="flex-shrink-1"
              src="/img/icons/chevrons-down-up.svg"
              alt="w"
              width={20}
              height={20}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setIsModalOpen(true)} className="cursor-pointer">
            <User />
            Minha conta
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
