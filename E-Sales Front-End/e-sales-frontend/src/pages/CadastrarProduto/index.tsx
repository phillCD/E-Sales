import { useState } from "react";
import Navbar from "../../components/navbar";
import InputMask from 'react-input-mask';

function AddProduct() {
    const [productFormData, setProductFormData] = useState({
        name: '',
        reference: '',
        brand: '',
        ncm: '',
        cest: '',
        ipi: '',
        barcode: '',
        height: '',
        width: '',
        weight: '',
        length: '',
        price: ''
    });

    const [boxFormData, setBoxFormData] = useState({
        product: '',
        box_barcode: '',
        box_height: '',
        box_width: '',
        box_weight: '',
        box_length: '',
        box_quantity: ''
    });

    const [displayFormData, setDisplayFormData] = useState({
        product: '',
        display_barcode: '',
        display_height: '',
        display_width: '',
        display_weight: '',
        display_length: '',
        display_quantity: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleProductInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductFormData({
            ...productFormData,
            [name]: value
        });
    };

    const handleBoxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBoxFormData({
            ...boxFormData,
            [name]: value
        });
    };

    const handleDisplayInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDisplayFormData({
            ...displayFormData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(productFormData, boxFormData, displayFormData);

        try {
            const productResponse = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productFormData)
            });
            if (!productResponse.ok) {
                throw new Error('Erro ao cadastrar produto');
            }
            const productData = await productResponse.json();

            console.log(productData);

            const updatedBoxFormData = { ...boxFormData, product: productData };
            const updatedDisplayFormData = { ...displayFormData, product: productData };

            const boxResponse = await fetch('http://localhost:8080/product-box', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBoxFormData)
            });
            if (!boxResponse.ok) {
                throw new Error('Erro ao cadastrar caixa');
            }

            const displayResponse = await fetch('http://localhost:8080/product-display', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDisplayFormData)
            });
            if (!displayResponse.ok) {
                throw new Error('Erro ao cadastrar display');
            }

            setSuccessMessage('Cadastro realizado com sucesso!');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
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
                        Cadastrar Produto
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-slate-50 grid grid-cols-2 gap-4 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Nome</h1>
                                <div className="flex items-center">
                                    <input
                                        name="name"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Nome"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Referência</h1>
                                <div className="flex items-center">
                                    <input
                                        name="reference"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Referência"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Marca</h1>
                                <div className="flex items-center">
                                    <input
                                        name="brand"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Marca"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">NCM</h1>
                                <div className="flex items-center">
                                    <InputMask
                                        name="ncm"
                                        mask="9999.99.99"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="NCM"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">CEST</h1>
                                <div className="flex items-center">
                                    <InputMask
                                        name="cest"
                                        mask="99.999.99"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="CEST"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">IPI</h1>
                                <div className="flex items-center">
                                    <input
                                        name="ipi"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="IPI"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Código de Barras</h1>
                                <div className="flex items-center">
                                    <input
                                        name="barcode"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Código de Barras"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Altura</h1>
                                <div className="flex items-center">
                                    <input
                                        name="height"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Altura"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Largura</h1>
                                <div className="flex items-center">
                                    <input
                                        name="width"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Largura"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Peso</h1>
                                <div className="flex items-center">
                                    <input
                                        name="weight"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Peso"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Comprimento</h1>
                                <div className="flex items-center">
                                    <input
                                        name="length"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Comprimento"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Preço</h1>
                                <div className="flex items-center">
                                    <input
                                        name="price"
                                        onChange={handleProductInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Preço"
                                    />
                                </div>
                            </div>
                        </div>

                        <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                            Cadastrar Caixa
                        </h1>
                        <div className="bg-slate-50 grid grid-cols-2 gap-4 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Código de Barras da Caixa</h1>
                                <div className="flex items-center">
                                    <input
                                        name="box_barcode"
                                        onChange={handleBoxInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Código de Barras da Caixa"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Altura da Caixa</h1>
                                <div className="flex items-center">
                                    <input
                                        name="box_height"
                                        onChange={handleBoxInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Altura da Caixa"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Largura da Caixa</h1>
                                <div className="flex items-center">
                                    <input
                                        name="box_width"
                                        onChange={handleBoxInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Largura da Caixa"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Peso da Caixa</h1>
                                <div className="flex items-center">
                                    <input
                                        name="box_weight"
                                        onChange={handleBoxInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Peso da Caixa"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Comprimento da Caixa</h1>
                                <div className="flex items-center">
                                    <input
                                        name="box_length"
                                        onChange={handleBoxInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Comprimento da Caixa"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Quantidade na Caixa</h1>
                                <div className="flex items-center">
                                    <input
                                        name="box_quantity"
                                        onChange={handleBoxInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Quantidade na Caixa"
                                    />
                                </div>
                            </div>
                        </div>

                        <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                            Cadastrar Display
                        </h1>
                        <div className="bg-slate-50 grid grid-cols-2 gap-4 p-5">
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Código de Barras do Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="display_barcode"
                                        onChange={handleDisplayInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Código de Barras do Display"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Altura do Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="display_height"
                                        onChange={handleDisplayInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Altura do Display"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Largura do Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="display_width"
                                        onChange={handleDisplayInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Largura do Display"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Peso do Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="display_weight"
                                        onChange={handleDisplayInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Peso do Display"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Comprimento do Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="display_length"
                                        onChange={handleDisplayInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Comprimento do Display"
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-slate-800 font-bold p-1 pt-4">Quantidade no Display</h1>
                                <div className="flex items-center">
                                    <input
                                        name="display_quantity"
                                        onChange={handleDisplayInputChange}
                                        type="text"
                                        className="bg-slate-100 rounded-sm outline outline-1 outline-gray-400 p-2 w-full"
                                        placeholder="Quantidade no Display"
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
                    </form>

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

export default AddProduct;