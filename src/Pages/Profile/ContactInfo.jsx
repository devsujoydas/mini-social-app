import {
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
import { MdOutlineEmail, MdOutlineArrowOutward } from "react-icons/md";
import { TbWorldWww } from "react-icons/tb";
import { FaFacebook, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

const contacts = (userData) => [
  {
    id: "phone",
    label: "Phone Number",
    value: `+${userData?.phone}`,
    href: `tel:${userData?.phone}`,
    icon: <IoCallOutline />,
    bg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "email",
    label: "Email Address",
    value: userData?.email,
    href: `mailto:${userData?.email}`,
    icon: <MdOutlineEmail />,
    bg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "website",
    label: "Website",
    value: userData?.website,
    href: userData?.website,
    icon: <TbWorldWww />,
    bg: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: userData?.facebook,
    href: userData?.facebook,
    icon: <FaFacebook />,
    bg: "bg-blue-100 text-blue-600",
  },
  {
    id: "youtube",
    label: "YouTube",
    value: userData?.youtube,
    href: userData?.youtube,
    icon: <FaYoutube />,
    bg: "bg-red-100 text-red-600",
  },
  {
    id: "github",
    label: "GitHub",
    value: userData?.github,
    href: userData?.github,
    icon: <FaGithub />,
    bg: "bg-gray-100 text-gray-700",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: userData?.linkedin,
    href: userData?.linkedin,
    icon: <FaLinkedin />,
    bg: "bg-sky-100 text-sky-600",
  },
];

export default function ContactInfo({ userData }) {
  return (
    <div className="space-y-3 pb-8">
      <h1 className="font-semibold text-lg">Contact Information</h1>

      {contacts(userData).map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm  hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${item.bg}`}>{item.icon}</div>
            <div>
              <h1 className="font-medium">{item.label}</h1>
              <p className="text-sm text-zinc-500">{item.value}</p>
            </div>
          </div>
          <MdOutlineArrowOutward className="text-zinc-400" />
        </a>
      ))}
    </div>
  );
}
