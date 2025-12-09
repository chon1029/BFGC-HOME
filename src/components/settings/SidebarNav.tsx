'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { User, Settings, Bell, Shield } from "lucide-react"

const sidebarNavItems = [
    {
        title: "프로필",
        href: "/settings/profile",
        icon: User,
    },
    {
        title: "계정",
        href: "/settings/account",
        icon: Settings,
    },
    {
        title: "알림",
        href: "/settings/notifications",
        icon: Bell,
    },
    {
        title: "보안",
        href: "/settings/security",
        icon: Shield,
    },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    // items prop removed as we use internal constant
}

export function SidebarNav({ className, ...props }: SidebarNavProps) {
    const pathname = usePathname()
    const items = sidebarNavItems

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname === item.href
                            ? "bg-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}
