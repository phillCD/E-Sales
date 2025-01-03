import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";

function ProductList() {
    const [products, setProducts] = useState<any[]>([]); // State to store products
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1); // Start from page 1
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
    const itemsPerPage = 20; // Number of items per page

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products?limit=20&page=${currentPage - 1}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.content || []); // Ensure data.content is an array
                setTotalPages(Math.ceil(data.totalElements / itemsPerPage)); // Calculate total pages
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        if (!searchTerm) {
            fetchProducts();
        }
    }, [currentPage, searchTerm]);

    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);
        setCurrentPage(1); // Reset to first page on search

        if (searchValue) {
            try {
                const response = await fetch(`http://localhost:8080/products/search?name=${searchValue}`);
                if (!response.ok) {
                    throw new Error('Failed to search products');
                }
                const data = await response.json();
                if (searchValue){
                    setProducts(data); // Ensure data.content is an array
                } else {
                    setProducts(data.content || []);
                }
                setTotalPages(Math.ceil(data.totalElements / itemsPerPage)); // Calculate total pages
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        } else {
            // If search term is cleared, fetch the products for the current page
            const fetchProducts = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/products?limit=20&page=${currentPage - 1}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    const data = await response.json();
                    setProducts(data.content || []); // Ensure data.content is an array
                    setTotalPages(Math.ceil(data.totalElements / itemsPerPage)); // Calculate total pages
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError('An unknown error occurred');
                    }
                }
            };

            fetchProducts();
        }
    };

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

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Lista de Produtos
                    </h1>
                    {error && (
                        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {error}
                        </p>
                    )}
                    <div className="bg-slate-50 p-5">
                        <input
                            type="text"
                            placeholder="Pesquise por nome do produto"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full mb-4"
                        />
                        <ul>
                            {Array.isArray(products) && products.map((product) => (
                                <li key={product.id} className="p-2 border-b border-gray-300">
                                    <a href={`/ver-produto/${product.id}`}>
                                        <h2 className="text-xl font-bold">{product.name}</h2>
                                    </a>
                                    <p>Referência: {product.reference}</p>
                                    <p>Marca: {product.brand}</p>
                                    <p>Preço Unitário: ${product.price}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;