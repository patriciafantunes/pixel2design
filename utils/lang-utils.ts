import { i18n } from "@/i18n-config";
import { headers } from "next/headers";

export function getLangFromPathname(): string | null {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  // Extract the first part of the pathname
  const langSegment = pathname.split("/")[1];

  // Check if it's a valid language
  return i18n.locales.includes(langSegment) ? langSegment : null;
}
