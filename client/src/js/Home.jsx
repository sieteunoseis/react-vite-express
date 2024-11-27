import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

const Home = () => {
  const handleToast = useToast(); // Use the context to get the function
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConnection, setSelectedConnection] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const navigate = useNavigate();

  const apiPort = 5001; // Fallback to 5001 if not set
  const apiBaseUrl = `http://localhost:${apiPort}/api/connections`;

  useEffect(() => {
    // Replace with your API URL
    const fetchResults = async () => {
      try {
        const response = await fetch(apiBaseUrl);
        const data = await response.json();
        setConnections(data);
        if (data.length === 0) {
          handleToast("No connections found, please add a connection first. Then click the Home link to refresh the page.");
          navigate("/connections"); // Redirect if no results
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        navigate("/error"); // Redirect to an error page if needed
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [apiBaseUrl, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log("Selected Connection:", selectedConnection);
    console.log("Text Area Value:", textAreaValue);
    // Reset text area after submission if desired
    setTextAreaValue("");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <nav className="flex items-center justify-between p-4 bg-gray-400 text-white rounded-lg">
        <div className="ml-auto">
          <label htmlFor="connection-dropdown" className="mr-2">
            Select Connection:
          </label>
          <select id="connection-dropdown" value={selectedConnection} onChange={(e) => setSelectedConnection(e.target.value)} className="p-2 rounded text-black">
            <option value="">-- Select a Connection --</option>
            {connections.map((conn) => (
              <option key={conn.id} value={conn.name}>
                {conn.name}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="p-6 rounded-lg shadow-md mt-4 dark:bg-gray-600">
        <form onSubmit={handleSubmit} id="mainForm">
          <div className="mb-4">
            <textarea id="mainText" value={textAreaValue} onChange={(e) => setTextAreaValue(e.target.value)} placeholder="Enter your message here..." rows="5" className="resize-none w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400" />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
