import { OemOdmClient } from "@/components/pages/oemodm-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OEM & ODM Custom Ceramics | ADA Ceramics",
  description: "Professional custom OEM & ODM service for ceramic tableware. Custom logo, design & packaging. Wholesale manufacturer from China.",
}

export default function OemOdmPage() {
  return <OemOdmClient />
}
