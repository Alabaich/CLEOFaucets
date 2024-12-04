import Link from "next/link";

export default function SinglePost() {
  return (
    <div className=" p-4 fullWidth flex flex-col gap-8">
      <div className="text-center flex justify-center flex-col gap-6 mt-4">
        <p className="text-sm font-bold uppercase text-white-500">
          Upper Title
        </p>

        <h1 className="">The Main Title of the Post</h1>
        <span className="">Author: John Doe</span>
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500 mr-4">
            <span className="">December 4, 2024</span>
          </p>
          <span>|</span>
          <p className="text-sm text-gray-500 ml-4">
            <span>5 min read</span>
          </p>
        </div>
      </div>

      <div className="mt-8 relative w-full h-[500px] overflow-hidden">
        <img
          src="/images/image1.png"
          alt="Full Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <div className="flex gap-4 w-full justify-center flex-wrap w-full md:w-[1100px]">
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
        </div>

        <div className="text-left max-w-[1100px]">
            <h1 className="text-lg font-bold mb-4">Title</h1>
          <p className="text-lg">
            This is the full article content. It can include text, media, and
            other elements that make up the body of the post. You can add more
            paragraphs, images, links, and other media as needed.
          </p>

          <p className="text-lg mt-4">
            Continue writing the content here. You can structure the post into
            several sections with headers and subheaders, making it more
            readable and engaging for your audience.
          </p>
          <p className="text-lg mt-4">
            Continue writing the content here. You can structure the post into
            several sections with headers and subheaders, making it more
            readable and engaging for your audience.
          </p>
          <p className="text-lg mt-4">
            Continue writing the content here. You can structure the post into
            several sections with headers and subheaders, making it more
            readable and engaging for your audience.
          </p>
          <p className="text-lg mt-4">
            Continue writing the content here. You can structure the post into
            several sections with headers and subheaders, making it more
            readable and engaging for your audience.
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center flex-wrap w-full md:w-[1100px]">
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
          <Link
            href="#"
            className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
          >
            Category
          </Link>
        </div>
      </div>
    </div>
  );
}
