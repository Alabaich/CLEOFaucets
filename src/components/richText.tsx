import Link from "next/link";

interface RichTextProps {
  title: string;
  text: string;
  buttonText?: string;
  buttonLink?: string;
}

const RichText: React.FC<RichTextProps> = ({ title, text, buttonText, buttonLink }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-12 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 max-w-[800px]">
        {title}
      </h2>

      {/* Text Content */}
      <p
        className="text-white mb-6 max-w-[800px]"
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>

      {/* Button */}
      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          className="px-4 py-2 text-white font-bold bg-transparent rounded hover:bg-grey-600 hover:text-white transition-colors duration-300"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
};

export default RichText;
