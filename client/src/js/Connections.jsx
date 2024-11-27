import React, { useState, useEffect, useCallback } from "react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [form, setForm] = useState({
    name: "",
    ip_address: "",
    username: "",
    password: "",
    version: "15.0", // Set a default option
  });

  // Use the environment variable for the API port
  const apiPort = 5001; // fallback to 5001 if not set
  const apiBaseUrl = `http://localhost:${apiPort}/api/connections`;

  // Memoize the fetchConnections function
  const fetchConnections = useCallback(async () => {
    const response = await fetch(apiBaseUrl);
    const data = await response.json();
    setConnections(data);
  }, [apiBaseUrl]); // Add apiBaseUrl as a dependency

  // Call fetchConnections on component mount
  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]); // Add fetchConnections as a dependency

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidIPAddress = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const isValidFQDN = (domain) => {
    const fqdnRegex = /^(?!-)([a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,}$/;
    return fqdnRegex.test(domain);
  };

  const isValidInput = (input) => {
    return isValidIPAddress(input) || isValidFQDN(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInput(form.ip_address)) {
      alert("Please enter a valid IP address or fully qualified domain name.");
      return;
    }

    const response = await fetch(apiBaseUrl, {
      // Use the variable here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      fetchConnections();
      setForm({ name: "", ip_address: "", username: "", password: "", version: "15.0" }); // Reset to default version
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${apiBaseUrl}/${id}`, {
      // Use the variable here
      method: "DELETE",
    });

    if (response.ok) {
      fetchConnections(); // Refresh the list
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Connection Manager</h1>

      {/* Form Section */}
      <div className="bg-white dark:bg-gray-600 p-6 rounded-lg shadow-md mb-6">
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Connection Name" value={form.name} onChange={handleChange} required className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400" />
          <input type="text" name="ip_address" placeholder="IP Address or FQDN" value={form.ip_address} onChange={handleChange} required className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400"/>
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400" />
          <select name="version" value={form.version} onChange={handleChange} required className="w-full p-2 mb-4 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400">
            <option value="12.0">12.0</option>
            <option value="12.5">12.5</option>
            <option value="14.0">14.0</option>
            <option value="15.0">15.0</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Save Connection
          </button>
        </form>
      </div>

      {/* Table Section */}
      <h1 className="text-2xl font-bold mb-6 mt-6 text-center">Saved Connections</h1>
      <div className="overflow-hidden">
        {connections.length === 0 ? (
          <p className="text-gray-600 text-center">No connections available.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Hostname
                </th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Version
                </th>
                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {connections.map((conn) => (
                <tr key={conn.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">{conn.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">{conn.ip_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">{conn.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">{conn.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button onClick={() => handleDelete(conn.id)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Close the ternary operator here */}
      </div>
    </div>
  );
}

export default Connections;
