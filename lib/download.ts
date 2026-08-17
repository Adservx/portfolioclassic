import "server-only";

import { BOOK_DOWNLOAD_URL, THESIS_DOWNLOAD_URL } from "@/lib/site";
import { thesis } from "@/lib/book";

export async function getLiveDownloadUrl(itemId?: number): Promise<string | null> {
  if (itemId === thesis.id) return THESIS_DOWNLOAD_URL;
  return BOOK_DOWNLOAD_URL;
}
