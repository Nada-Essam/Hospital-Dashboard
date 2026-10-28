import {
  Ambulance,
  Baby,
  Brain,
  HeartPulse,
  Pill,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Cardiology",
      description: "Advanced cardiology services for heart health.",
      icon: HeartPulse,
    },
    {
      id: 2,
      title: "Emergency",
      description: "Emergency care for life-threatening conditions.",
      icon: Ambulance,
    },
    {
      id: 3,
      title: "Pharmacy",
      description: "Prescription medication and drug information.",
      icon: Pill,
    },
    {
      id: 4,
      title: "Dental Care",
      description: "Dental services for oral health and dental care.",
      icon: Stethoscope,
    },
    {
      id: 5,
      title: "Neurology",
      description: "Specialized neurology services for brain health.",
      icon: Brain,
    },
    {
      id: 6,
      title: "Pediatrics",
      description: "Pediatric care for children's health and well-being.",
      icon: Baby,
    },
  ];

  return (
    <div id="services" className="max-w-6xl mx-auto px-6 py-24">
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
        <ShieldCheck size={18} className="text-blue-600" />
        <p className="text-sm max-w-lg font-medium text-blue-700">
          Our Services
        </p>
      </div>

      <h2 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
        Comprehensive Healthcare Solutions
      </h2>

      <p className="mt-5 text-lg text-gray-600 leading-8 max-w-xl">
        We offer a wide range of medical services with experienced doctors and
        modern equipment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center">
                <Icon size={20} className="text-blue-600" />
              </div>

              <h3 className="mt-4 text-xl font-bold">{service.title}</h3>

              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}