"use client"

import { AppProgressBar } from "next-nprogress-bar"

export default function ProcessBar() {
  return <AppProgressBar height="4px" color="#FFCC21" options={{ showSpinner: false }} shallowRouting />
}
