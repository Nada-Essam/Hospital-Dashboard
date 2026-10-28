"use client";

import { useEffect, useState } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    phone: "",
  });

  const [selectedSpecialization, setSelectedSpecialization] =
    useState("all");

  const specializations = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "pediatrics", label: "Pediatrics" },
  ];

  // Read doctors from localStorage
  useEffect(() => {
    const storedDoctors = localStorage.getItem("doctors");

    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors));
    }

    setLoaded(true);
    setLoading(false);
  }, []);

  // Save doctors whenever they change
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors, loaded]);

  function handleAddDoctor() {
    setFormData({
      name: "",
      specialization: "",
      phone: "",
    });

    setEditingId(null);
    setShowForm(true);
  }

  function handleSaveDoctor(e) {
    e.preventDefault();

    const newDoctor = {
      id: editingId || crypto.randomUUID(),
      ...formData,
    };

    if (editingId) {
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === editingId ? newDoctor : doctor
      );

      setDoctors(updatedDoctors);
      setEditingId(null);
    } else {
      setDoctors([...doctors, newDoctor]);
    }

    setFormData({
      name: "",
      specialization: "",
      phone: "",
    });

    setShowForm(false);
  }

  function removeRelatedData(key, doctorId) {
    const storedData = localStorage.getItem(key);

    if (!storedData) return;

    const data = JSON.parse(storedData);

    const filteredData = data.filter(
      (item) => item.doctorId !== doctorId
    );

    localStorage.setItem(key, JSON.stringify(filteredData));
  }

  function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!isConfirmed) return;

    removeRelatedData("appointments", id);
    removeRelatedData("prescriptions", id);

    setDoctors((currentDoctors) =>
      currentDoctors.filter((doctor) => doctor.id !== id)
    );
  }

  function handleEdit(id) {
    const doctor = doctors.find((doctor) => doctor.id === id);

    if (!doctor) return;

    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
    });

    setEditingId(id);
    setShowForm(true);
  }

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSpecialization =
      selectedSpecialization === "all" ||
      doctor.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  if (loading) {
    return <p>Loading doctors...</p>;
  }

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Doctors</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          {/* Filter */}
          <select
            value={selectedSpecialization}
            onChange={(e) =>
              setSelectedSpecialization(e.target.value)
            }
            className="bg-white border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="all">All Specializations</option>

            {specializations.map((specialization) => (
              <option
                key={specialization.value}
                value={specialization.value}
              >
                {specialization.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddDoctor}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Doctor
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 mt-4 rounded shadow">
          <form onSubmit={handleSaveDoctor}>
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            <select
              required
              value={formData.specialization}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  specialization: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            >
              <option value="">Select Specialization</option>

              {specializations.map((specialization) => (
                <option
                  key={specialization.value}
                  value={specialization.value}
                >
                  {specialization.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            <button
              type="submit"
              className={`text-white px-4 py-2 mr-2 rounded ${
                editingId ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {editingId ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Doctors Table */}
      <div className="mt-4 bg-white rounded-lg shadow-sm p-4">
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500">No doctors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Doctor Name
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Specialization
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Phone
                  </th>

                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr
                    key={doctor.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.specialization}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {doctor.phone}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      <button
                        onClick={() => handleEdit(doctor.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="bg-red-500 text-white mt-2 md:mt-0 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}