import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";

function GetBuyer() {
    const { id } = useParams<{ id: string }>();
    const [buyerData, setBuyerData] = useState<any>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchBuyerData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/buyer/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao obter comprador');
                }
                const data = await response.json();
                setBuyerData(data);

                // If pythonScript exists, create a downloadable file URL
                if (data.pythonScript) {
                    const byteCharacters = atob(data.pythonScript);
                    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

                    const url = URL.createObjectURL(blob);
                    setFileUrl(url);
                } else {
                    setFileUrl(null);
                }
            } catch (error) {
                setErrorMessage('Erro ao obter comprador');
                setBuyerData(null);
                setFileUrl(null);
                console.error(error);
            }
        };

        fetchBuyerData();

        // Cleanup file URL on component unmount
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Obter Comprador
                    </h1>
                    <div>
                        {errorMessage && (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {errorMessage}
                            </p>
                        )}
                        {buyerData && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <p><strong>Nome:</strong> {buyerData.name}</p>
                                <p><strong>CNPJ:</strong> {buyerData.cnpj}</p>
                                <p><strong>E-mail:</strong> {buyerData.email}</p>
                                {fileUrl && (
                                    <p>
                                        <strong>Ficha Cadastral:</strong> <a href={fileUrl} download="ficha_cadastral.xlsx">Download</a>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetBuyer;
