
import {
  ShieldCheck,
  Stethoscope,
  Users,
  Clock3,
  HeartPulse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-6 min-h-[calc(100vh-80px)] py-12 md:py-0 flex items-center">
      <div
        id="home"
        className="flex flex-col md:flex-row w-full items-center justify-between"
      >
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
            <ShieldCheck size={18} className="text-blue-600" />

            <p className="text-sm font-medium text-blue-700">
              Trusted Healthcare Platform
            </p>
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Your <span className="text-blue-600">Health</span>,
            <br />
            Our Priority.
          </h1>

          <p className="mt-5 text-lg text-gray-600 leading-8 max-w-xl">
            Manage doctors, patients, appointments and prescriptions
            efficiently.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              href="#about"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border w-40 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="rounded-full bg-blue-100 mx-auto w-10 h-10 flex items-center justify-center">
                <Stethoscope className="text-blue-600" size={20} />
              </div>

              <h3 className="text-2xl font-bold mt-4">120+</h3>
              <p className="text-gray-500 text-sm mt-1">Doctors</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border w-40 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="rounded-full bg-blue-100 mx-auto w-10 h-10 flex items-center justify-center">
                <Users className="text-blue-600" size={20} />
              </div>

              <h3 className="text-2xl font-bold mt-4">5000+</h3>
              <p className="text-gray-500 text-sm mt-1">Patients</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border w-40 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="rounded-full bg-blue-100 mx-auto w-10 h-10 flex items-center justify-center">
                <Clock3 className="text-blue-600" size={20} />
              </div>

              <h3 className="text-2xl font-bold mt-4">24/7</h3>
              <p className="text-gray-500 text-sm mt-1">Support</p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center relative mt-10 md:mt-0">
          <Image
            src="/doctor.svg"
            alt="doctor image"
            width={500}
            height={500}
            className="w-full h-auto"
          />

          {/* Expert Doctors */}
          <div className="hidden md:block absolute -top-20 md:-left-8 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <Stethoscope size={20} className="text-blue-600" />

            <h3 className="text-base font-semibold mt-2">Expert Doctors</h3>

            <p className="text-gray-500 text-sm mt-1">120 Specialists</p>
          </div>

          {/* Support */}
          <div className="hidden md:block absolute -bottom-20 md:-right-25 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
            <HeartPulse size={20} className="text-blue-600" />

            <h3 className="font-semibold mt-2">24/7 Support</h3>

            <p className="text-gray-500 text-sm mt-1">Always Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
