import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      id: 1,
      icon: MapPin,
      title: "Address",
      info: "123 Main Street, City, Country",
    },
    {
      id: 2,
      icon: Phone,
      title: "Phone",
      info: "+1 (123) 456-7890",
    },
    {
      id: 3,
      icon: Mail,
      title: "Email",
      info: "info@careplus.com",
    },
    {
      id: 4,
      icon: Clock3,
      title: "Working Hours",
      info: "24/7 Available",
    },
  ];

  return (
    <div id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
          <ShieldCheck size={18} className="text-blue-600" />
          <p className="text-sm font-medium text-blue-700">Contact Us</p>
        </div>

        <h2 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
          Get in Touch with Us
        </h2>

        <p className="mt-5 text-lg text-gray-600 leading-8 max-w-2xl mx-auto">
          Have questions or need assistance? We are here to help you with
          appointments, medical inquiries, and support.
        </p>
      </div>

      <div className="mt-16 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-[40%]">
          <div className="space-y-6">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon size={20} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.info}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-[60%]">
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                placeholder="I need help with..."
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
              </label>

              <textarea
                id="message"
                rows="6"
                placeholder="Write your message here..."
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />

            </div>

            <div className="mt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 cursor-pointer">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}