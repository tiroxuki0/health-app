"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, LogOut } from "lucide-react"
import DrawerMenu from "./drawer-menu"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Container } from "./container"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <header className="header sticky top-0 z-50 bg-[#414141] shadow-md">
      <Container>
        <div className="py-3 flex justify-between items-center">
          <Link href="/" className="text-primary text-2xl font-bold">
            <div className="flex items-center">
              <Image src="/images/healthy-app-logo.svg" alt="Healthy App" width={109} height={40} priority />
            </div>
          </Link>

          <button className="md:hidden text-[#FF963C]" onClick={toggleDrawer}>
            <Menu size={24} />
          </button>

          <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:static top-16 left-0 right-0 bg-[#414141] md:bg-transparent flex-col md:flex-row gap-4 p-4 md:p-0`}>
            <Link href="/my-record" className="text-white hover:text-[#FF963C] flex items-center gap-2">
              <Image src="/images/icons/ic-check-list.svg" alt="My Record" width={24} height={24} />
              自分の記録
            </Link>
            <Link href="/challenge" className="text-white hover:text-[#FF963C] flex items-center gap-2">
              <Image src="/images/icons/ic-reward.svg" alt="Challenge" width={24} height={24} />
              チャレンジ
            </Link>
            <Link href="/notification" className="text-white hover:text-[#FF963C] flex items-center gap-2 relative">
              <div className="relative">
                <Image src="/images/icons/ic-info.svg" alt="Notification" width={24} height={24} />
                <span className="absolute -top-1 -right-1 bg-[#FF963C] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
              </div>
              お知らせ
            </Link>

            {user && (
              <button onClick={handleLogout} className="text-white hover:text-[#FF963C] flex items-center gap-2">
                <LogOut size={24} />
              </button>
            )}

            {!user && (
              <Link href="/login" className="text-white hover:text-[#FF963C] flex items-center gap-2">
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </Container>

      {/* Drawer Menu */}
      <DrawerMenu isOpen={isDrawerOpen} onClose={closeDrawer} />
    </header>
  )
}
