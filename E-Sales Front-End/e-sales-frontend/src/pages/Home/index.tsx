import React from 'react';
import Navbar from '../../components/navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="p-20 px-36 flex items-center justify-center">
                <div className="bg-zinc-200 font-rubik w-full mx-auto rounded-lg shadow-lg overflow-hidden">
                    <h1 className="flex items-center justify-center text-3xl text-slate-800 font-bold p-10">
                        Bem Vindo, Usuário!
                    </h1>
                    <div className="bg-slate-50 p-5">
                        <div className="grid grid-cols-2 gap-4 p-5">
                            <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-slate-800 font-bold mb-4">Cadastrar Comprador</h2>
                                <p className="text-slate-600 mb-4">Registre um novo comprador no sistema.</p>
                                <a 
                                    href="/cadastrar-comprador" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                                >
                                    Cadastrar Comprador
                                </a>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-slate-800 font-bold mb-4">Cadastrar Produto</h2>
                                <p className="text-slate-600 mb-4">Registre um novo produto no sistema.</p>
                                <a 
                                    href="/cadastrar-produto" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                                >
                                    Cadastrar Produto
                                </a>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-slate-800 font-bold mb-4">Ver Comprador</h2>
                                <p className="text-slate-600 mb-4">Veja os compradores no sistema.</p>
                                <a 
                                    href="/listar-compradores" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                                >
                                    Ver Compradores
                                </a>
                            </div>
                            <div className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center">
                                <h2 className="text-slate-800 font-bold mb-4">Ver Produto</h2>
                                <p className="text-slate-600 mb-4">Veja os produtos no sistema.</p>
                                <a 
                                    href="/listar-produtos" 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
                                >
                                    Ver Produtos
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;