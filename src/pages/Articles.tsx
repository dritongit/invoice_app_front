import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Articles = () => {
  const context = useContext(AppContext);

  if (!context) return <p>Loading...</p>;
  const { articles } = context;

  return (
    <div>
      <h2>Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
