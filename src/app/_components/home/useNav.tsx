import { useAuth } from "@/app/hooks/useAuth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { LogOut, Settings, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function UserNav({ email, name }: UserNavProps) {
  const { logout } = useAuth()

  return (
    <DropdownMenu>
      <Dialog>
        <DialogContent>
          <DialogTitle>d</DialogTitle>
        </DialogContent>
      </Dialog>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative gap-2 focus:none w-full items-center  justify-between h-full rounded-lg">
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9 -scroll-ml-3 border">
              <AvatarImage src="/avatars/03.png" alt="@shadcn" />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col space-y-1 i">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </div>
          <div>
            <Image
              src="/img/icons/chevrons-down-up.svg"
              alt="w"
              width={20}
              height={20}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="center" forceMount>
        <DropdownMenuGroup>
          <Link href="/dashboard/minhaconta">
            <DropdownMenuItem className="cursor-pointer">
              <User />
              Minha conta
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            <Settings />
            Configurações
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