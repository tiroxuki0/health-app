"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ReactElement } from "react"

// Define the User type
export interface User {
  id: number
  email: string
  name: string
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, callbackURL?: any) => Promise<boolean>
  logout: () => Promise<void>
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Create the AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if the user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to check authentication:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string, callbackURL?: any): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "ログインに失敗しました")
      }

      await setUser(data.user)

      setTimeout(() => {
        callbackURL()
      }, 500)
      return true // Return true to indicate success
    } catch (error) {
      setError((error as Error).message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setLoading(true)

    try {
      await fetch("/api/auth/logout", {
        method: "POST"
      })
      setUser(null)
    } catch (error) {
      console.error("Failed to logout:", error)
    } finally {
      setLoading(false)
    }
  }
  return React.createElement(AuthContext.Provider, { value: { user, loading, error, login, logout } }, children)
}

// Create a hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
