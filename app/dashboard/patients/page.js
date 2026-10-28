"use client";

import { useEffect, useState } from "react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  // Read patients from localStorage
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");

    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }

    setLoaded(true);
    setLoading(false);
  }, []);

  // Save patients whenever they change
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients, loaded]);

  function resetForm() {
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
    });
  }

  function handleAddPatient() {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  }

  function handleSavePatient(e) {
    e.preventDefault();

    const newPatient = {
      id: editingId || crypto.randomUUID(),
      ...formData,
    };

    if (editingId) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editingId ? newPatient : patient
      );

      setPatients(updatedPatients);
    } else {
      setPatients([...patients, newPatient]);
    }

    handleCancel();
  }

  function removeRelatedData(key, patientId) {
    const storedData = localStorage.getItem(key);

    if (!storedData) return;

    const data = JSON.parse(storedData);

    const filteredData = data.filter(
      (item) => item.patientId !== patientId
    );

    localStorage.setItem(key, JSON.stringify(filteredData));
  }

  function handleDelete(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!isConfirmed) return;

    removeRelatedData("appointments", id);
    removeRelatedData("prescriptions", id);

    setPatients((currentPatients) =>
      currentPatients.filter((patient) => patient.id !== id)
    );
  }

  function handleEdit(id) {
    const patient = patients.find((patient) => patient.id === id);

    if (!patient) return;

    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
    });

    setEditingId(id);
    setShowForm(true);
  }

  function handleCancel() {
    resetForm();
    setEditingId(null);
    setShowForm(false);
  }

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading Patients...</p>;
  }

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Patients</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            onClick={handleAddPatient}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Patient
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 mt-4 rounded shadow">
          <form onSubmit={handleSavePatient}>
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

            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  age: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            <select
              value={formData.gender}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
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

            <div className="flex gap-2">
              <button
                type="submit"
                className={`text-white px-4 py-2 rounded ${
                  editingId ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {editingId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Patients Table */}
      <div className="mt-4 bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
        {filteredPatients.length === 0 ? (
          <p className="text-gray-500">No patients found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Gender
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patient.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patient.age}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patient.gender}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {patient.phone}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    <button
                      onClick={() => handleEdit(patient.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="bg-red-500 text-white mt-2 md:mt-0 px-3 py-1 rounded"
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