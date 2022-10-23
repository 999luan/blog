import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Header = () => {
  const [categorias, setcategorias] = useState([]);

  useEffect(() => {
    getCategories().then((novaCategoria) => setcategorias(novaCategoria));
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Fraternidade Amarela
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categorias.map((categoria) => (
            <Link key={categoria.slug} href={`/categorias/${categoria.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {categoria.nome}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
