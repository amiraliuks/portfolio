import React from 'react';
import Link from 'next/link'
import Image from 'next/image';

export default function Footer() {
  return (
    <section className="mt-12 border-t pt-4 pb-6">
      <footer className="text-sm text-muted-foreground flex justify-between items-center w-full">
        <div>© 2025 Amir Aliu</div>
        <Link
          href="https://github.com/AmirAliuA"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex items-center gap-1"
        >
          <Image
            src="/goddess-of-the-throne.png"
            alt="Hyjnesha në Fron"
            width={60}
            height={60}
            className="opacity-80 hover:opacity-100 transition"
          />
        </Link>
      </footer>
    </section>
  );
}
