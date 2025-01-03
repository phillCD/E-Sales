import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import JSZip from "jszip";

function CreateSale() {
    const [products, setProducts] = useState<any[]>([]);
    const [buyers, setBuyers] = useState<any[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<{ product: any, productOptions: any[] }[]>([]);
    const [selectedBuyer, setSelectedBuyer] = useState<any>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/buyer?limit=20&page=${currentPage - 1}`);
                if (!response.ok) {
                    throw new Error('Erro ao obter compradores');
                }
                const data = await response.json();
                setBuyers(data.content);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBuyers();
    }, [currentPage]);

    const handleProductSearch = async (index: number, searchTerm: string) => {
        try {
            const response = await fetch(`http://localhost:8080/products/search?name=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            const data = await response.json();
            const updatedSelectedProducts = [...selectedProducts];
            console.log(data)
            updatedSelectedProducts[index].productOptions = data || [];
            setSelectedProducts(updatedSelectedProducts);
        } catch (error) {
            console.error(error);
        }
    };

    const handleProductSelect = (index: number, productId: string) => {
        const product = selectedProducts[index].productOptions.find(p => p.id === Number(productId));
        const updatedSelectedProducts = [...selectedProducts];
        updatedSelectedProducts[index].product = product;
        setSelectedProducts(updatedSelectedProducts);
    };

    const handleAddProduct = () => {
        setSelectedProducts([...selectedProducts, { product: null, productOptions: [] }]);
    };

    const handleBuyerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const buyerId = event.target.value;
        const buyer = buyers.find(b => b.id === parseInt(buyerId));
        setSelectedBuyer(buyer);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/sale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ buyer: selectedBuyer, products: selectedProducts.map(sp => sp.product) })
            });
            if (!response.ok) {
                throw new Error('Erro ao criar venda');
            }
            setSuccessMessage('Venda realizada com sucesso!');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const downloadProductSheets = (product: any[], buyer: any) => {
        fetch('http://127.0.0.1:5000/run-script', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product, buyer }),
        })
        .then((response) => {
            console.log(product, buyer);
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to download the file');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (!data.files || !Array.isArray(data.files)) {
                throw new Error('Invalid response format: files field is missing or not an array');
            }

            const zip = new JSZip();
            const files = data.files; // Assuming the response has a 'files' field which is an array of base64 strings

            files.forEach((base64File: string, index: number) => {
                const binaryString = window.atob(base64File);
                const binaryLen = binaryString.length;
                const bytes = new Uint8Array(binaryLen);
                for (let i = 0; i < binaryLen; i++) {
                    const ascii = binaryString.charCodeAt(i);
                    bytes[i] = ascii;
                }
                const filename = `product_sheet_${index + 1}.xlsx`;
                zip.file(filename, bytes);
            });

            zip.generateAsync({ type: 'blob' }).then((content) => {
                const url = window.URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'product_sheets.zip');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        })
        .catch((error) => {
            console.error('Error downloading the file:', error);
        });
    };

    const handleDownloadSheets = () => {
        console.log(selectedProducts);
        downloadProductSheets(selectedProducts.map(sp => sp.product), selectedBuyer);
    };

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Criar Venda
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-slate-50 flex items-center justify-center gap-4 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Comprador</h1>
                                <div className="flex items-center">
                                    <select
                                        value={selectedBuyer ? selectedBuyer.id : ''}
                                        onChange={handleBuyerChange}
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                    >
                                        <option value="">Selecione um comprador</option>
                                        {Array.isArray(buyers) && buyers.map(buyer => (
                                            <option key={buyer.id} value={buyer.id}>
                                                {buyer.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {selectedProducts.map((selectedProduct, index) => (
                            <div key={index} className="bg-slate-50 grid grid-cols-2 gap-4 p-5">
                                <div>
                                    <h1 className="text-slate-800 font-bold p-1 pt-4">Produto</h1>
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Pesquise por nome do produto"
                                            onChange={(e) => handleProductSearch(index, e.target.value)}
                                            className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        />
                                        {selectedProduct.productOptions && (
                                            <select
                                                value={selectedProduct.product ? selectedProduct.product.id : ''}
                                                onChange={(e) => handleProductSelect(index, e.target.value)}
                                                className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                            >
                                                <option value="">Selecione um produto</option>
                                                {selectedProduct.productOptions.map(product => (
                                                    <option key={product.id} value={product.id}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center p-5">
                            <button
                                type="button"
                                onClick={handleAddProduct}
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                            >
                                Adicionar Produto
                            </button>
                        </div>
                        <div className="flex justify-center p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                            >
                                Criar Venda
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center p-5">
                        <button
                            type="button"
                            onClick={handleDownloadSheets}
                            className="bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600"
                        >
                            Download Fichas de Produto
                        </button>
                    </div>
                    <div>
                        {successMessage && (
                            <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                {successMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSale;