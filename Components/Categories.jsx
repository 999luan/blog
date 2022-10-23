import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";
const Categories = () => {
  const [categorias, setcategorias] = useState([]);

  useEffect(() => {
    getCategories().then((novaCategoria) => setcategorias(novaCategoria));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categorias</h3>
      {categorias.map((categoria) => (
        <Link key={categoria.slug} href={`/categoria/${categoria.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            {categoria.nome}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
