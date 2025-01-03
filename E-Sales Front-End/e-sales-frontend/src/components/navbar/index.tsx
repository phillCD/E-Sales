import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [subMenuOpen, setSubMenuOpen] = useState<{ [key: string]: boolean }>({});

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = (menu: string) => {
        setSubMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="bg-gray-800 text-white">
            <div className="flex items-center justify-between p-4">
                <button onClick={toggleMenu} className="text-white text-2xl">
                    ☰
                </button>
                <a href="/">
                    <h1 className="text-2xl font-bold flex-grow text-center">E-Sales</h1>
                </a>
                <div className="w-8"></div> {/* Placeholder to balance the flex layout */}
            </div>
            <div className={`transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 bg-gray-700 p-4 absolute top-15 left-0 h-full w-64 opacity-90`}>
                <ul className="space-y-2">
                    <li className="hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => toggleSubMenu('produtos')}>
                        Produtos
                        {subMenuOpen['produtos'] && (
                            <ul className="pl-4 mt-2 space-y-2">
                                <li className="hover:bg-gray-500 p-2 rounded">
                                    <a href="/listar-produtos">
                                        Ver Produtos
                                    </a>
                                </li>
                                <li className="hover:bg-gray-500 p-2 rounded">
                                    <a href="/cadastrar-produto">
                                        Cadastrar Produtos
                                    </a>
                                </li>
                                <li className="hover:bg-gray-500 p-2 rounded">
                                    <a href="/importar-produto">
                                        Importar Produtos
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => toggleSubMenu('compradores')}>
                        Compradores
                        {subMenuOpen['compradores'] && (
                            <ul className="pl-4 mt-2 space-y-2">
                                <li className="hover:bg-gray-500 p-2 rounded">
                                    <a href="/listar-compradores">
                                        Ver Compradores
                                    </a>
                                </li>
                                <li className="hover:bg-gray-500 p-2 rounded">
                                    <a href="/cadastrar-comprador">
                                        Cadastrar Compradores
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="hover:bg-gray-600 p-2 rounded cursor-pointer" onClick={() => toggleSubMenu('compras')}>
                        Vendas
                        {subMenuOpen['compras'] && (
                            <ul className="pl-4 mt-2 space-y-2">
                                <li className="hover:bg-gray-500 p-2 rounded">
                                    <a href="/cadastrar-compra">
                                        Cadastrar Vendas
                                    </a>
                                </li>
                                <li className="hover:bg-gray-500 p-2 rounded">Sub-Vendas 2</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;