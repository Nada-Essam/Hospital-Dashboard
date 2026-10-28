"use client";

import { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    doctorId: "",
    patientId: "",
    date: "",
    time: "",
    status: "Pending",
  });

  // Read data from localStorage
  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");

    const storedDoctors = localStorage.getItem("doctors");
    const storedPatients = localStorage.getItem("patients");

    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }

    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors));
    }

    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }

    setLoaded(true);
    setLoading(false);
  }, []);

  // Save appointments whenever they change
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments, loaded]);

  function resetForm() {
    setFormData({
      doctorId: "",
      patientId: "",
      date: "",
      time: "",
      status: "Pending",
    });
  }

  function handleAddAppointment() {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  }

  function handleEditAppointment(id) {
    const appointment = appointments.find(
      (appointment) => appointment.id === id,
    );

    if (!appointment) return;

    setFormData({
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status || "Pending",
    });

    setEditingId(id);
    setShowForm(true);
  }

  function handleSaveAppointment(e) {
    e.preventDefault();

    const newAppointment = {
      id: editingId || crypto.randomUUID(),
      ...formData,
    };

    if (editingId) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editingId ? newAppointment : appointment,
      );

      setAppointments(updatedAppointments);
    } else {
      setAppointments([...appointments, newAppointment]);
    }

    handleCancel();
  }

  function handleDeleteAppointment(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this appointment?",
    );
    if (!isConfirmed) return;

    setAppointments((currentAppointments) =>
      currentAppointments.filter((appointment) => appointment.id !== id),
    );
  }

  function handleCancel() {
    resetForm();
    setEditingId(null);
    setShowForm(false);
  }

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.date.includes(search),
  );

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  const handleStatusChange = (id, newStatus) => {
    const updatedAppointments = appointments.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Appointments</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            onClick={handleAddAppointment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Appointment
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 mt-4 rounded shadow">
          <form onSubmit={handleSaveAppointment}>
            {/* Doctor */}
            <select
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorId: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            >
              <option value="">Select Doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>

            {/* Patient */}
            <select
              value={formData.patientId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  patientId: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>

            {/* Date */}
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            {/* Time */}
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  time: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            <button
              type="submit"
              className={`text-white px-4 py-2 mr-2 rounded ${
                editingId
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {editingId ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Appointments Table */}
      <div className="mt-4 bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
        {filteredAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Doctor Name
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Patient Name
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Time
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {doctors.find(
                      (doctor) => doctor.id === appointment.doctorId,
                    )?.name || "Deleted Doctor"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patients.find(
                      (patient) => patient.id === appointment.patientId,
                    )?.name || "Deleted Patient"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {appointment.date}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {appointment.time}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <select
                      value={appointment.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(appointment.id, e.target.value)
                      }
                      className={`border rounded-md px-3 py-2 ${getStatusColor(appointment.status || "Pending")}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                      className="mb-2 md:mb-0 bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
