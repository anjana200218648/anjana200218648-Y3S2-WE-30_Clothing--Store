import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Upload, Trophy, FileSpreadsheet } from "lucide-react";

function App() {
    const [cashiers, setCashiers] = useState([]);
    const [bestCashier, setBestCashier] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5001/cashiers").then((response) => {
            setCashiers(response.data.cashiers);
            setBestCashier(response.data.bestCashier);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const formData = new FormData();
            formData.append("file", acceptedFiles[0]);

            await axios.post("http://localhost:5001/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            window.location.reload();
        },
    });

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-4xl w-full bg-gray-800 shadow-xl rounded-xl p-8 text-center">
                <h1 className="text-3xl font-bold flex items-center justify-center mb-4">
                    <FileSpreadsheet className="mr-2 text-yellow-400 justify-center mb-4 " /> Cashier Sales Tracker
                </h1>

                <div {...getRootProps()} className="border-2 border-dashed border-yellow-500 p-6 my-6 text-center rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition inline-block w-full">
                    <input {...getInputProps()} />
                    <Upload className="mx-auto text-yellow-400 mb-2" size={32} />
                    <p className="text-yellow-300">Drag & drop an Excel file here, or click to select</p>
                </div>

                {bestCashier && (
                    <div className="p-4 bg-green-600 border border-green-400 rounded-lg flex flex-col items-center shadow-lg mb-6">
                        <Trophy className="text-white mb-2" size={32} />
                        <h2 className="font-bold text-white text-lg">Best Cashier: {bestCashier.name}</h2>
                        <p className="text-gray-200">Sales: ${bestCashier.totalSales}</p>
                    </div>
                )}

                <div className="overflow-x-auto mt-6 w-full">
                    <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden text-center">
                        <thead>
                            <tr className="bg-yellow-600 text-white">
                                <th className="border p-3">Name</th>
                                <th className="border p-3">Total Sales</th>
                                <th className="border p-3">Working Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cashiers.map((cashier, index) => (
                                <tr key={index} className="border bg-gray-700 hover:bg-gray-600 transition text-white">
                                    <td className="p-3">{cashier.name}</td>
                                    <td className="p-3">${cashier.totalSales}</td>
                                    <td className="p-3">{cashier.workingDays}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
