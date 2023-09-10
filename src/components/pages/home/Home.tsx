import { FC } from "react";
import { Publish } from "./publish/Publish";
import { HomePosts } from "./home-posts/HomePosts";

interface Props {}

export const Home: FC<Props> = () => {
  return (
    <div>
      <div>
        <Publish />
      </div>
      <div>
        <HomePosts />
      </div>
    </div>
  );
};
