import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leadi sm:text-5xl">
            Welcome to <span className="text-rose-600">Image Uploader</span>
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            A simple, easy, and fast image uploader for users.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link href="/upload">
              <Button className="px-8 py-3 m-2 text-lg font-semibold">
                Upload image
              </Button>
            </Link>

            <Link href="/images">
              <Button className="px-8 py-3 m-2 text-lg font-semibold">
                View Images
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
