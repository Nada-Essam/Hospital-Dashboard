import { Hospital, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const links = [
    {
      id: 1,
      title: "Home",
      href: "/",
    },
    {
      id: 2,
      title: "About",
      href: "#about",
    },
    {
      id: 3,
      title: "Services",
      href: "#services",
    },
    {
      id: 4,
      title: "Contact",
      href: "#contact",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-14">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <Hospital size={30} className="text-blue-500" />

              <h2 className="text-2xl font-bold">
                Care<span className="text-blue-500">Plus</span>
              </h2>
            </div>

            <p className="mt-4 text-center md:text-left text-gray-400 leading-7">
              Providing trusted healthcare services with experienced doctors
              and modern medical facilities.
            </p>

            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-500" />
              <p className="text-gray-400">123 Main Street, City</p>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} className="text-blue-500" />
              <p className="text-gray-400">+1234567890</p>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={18} className="text-blue-500" />
              <p className="text-gray-400">contact@careplus.com</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>

            <ul className="flex flex-col gap-2 mt-4">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-lg font-semibold">Working Hours</h3>

            <ul className="flex flex-col gap-2 mt-4">
              <li>
                <p className="font-medium">Monday - Friday</p>
                <span className="text-gray-400">8:00 AM - 8:00 PM</span>
              </li>

              <li>
                <p className="font-medium">Saturday</p>
                <span className="text-gray-400">9:00 AM - 5:00 PM</span>
              </li>

              <li>
                <p className="font-medium">Sunday</p>
                <span className="text-gray-400">Emergencies Only</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-8 md:mt-12 border-gray-700" />

        <p className="mt-3 pb-4 md:pb-0 text-center text-gray-400">
          &copy; {new Date().getFullYear()} CarePlus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}