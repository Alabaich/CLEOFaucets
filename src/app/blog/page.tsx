import Link from "next/link";

export default function Blog() {
  return (
    <div className="text-center my-10 md:my-10 w-full mx-auto fullWidth">
      <p className="text-sm font-bold uppercase text-gray-500">
        upperTitleupperTitle
      </p>
      <h1 className="text-3xl font-semibold text-gray-800 mt-2">titletitle</h1>
      <p className="text-lg text-gray-600 mt-1">
        subtitlesubtitlesubtitlesubtitlesubtitlesubtitle
      </p>

      {/* First large news container */}
      <Link href="#" className="hover:no-underline">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="col-span-full relative h-[400px] overflow-hidden group">
            <div
              className="h-full bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{
                backgroundImage: "url(/images/image1.png)",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="h-full md:h-3/6 absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/90 text-white p-4 flex justify-end align-end flex-col text-left gap-2">
              <p className="text-sm font-light">
                <span className="mr-2">Author Name</span>•
                <span className="ml-2">December 4, 2024</span>
              </p>
              <h4 className="font-semibold">Random News Title 1</h4>
              <p className="mb-2">
                This is some random text to fill in the content. Lorem ipsum
                dolor sit amet
              </p>
              <div className="flex gap-2">
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
        </div>
      </Link>

      {/* Small news blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link href="#" className="hover:no-underline">
          <div className="rounded-md overflow-hidden shadow-md group">
            <div
              className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: "url(/images/image1.png)" }}
            ></div>
            <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
              <p className="">
                <span className="mr-2">Author Name</span>•
                <span className="ml-2">December 4, 2024</span>
              </p>
              <h3 className="text-lg font-semibold">Random News Title 5</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur malesuada ante eu magna dapibus, at laoreet metus
                elementum.
              </p>
              <div className="mt-2">
                <Link
                  href="#"
                  className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
                >
                  Category
                </Link>
              </div>
            </div>
          </div>
        </Link>

        {/* Repeat the small news blocks (just as in your original code) */}
        <Link href="#" className="hover:no-underline">
          <div className="rounded-md overflow-hidden shadow-md group">
            <div
              className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: "url(/images/image1.png)" }}
            ></div>
            <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
              <p className="">
                <span className="mr-2">Author Name</span>•
                <span className="ml-2">December 4, 2024</span>
              </p>
              <h3 className="text-lg font-semibold">Random News Title 6</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur malesuada ante eu magna dapibus, at laoreet metus
                elementum.
              </p>
              <div className="mt-2">
                <Link
                  href="#"
                  className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
                >
                  Category
                </Link>
              </div>
            </div>
          </div>
        </Link>

        <Link href="#" className="hover:no-underline">
          <div className="rounded-md overflow-hidden shadow-md group">
            <div
              className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: "url(/images/image1.png)" }}
            ></div>
            <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
              <p className="">
                <span className="mr-2">Author Name</span>•
                <span className="ml-2">December 4, 2024</span>
              </p>
              <h3 className="text-lg font-semibold">Random News Title 7</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur malesuada ante eu magna dapibus, at laoreet metus
                elementum.
              </p>
              <div className="mt-2">
                <Link
                  href="#"
                  className="text-white border border-white py-2 px-2 rounded transition-all duration-300 hover:bg-white hover:text-black hover:no-underline hover:border-transparent"
                >
                  Category
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Pagination */}
      <div className="mt-12 w-full mx-auto flex justify-between items-center">
        <Link
          href="#"
          className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
        >
          {"<"}
        </Link>

        <div className="flex gap-4">
          <Link
            href="#"
            className="active text-sm text-black bg-white px-4 py-2 border border-white border-[1px] rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            1
          </Link>

          <Link
            href="#"
            className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            2
          </Link>

          <span className="flex items-end text-sm text-white">...</span>

          <Link
            href="#"
            className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            9
          </Link>

          <Link
            href="#"
            className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
          >
            10
          </Link>
        </div>

        <Link
          href="#"
          className="text-sm text-white hover:text-black hover:bg-white transition-colors duration-300 px-4 py-2 border border-white border-[1px] bg-transparent rounded-md hover:no-underline transform transition-transform duration-300 hover:scale-105"
        >
          {">"}
        </Link>
      </div>
    </div>
  );
}
