import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import LoginFormContainer from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light-200 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/column" className="text-primary inline-block">
            <Image src="/images/healthy-app-logo.svg" alt="Healthy App Logo" width={120} height={40} priority />
          </Link>
          <p className="mt-2 text-dark-500">健康管理アプリ</p>
        </div>

        <Suspense fallback={<div className="p-8 text-center bg-white rounded-lg shadow-md">ログインフォームを読み込み中...</div>}>
          <LoginFormContainer />
        </Suspense>
      </div>
    </div>
  )
}
