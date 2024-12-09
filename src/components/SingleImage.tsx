import React from "react";

const SingleImage = ({ src }: { src: string }) => {
  return (
    <div className="relative flex justify-center items-center  fullWidth h-[300px] md:h-auto">
      <img
        src={src}
        alt="Single Displayed Image"
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  );
};

export default SingleImage;
