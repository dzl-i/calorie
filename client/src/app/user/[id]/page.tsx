import BarChart from "@/components/BarChart";
import Post from "@/components/Post";
import { get } from "@/utils/request";
import { PostType } from "@/utils/types";
import { profile } from "console";

export default async function UserPage({ params }: { params: { id: string } }) {
  const { profileInfo } = await get(`/profile/info?userId=${params.id}`);
  const { posts } = await get(`/profile/posts?userId=${params.id}`);

  console.log(params.id);
  console.log(profileInfo);
  console.log(posts);

  //   if (profileInfo === {}) return <Error message="User not found" />;

  return (
    <div className="text-black flex flex-col md:flex-row gap-8">
      <div className="flex-1 flex flex-col space-y-4 top-32 static md:max-h-[calc(100vh_-_13rem)] overflow-y-scroll no-scrollbar md:sticky">
        <div className="flex flex-col justify-center items-center gap-8">
          <img
            alt={`${profileInfo.name}'s Profile Picture`}
            src={profileInfo.profilePicture}
            width={128}
            height={128}
            className="w-48 h-48 object-cover rounded-full mx-auto"
          />
          <div className="text-center space-y-2">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{profileInfo.name}</h1>
              <p>@{profileInfo.username}</p>
              <p className="w-full">{profileInfo.description}</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold">Average</p>
              <p className="px-4 py-2 bg-white rounded-2xl text-lg w-fit mx-auto">
                3,000 steps a day
              </p>
            </div>
          </div>
        </div>
        <div className="text-center flex flex-col gap-4 flex-grow">
          <h2 className="text-xl font-bold">Recent steps</h2>
          <div className="flex-1">
            <BarChart
              labels={["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]}
              datasets={[
                {
                  label: "Number of steps",
                  data: [1000, 4000, 10000, 20000, 5000, 60000, 80000],
                  backgroundColor: "#ffffff",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-2">Recent archives</h2>
        <div className="masonry-layout">
          {posts && posts.length ? (
            <>
              {posts.map((post: PostType, index: number) => (
                <Post key={index} post={post} />
              ))}
            </>
          ) : (
            <p>No posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}