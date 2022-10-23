import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
const PostWidget = ({ categorias, slug }) => {
  const [relatedPosts, setrelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categorias, slug).then((result) =>
        setrelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setrelatedPosts(result));
    }
  }, [slug]);

  console.log(relatedPosts);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Posts Relacionados" : "Posts Recentes"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.titulo} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.titulo}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("DD/MM/YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              key={post.title}
              className="text-md"
            >
              {post.titulo}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
