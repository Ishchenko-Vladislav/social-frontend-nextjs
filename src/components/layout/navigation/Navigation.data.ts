import { INavigationItem } from "./navigation-item/NavigationItem";
import { RiHome7Line, RiHome7Fill, RiNotification2Line, RiNotification2Fill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { MdMail, MdOutlineMail } from "react-icons/md";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { FaUser, FaRegUser } from "react-icons/fa6";
import { BiSearch, BiSolidSearch } from "react-icons/bi";
import { RiSearch2Line, RiSearch2Fill } from "react-icons/ri";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

export const navigation: INavigationItem[] = [
  {
    link: "/",
    title: "Home",
    mobile: true,
    FirstIcon: RiHome7Line,
    SecondIcon: RiHome7Fill,
  },
  {
    link: "/explore",
    title: "Explore",
    mobile: true,
    FirstIcon: RiSearch2Line,
    SecondIcon: RiSearch2Fill,
  },
  {
    link: "/notification",
    title: "Notification",
    mobile: true,
    FirstIcon: RiNotification2Line,
    SecondIcon: RiNotification2Fill,
  },
  {
    link: "/messages",
    title: "Messages",
    mobile: true,
    FirstIcon: MdOutlineMail,
    SecondIcon: MdMail,
  },
  {
    link: "/profile",
    title: "Profile",
    mobile: false,
    FirstIcon: FaRegUser,
    SecondIcon: FaUser,
  },
  {
    link: "/bookmarks",
    title: "Bookmarks",
    mobile: false,
    FirstIcon: FaRegBookmark,
    SecondIcon: FaBookmark,
  },
];
