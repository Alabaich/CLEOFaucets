import Link from "next/link";

const LatestNews = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h3>Latest News</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="#" className="hover:no-underline">
          <div className="rounded-md overflow-hidden shadow-md group">
            <div
              className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: "url(/images/image1.png)" }}
            ></div>
            <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
              <p>
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
              <p>
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

        <Link href="#" className="hover:no-underline">
          <div className="rounded-md overflow-hidden shadow-md group">
            <div
              className="h-[250px] bg-cover bg-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: "url(/images/image1.png)" }}
            ></div>
            <div className="p-2 pt-6 text-left flex flex-col gap-2 text-white">
              <p>
                <span className="mr-2">Author Name</span>•
                <span className="ml-2">December 4, 2024</span>
              </p>
              <h3 className="text-lg font-semibold">Random News Title 8</h3>
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
    </div>
  );
};

export default LatestNews;
