"use client"

import type React from "react"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth"

export function LoginForm() {
  const [email, setEmail] = useState("user@example.com") // Pre-filled for testing
  const [password, setPassword] = useState("password123") // Pre-filled for testing
  const [errorMessage, setErrorMessage] = useState("")

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const { login, loading: isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      const success = await login(email, password)

      if (success) {
        console.log("Login successful, redirecting to:", callbackUrl)
        setTimeout(() => {
          router.push(callbackUrl)
          router.refresh()
        }, 1000)
      } else {
        setErrorMessage("Login failed: No success response")
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrorMessage((error as Error).message || "ログインに失敗しました")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>

      {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-dark-500 mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-light-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-dark-500 mb-1">
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-light-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-70">
          {isLoading ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <div className="text-sm text-dark-500">
          <div className="break-all">テスト用アカウント:</div>
          <div className="break-all">
            メールアドレス: user@example.com <br />
          </div>
          <div className="break-all">パスワード: password123</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/column" className="text-primary hover:underline text-sm">
          公開ページに戻る
        </Link>
      </div>
    </div>
  )
}

export default function LoginFormContainer() {
  return (
    <>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </>
  )
}
