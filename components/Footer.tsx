import Link from 'next/link'
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <section className="mt-12 border-t pt-4 pb-6">
      <footer className="text-sm text-muted-foreground flex justify-between items-center w-full">
        <div>© {year} Amir Aliu</div>
        <Link
          href="https://github.com/AmirAliuA"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex items-center gap-1"
        >
          <Image
            src="/kosovo-flag.png"
            alt="Flag of Kosovo"
            width={20}
            height={20}
            className="opacity-80 hover:opacity-100 transition"
          />
        </Link>
      </footer>
    </section>
  );
}