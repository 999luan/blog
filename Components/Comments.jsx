import React, { useEffect, useState } from "react";
import moment from "moment";
import parse from "html-react-parser";

import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => {
      setComentarios(result);
    });
  }, []);

  return (
    <>
      {comentarios.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comentarios.length} Commentarios
          </h3>
          {comentarios.map((comentarios, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comentarios.name}</span> em{" "}
                {moment(comentarios.createdAt).format("DD/MM/YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {parse(comentarios.comentario)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
