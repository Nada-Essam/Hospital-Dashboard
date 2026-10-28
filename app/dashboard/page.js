"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";

export default function Page() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const router = useRouter();

  const data = [
    {
      name: "Doctors",
      value: doctors.length,
    },
    {
      name: "Patients",
      value: patients.length,
    },
    {
      name: "Appointments",
      value: appointments.length,
    },
    {
      name: "Prescriptions",
      value: prescriptions.length,
    },
  ];

  useEffect(() => {
    const storedDoctors = localStorage.getItem("doctors");
    const storedPatients = localStorage.getItem("patients");
    const storedAppointments = localStorage.getItem("appointments");
    const storedPrescriptions = localStorage.getItem("prescriptions");

    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors));
    }

    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }

    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }

    if (storedPrescriptions) {
      setPrescriptions(JSON.parse(storedPrescriptions));
    }
  }, []);

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold">Hospital Overview</h2>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Doctors" value={doctors.length} />
        <Card title="Patients" value={patients.length} />
        <Card title="Appointments" value={appointments.length} />
        <Card title="Prescriptions" value={prescriptions.length} />
      </div>

      <h2 className="text-2xl font-bold mt-8">Recent Appointments</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="mt-4 bg-white rounded-lg shadow-sm p-4 w-full md:w-[55%]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {appointments.slice(-3).map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {patients.find(
                        (patient) => patient.id === appointment.patientId,
                      )?.name || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {doctors.find(
                        (doctor) => doctor.id === appointment.doctorId,
                      )?.name || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm">{appointment.date}</td>

                    <td className="px-6 py-4 text-sm">{appointment.time}</td>

                    <td className="px-6 py-4 text-sm">{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => router.push("/dashboard/appointments")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              View All
            </button>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-lg shadow-sm p-4 w-full md:w-[45%]">
          <h3 className="text-2xl font-bold mb-4">Hospital Statistics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
