"use client";

import { useEffect, useState } from "react";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
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
    medicine: "",
    dosage: "",
    notes: "",
    date: "",
  });

  useEffect(() => {
    const storedPrescriptions = localStorage.getItem("prescriptions");
    const storedDoctors = localStorage.getItem("doctors");
    const storedPatients = localStorage.getItem("patients");

    if (storedPrescriptions) {
      setPrescriptions(JSON.parse(storedPrescriptions));
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

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "prescriptions",
      JSON.stringify(prescriptions)
    );
  }, [prescriptions, loaded]);

  function resetForm() {
    setFormData({
      doctorId: "",
      patientId: "",
      medicine: "",
      dosage: "",
      notes: "",
      date: "",
    });
  }

  function handleAddPrescription() {
    resetForm();
    setEditingId(null);
    setShowForm(true);
  }

  function handleSavePrescription(e) {
    e.preventDefault();

    const newPrescription = {
      id: editingId || crypto.randomUUID(),
      ...formData,
    };

    if (editingId) {
      const updatedPrescriptions = prescriptions.map(
        (prescription) =>
          prescription.id === editingId
            ? newPrescription
            : prescription
      );

      setPrescriptions(updatedPrescriptions);
    } else {
      setPrescriptions([...prescriptions, newPrescription]);
    }

    handleCancel();
  }

  function handleEditPrescription(id) {
    const prescription = prescriptions.find(
      (prescription) => prescription.id === id
    );

    if (!prescription) return;

    setFormData({
      doctorId: prescription.doctorId,
      patientId: prescription.patientId,
      medicine: prescription.medicine,
      dosage: prescription.dosage,
      notes: prescription.notes,
      date: prescription.date,
    });

    setEditingId(id);
    setShowForm(true);
  }

  function handleDeletePrescription(id) {
      const isConfirmed = window.confirm(
      "Are you sure you want to delete this prescription?"
    );
    if (!isConfirmed) return;
    setPrescriptions((currentPrescriptions) =>
      currentPrescriptions.filter(
        (prescription) => prescription.id !== id
      )
    );
  }

  function handleCancel() {
    resetForm();
    setEditingId(null);
    setShowForm(false);
  }

  const filteredPrescriptions = prescriptions.filter(
    (prescription) => {
      const doctor = doctors.find(
        (doctor) => doctor.id === prescription.doctorId
      );

      const patient = patients.find(
        (patient) => patient.id === prescription.patientId
      );

      const searchValue = search.toLowerCase();

      return (
        doctor?.name?.toLowerCase().includes(searchValue) ||
        patient?.name?.toLowerCase().includes(searchValue)
      );
    }
  );

  if (loading) {
    return <p>Loading prescriptions...</p>;
  }

  return (
    <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Prescriptions</h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Search by doctor or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            onClick={handleAddPrescription}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Prescription
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-4 mt-4 rounded shadow">
          <form onSubmit={handleSavePrescription}>
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

            <input
              type="text"
              placeholder="Medicine"
              value={formData.medicine}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  medicine: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            <input
              type="text"
              placeholder="Dosage"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dosage: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
            />

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

      <div className="mt-4 bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
        {filteredPrescriptions.length === 0 ? (
          <p className="text-gray-500">
            No prescriptions found.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Patient
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Doctor
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Medicine
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Dosage
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Notes
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredPrescriptions.map((prescription) => (
                <tr
                  key={prescription.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patients.find(
                      (patient) =>
                        patient.id === prescription.patientId
                    )?.name || "Deleted Patient"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {doctors.find(
                      (doctor) =>
                        doctor.id === prescription.doctorId
                    )?.name || "Deleted Doctor"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {prescription.medicine}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {prescription.dosage}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {prescription.notes}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {prescription.date}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    <button
                      onClick={() =>
                        handleEditPrescription(prescription.id)
                      }
                      className="mb-2 md:mb-0 bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeletePrescription(prescription.id)
                      }
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