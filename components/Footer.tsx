import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <section className="mt-12 border-t pt-4 pb-6">
      <footer className="text-sm text-muted-foreground flex justify-between items-center w-full">
        <div>© {year} Amir Aliu</div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/amiraliuks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Amir Aliu GitHub profile"
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

          <Link
            href="https://dc38338.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open DEFCON GROUP PRISHTINA 38338 website"
            className="defcon-glitch-link inline-flex items-center"
          >
            <span className="defcon-glitch" aria-hidden="true">
              <Image
                src="/DefconLogo.webp"
                alt="DEFCON GROUP PRISHTINA 38338 logo"
                width={20}
                height={20}
                className="defcon-glitch-base"
              />
            </span>
          </Link>
        </div>
      </footer>
    </section>
  );
}

