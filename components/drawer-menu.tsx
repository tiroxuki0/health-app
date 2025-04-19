"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { X, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface DrawerMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const router = useRouter()

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleLogout = async () => {
    await logout()
    onClose()
    router.push("/login")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={menuRef}
        className="fixed right-0 top-0 h-full w-[280px] bg-[#777777] text-white transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="px-4 py-3 bg-[#414141]">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>
        )}

        <nav className="flex flex-col">
          <Link href="/my-record" className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors" onClick={onClose}>
            自分の記録
          </Link>
          <Link href="/weight-graph" className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors" onClick={onClose}>
            体重グラフ
          </Link>
          <Link href="/goals" className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors" onClick={onClose}>
            目標
          </Link>
          <Link href="/selected-course" className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors" onClick={onClose}>
            選択中のコース
          </Link>
          <Link href="/column" className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors" onClick={onClose}>
            コラム一覧
          </Link>
          <Link href="/settings" className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors" onClick={onClose}>
            設定
          </Link>

          {user && (
            <button onClick={handleLogout} className="py-5 px-4 border-b border-[#707070] hover:bg-[#414141] transition-colors text-left flex items-center gap-2">
              <LogOut size={20} />
            </button>
          )}
        </nav>
      </div>
    </div>
  )
}
