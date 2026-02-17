import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Crud() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [clientname, setClientname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  // Fetch clients
  const fetchClients = async () => {
    const res = await axios.get("http://localhost:3000/getclient");
    setClients(res.data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Submit Form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientname || !phonenumber || !address) {
      alert("All fields required");
      return;
    }

    if (editId) {
      // UPDATE
      await axios.put(`http://localhost:3000/updateclient/${editId}`, {
        clientname,
        phonenumber,
        address,
      });
      alert("Client updated successfully");
    } else {
      // ADD
      await axios.post("http://localhost:3000/add-client", {
        clientname,
        phonenumber,
        address,
      });
      alert("Client added successfully");
    }

    // Reset
    setClientname("");
    setPhonenumber("");
    setAddress("");
    setEditId(null);
    setShowForm(false);
    fetchClients();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/deleteclient/${id}`);
    alert("Client deleted successfully");
    fetchClients();
  };

  // EDIT (Fill Form)
  const handleEdit = (client) => {
    setClientname(client.clientname);
    setPhonenumber(client.phonenumber);
    setAddress(client.address);
    setEditId(client._id);
    setShowForm(true);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Client CRUD</h1>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {showForm ? "Close Form" : "Add Client"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow mb-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Client Name"
              value={clientname}
              onChange={(e) => setClientname(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editId ? "Update Client" : "Submit"}
            </button>
          </form>
        )}

        {/* TABLE */}
        <div className="bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Client Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Address</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr key={client._id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{client.clientname}</td>
                  <td className="p-3">{client.phonenumber}</td>
                  <td className="p-3">{client.address}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(client)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {clients.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
