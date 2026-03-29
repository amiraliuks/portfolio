import { ReactNode } from "react";

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="blog-post-route relative left-1/2 w-[min(100vw-2rem,72rem)] -translate-x-1/2">
      {children}
    </div>
  );
}
