import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";

function BuyerList() {
    const [buyers, setBuyers] = useState<any[]>([]); // Initialize as an empty array
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1); // Start from page 1
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/buyer?limit=20&page=${currentPage - 1}`); // Adjust page number for API
                if (!response.ok) {
                    throw new Error('Failed to fetch buyers');
                }
                const data = await response.json();
                setBuyers(data.content || []); // Ensure data.content is an array
                setTotalPages(Math.ceil(data.totalElements / 20)); // Assuming the API returns the total number of buyers
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchBuyers();
    }, [currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter buyers based on search term
    const filteredBuyers = buyers.filter(buyer =>
        buyer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Lista de Compradores
                    </h1>
                    {error && (
                        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </p>
                    )}
                    <div className="bg-slate-50 p-5">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full mb-4"
                        />
                        <ul>
                            {Array.isArray(filteredBuyers) && filteredBuyers.map((buyer) => (
                                <li key={buyer.id} className="p-2 border-b border-gray-300">
                                    <a href={`/ver-comprador/${buyer.id}`}>
                                        <h2 className="text-xl font-bold">{buyer.name}</h2>
                                    </a>
                                    <p>Email: {buyer.email}</p>
                                    <p>CNPJ: {buyer.cnpj}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Anterior
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerList;