import { useEffect } from "react";
import { useProfile } from "@/hooks/user/useProfile";
import { API_URL, AUTH_ROUTE, TOKENS_ENUM } from "@/utils/constants";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { SideMenu } from "@/components/layout/side-menu/SideMenu";
import { Home } from "@/components/pages/home/Home";

export default function HomePage() {
  return <Home />;
}
