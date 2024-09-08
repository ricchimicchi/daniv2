import { RiHomeLine } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { IoAnalytics } from "react-icons/io5";
import { FiUser } from "react-icons/fi";


export const footerLinks = [
  {
    id: 1,
    icon: <RiHomeLine size={26} />,
    href: "/",
  },
  {
    id: 2,
    icon: <RiSearch2Line size={26} />,
    href: "/mining",
  },
  {
    id: 3,
    icon: <IoAnalytics size={28} />,
    href: "/analytics",
  },
  {
    id: 4,
    icon: <FiUser size={26} />,
    href: "/profile",
  },
];
