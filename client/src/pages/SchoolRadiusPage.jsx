import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SchoolRadiusPage = () => {
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [radius, setRadius] = useState("10");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [schools, setSchools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const handleClick = async () => {
        if (Math.abs(parseFloat(latitude)) > 90 || Math.abs(parseFloat(longitude)) > 180) {
            setError("Invalid Coordinates");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/coords?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
            if (!response.ok) {
                throw new Error('Response not ok');
            }
            const data = await response.json();
            setSchools(data);
            setCurrentPage(1);
        } catch (err) {
            setError("Error fetching schools: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(schools.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentData = schools.slice(startIdx, endIdx);

    return (
        <div className="min-h-[100vh] bg-white p-5">
            <div className="flex gap-10 mb-5">
                <input
                    type="text"
                    className="border-black border rounded-md p-2"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
                <input
                    type="text"
                    className="border-black border rounded-md p-2"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <input
                    type="text"
                    className="border-black border rounded-md p-2"
                    placeholder="Radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={handleClick}>
                    Find Schools
                </button>
            </div>
            
            {error && <div className="border border-red-500 bg-red-100 p-2 mb-5">{error}</div>}
            {loading && <div className="mb-5">Loading...</div>}
            
            {schools.length > 0 ? (
                <div>
                    <div className="overflow-y-auto overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    {Object.keys(currentData[0]).map((key) => (
                                        <th key={key} className="border border-gray-400 p-2 text-left bg-gray-100">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index}>
                                        {Object.entries(item).map(([key, value], idx) => (
                                            <td key={idx} className="border border-gray-400 p-2">
                                                {key === 'SCH_NAME' ? (
                                                    <button
                                                        onClick={() => navigate(`/school/${encodeURIComponent(value)}`)}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {value}
                                                    </button>
                                                ) : (
                                                    value
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            className="p-2 border border-gray-400 rounded disabled:opacity-50"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="p-2">
                            Page {currentPage} of {Math.ceil(schools.length / itemsPerPage)}
                        </span>
                        <button
                            className="p-2 border border-gray-400 rounded disabled:opacity-50"
                            onClick={handleNextPage}
                            disabled={currentPage >= Math.ceil(schools.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <p className='text-center my-[3rem]'>
                    No data available
                </p>
            )}
        </div>
    );
};

export default SchoolRadiusPage;