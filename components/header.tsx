import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconTailored,
  // IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
// import { Avatar } from '@radix-ui/react-avatar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Dashboard 

async function UserOrLogin() {
  const session = (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <IconTailored></IconTailored>
        </Link>
      )}
    </>
  )
}

async function Login() {
  const session = (await auth()) as Session
  return (
       <div className="flex items-center">
        {/* <IconSeparator className="size-6 text-muted-foreground/50" /> */}
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="secondary" asChild className="ml-2 font-bold">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
  )
}






export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex justify-right p-300">
          {/* <Avatar className = "p-100">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <Button variant='link' asChild className = "bg-green-600 text-white ">
          <Link href="/dashboard">Dashboard</Link>
          </Button>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <Login />
          </React.Suspense>
      </div>
    </header>
  )
}
