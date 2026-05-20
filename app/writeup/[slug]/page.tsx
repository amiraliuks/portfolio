import { redirect } from "next/navigation";

import type { BlogPageProps } from "@/types/types";

export default async function WriteupSlugRedirect({ params }: BlogPageProps) {
  const { slug } = await params;
  redirect(`/writeups/${slug}`);
}