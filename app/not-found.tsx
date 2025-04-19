import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/container"

export default function NotFoundContent() {
  return (
    <Container>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-[#FF963C]">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">ページが見つかりません</h2>
          <p className="text-lg mb-8 max-w-md mx-auto text-gray-600 dark:text-gray-400">アクセスしようとしたページは移動されたか、削除されたか、一時的に利用できない可能性があります。</p>
          <div className="mb-12">
            <Link href="/" className="bg-[#FF963C] hover:bg-[#FF7A00] text-white font-bold py-2 px-6 rounded-md transition-colors">
              ホームに戻る
            </Link>
          </div>

          <div className="mt-8">
            <Image src="/images/healthy-app-logo.svg" alt="Healthy App Logo" width={120} height={45} className="mx-auto opacity-70" />
          </div>
        </div>
      </div>
    </Container>
  )
}
