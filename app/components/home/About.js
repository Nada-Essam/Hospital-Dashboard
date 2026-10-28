import Image from "next/image";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div
      id="about"
      className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 min-h-[calc(100vh-80px)] py-12 md:py-0 items-center"
    >
      <div className="w-full md:w-1/2">
        <Image
          className="w-full max-w-md h-auto"
          src="/doc.svg"
          alt="Doctor illustration"
          width={500}
          height={500}
        />
      </div>

      <div className="w-full md:w-1/2 py-12 md:py-0">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
          <ShieldCheck size={18} className="text-blue-600" />
          <p className="text-sm max-w-lg font-medium text-blue-700">
            About CarePlus
          </p>
        </div>

        <h2 className="mt-6 text-5xl md:text-6xl font-bold leading-tight text-gray-900">
          Quality Healthcare, You Can Trust
        </h2>

        <p className="mt-5 text-lg text-gray-600 leading-8 max-w-xl">
          We provide exceptional healthcare services with experienced doctors,
          modern facilities, and patient-centered care to ensure the best
          medical experience.
        </p>

        <ul className="mt-6 space-y-3">
          <li className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>Experienced Medical Team</span>
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>Modern Medical Facilities</span>
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>24/7 Customer Support</span>
          </li>

          <li className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>Personalized Patient Care</span>
          </li>
        </ul>

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}