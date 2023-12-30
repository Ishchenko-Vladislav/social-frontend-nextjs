import { Search } from "@/components/layout/sidebar/search/Search";
import React from "react";

interface Props {}

const ExplorePage = (props: Props) => {
  return (
    <div className="p-4">
      <div>
        <Search />
      </div>
      <div>explore</div>
    </div>
  );
};

export default ExplorePage;
