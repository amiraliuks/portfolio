import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <section className="mt-12 border-t pb-6 pt-4">
      <footer className="flex w-full flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>{"\u00a9"} {year} Amir Aliu</div>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/amiraliuks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Amir Aliu GitHub profile"
            className="flex h-5 w-5 items-center justify-center"
          >
            <Image
              src="/brand/kosovo-flag.png"
              alt="Flag of Kosovo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain opacity-80 transition hover:opacity-100"
            />
          </Link>

          <Link
            href="https://dc38338.org/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open DEFCON GROUP PRISHTINA 38338 website"
            className="defcon-glitch-link flex h-5 w-5 items-center justify-center"
          >
            <span className="defcon-glitch" aria-hidden="true">
              <Image
                src="/brand/defcon-logo.webp"
                alt="DEFCON GROUP PRISHTINA 38338 logo"
                width={20}
                height={20}
                className="defcon-glitch-base h-5 w-5 object-contain"
              />
            </span>
          </Link>
        </div>
      </footer>
    </section>
  );
}
