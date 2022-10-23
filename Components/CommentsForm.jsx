import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";
const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSucessMessage, setShowSucessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("nome");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handlecomentariosubmission = () => {
    setError(false);
    const { value: comentario } = commentEl.current;
    const { value: nome } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comentario || !nome || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      nome,
      email,
      comentario,
      slug,
    };
    if (storeData) {
      window.localStorage.setItem("nome", nome);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("nome", nome);
      window.localStorage.removeItem("email", email);
    }
    submitComment(commentObj).then((res) => {
      setShowSucessMessage(true);
      setTimeout(() => {
        setShowSucessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Comentários:</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-200 text-gray-700"
          placeholder="Commentario"
          name="comentarios"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-300 text-gray-700"
          placeholder="Nome"
          name="nome"
        />
        <input
          type="text"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-400 bg-gray-300 text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">Preencha todos os campos.</p>
      )}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlecomentariosubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-purple-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Comentar
        </button>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <input
              ref={storeDataEl}
              type="checkbox"
              id="storeData"
              name="storeData"
              value={true}
            />
            <label
              className="text-gray-500 cursos-pointer ml-2"
              htmlFor="storeData"
            >
              Manter dados para o próximo comentario
            </label>
          </div>
        </div>
        {showSucessMessage && (
          <span className="text-xs float-right font-semibold mt-3 text-green-500">
            Comentário enviado para review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
