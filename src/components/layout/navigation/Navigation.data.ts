import { INavigationItem } from "./navigation-item/NavigationItem";
import { RiHome7Line, RiHome7Fill, RiNotification2Line, RiNotification2Fill } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { MdMail, MdOutlineMail } from "react-icons/md";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { FaUser, FaRegUser } from "react-icons/fa6";
import { BiSearch, BiSolidSearch } from "react-icons/bi";
import { RiSearch2Line, RiSearch2Fill } from "react-icons/ri";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";

export const navigation: INavigationItem[] = [
  {
    link: "/",
    title: "Home",
    FirstIcon: RiHome7Line,
    SecondIcon: RiHome7Fill,
  },
  {
    link: "/explore",
    title: "Explore",
    FirstIcon: RiSearch2Line,
    SecondIcon: RiSearch2Fill,
  },
  {
    link: "/notification",
    title: "Notification",
    FirstIcon: RiNotification2Line,
    SecondIcon: RiNotification2Fill,
  },
  {
    link: "/messages",
    title: "Messages",
    FirstIcon: MdOutlineMail,
    SecondIcon: MdMail,
  },
  {
    link: "/profile",
    title: "Profile",
    FirstIcon: FaRegUser,
    SecondIcon: FaUser,
  },
];
