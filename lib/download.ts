import "server-only";

import { BOOK_DOWNLOAD_URL } from "@/lib/site";

export async function getLiveDownloadUrl(): Promise<string | null> {
  return BOOK_DOWNLOAD_URL;
}