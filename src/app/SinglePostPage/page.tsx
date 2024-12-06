import LatestNews from "@/components/LatestNews";
import SinglePost from "@/components/singlepost";

export default function SinglePostPage() {
  return (
    <div className="fullWidth flex flex-col gap-12">
      <SinglePost />
      <LatestNews />
    </div>
  );
}
