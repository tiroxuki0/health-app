import Link from "next/link"
import { Container } from "./container"

export default function Footer() {
  return (
    <footer className="footer py-[54px]">
      <Container>
        <div className="flex flex-wrap gap-8">
          <Link href="/terms" className="text-sm hover:underline">
            会員登録
          </Link>
          <Link href="/company" className="text-sm hover:underline">
            運営会社
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:underline">
            利用規約
          </Link>
          <Link href="/privacy" className="text-sm hover:underline">
            個人情報の取扱について
          </Link>
          <Link href="/commercial" className="text-sm hover:underline">
            特定商取引法に基づく表記
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            お問い合わせ
          </Link>
        </div>
      </Container>
    </footer>
  )
}
