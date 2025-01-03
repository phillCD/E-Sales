import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";

function GetProduct() {
    const { id } = useParams<{ id: string }>();
    const [productData, setProductData] = useState<any>(null);
    const [boxData, setBoxData] = useState<any>(null);
    const [displayData, setDisplayData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productResponse = await fetch(`http://localhost:8080/products/${id}`);
                if (!productResponse.ok) {
                    throw new Error('Erro ao obter produto');
                }
                const productData = await productResponse.json();
                setProductData(productData);

                const boxResponse = await fetch(`http://localhost:8080/product-box/product/${id}`);
                if (!boxResponse.ok) {
                    throw new Error('Erro ao obter caixa');
                }
                const boxData = await boxResponse.json();
                setBoxData(boxData);

                const displayResponse = await fetch(`http://localhost:8080/product-display/product/${id}`);
                if (displayResponse.status === 200) {
                    const displayData = await displayResponse.json();
                    setDisplayData(displayData);
                } else{
                    setDisplayData(null);
                }
            } catch (error) {
                setErrorMessage('Erro ao obter dados');
                setProductData(null);
                setBoxData(null);
                setDisplayData(null);
                console.error(error);
            }
        };

        fetchProductData();
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Ver Produto
                    </h1>
                    <div>
                        {errorMessage && (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {errorMessage}
                            </p>
                        )}
                        {productData && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <p><strong>Nome:</strong> {productData.name}</p>
                                <p><strong>Código de Barras:</strong> {productData.barcode}</p>
                                <p><strong>Altura:</strong> {productData.height}</p>
                                <p><strong>Largura:</strong> {productData.width}</p>
                                <p><strong>Peso:</strong> {productData.weight}</p>
                                <p><strong>Comprimento:</strong> {productData.length}</p>
                                <p><strong>Preço:</strong> {productData.price}</p>
                            </div>
                        )}
                        {boxData && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <p><strong>Código de Barras da Caixa:</strong> {boxData.box_barcode}</p>
                                <p><strong>Altura da Caixa:</strong> {boxData.box_height}</p>
                                <p><strong>Largura da Caixa:</strong> {boxData.box_width}</p>
                                <p><strong>Peso da Caixa:</strong> {boxData.box_weight}</p>
                                <p><strong>Comprimento da Caixa:</strong> {boxData.box_length}</p>
                                <p><strong>Quantidade na Caixa:</strong> {boxData.box_quantity}</p>
                            </div>
                        )}
                        {displayData && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                <p><strong>Código de Barras do Display:</strong> {displayData.display_barcode}</p>
                                <p><strong>Altura do Display:</strong> {displayData.display_height}</p>
                                <p><strong>Largura do Display:</strong> {displayData.display_width}</p>
                                <p><strong>Peso do Display:</strong> {displayData.display_weight}</p>
                                <p><strong>Comprimento do Display:</strong> {displayData.display_length}</p>
                                <p><strong>Quantidade no Display:</strong> {displayData.display_quantity}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetProduct;