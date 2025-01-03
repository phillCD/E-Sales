import { useState } from "react";
import Navbar from "../../components/navbar";
import InputMask from 'react-input-mask';

function AddBuyer() {
    const [formData, setFormData] = useState({
        name: '',
        cnpj: '',
        email: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);

        const formDataToSend = new FormData();
        formDataToSend.append('buyer', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
        if (file) {
            formDataToSend.append('file', file);
        }

        try {
            const response = await fetch('http://localhost:8080/buyer', {
                method: 'POST',
                body: formDataToSend
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar comprador');
            }
            const data = await response.json();
            setSuccessMessage('Cadastro realizado com sucesso!');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Cadastrar Comprador
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-slate-50 grid grid-cols-2 gap-4 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Nome</h1>
                                <div className="flex items-center">
                                    <input
                                        name="name"
                                        onChange={handleInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Nome"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">CNPJ</h1>
                                <div className="flex items-center">
                                    <InputMask
                                        mask="99.999.999/9999-99"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        name="cnpj"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <h1 className="text-slate-800 font-bold p-1 pt-4">E-mail</h1>
                                <input
                                    name="email"
                                    onChange={handleInputChange}
                                    type="email"
                                    className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                    placeholder="E-mail"
                                />
                            </div>
                            <div className="col-span-2">
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Ficha Cadastral</h1>
                                <div className="flex items-center">
                                    <input
                                        name="file"
                                        onChange={handleFileChange}
                                        type="file"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        accept=".xlsx"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                            >
                                Cadastrar
                            </button>
                        </div>
                        <div>
                            {successMessage && (
                                <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                                    {successMessage}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBuyer;