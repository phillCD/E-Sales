import { useState } from "react";
import Navbar from "../../components/navbar";

function ImportarProduto() {
    const [file, setFile] = useState<File | null>(null);
    const [displayFile, setDisplayFile] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleDisplayFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        if (event.target.files) {
            setDisplayFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            const jsonPayload = JSON.stringify({ file: base64String.split(',')[1] });

            try {
                const response = await fetch('http://127.0.0.1:5000/import-product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonPayload
                });
                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }

                setSuccessMessage('File uploaded successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } catch (error) {
                setErrorMessage('Error uploading file');
                console.error('Error uploading file:', error);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDisplaySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!displayFile) {
            alert('Please select a display file to upload.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result as string;
            const jsonPayload = JSON.stringify({ file: base64String.split(',')[1] });

            try {
                const response = await fetch('http://127.0.0.1:5000/import-product-display', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonPayload
                });
                if (!response.ok) {
                    throw new Error('Failed to upload display file');
                }

                setSuccessMessage('Display file uploaded successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } catch (error) {
                setErrorMessage('Error uploading display file');
                console.error('Error uploading display file:', error);
            }
        };
        reader.readAsDataURL(displayFile);
    };

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Importar Produtos
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-slate-50 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Selecione o Arquivo</h1>
                                <div className="flex items-center">
                                    <input
                                        name="file"
                                        type="file"
                                        accept=".xlsx"
                                        onChange={handleFileChange}
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                    <form onSubmit={handleDisplaySubmit}>
                        <div className="bg-slate-50 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Selecione o Arquivo de Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="displayFile"
                                        type="file"
                                        accept=".xlsx"
                                        onChange={handleDisplayFileChange}
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                            >
                                Upload Display File
                            </button>
                        </div>
                    </form>
                    <div>
                        {successMessage && (
                            <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                {successMessage}
                            </p>
                        )}
                        {errorMessage && (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImportarProduto;