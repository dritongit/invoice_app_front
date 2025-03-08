import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import ArticleModal from "../components/ArticleModal";

const Articles = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);

  if (!context) return <p>Loading...</p>;
  const { articles } = context;

  return (
    <div>
      <h2>Articles</h2>
      <button onClick={() => setModalOpen(true)}>+ Add Contact</button>
      <div className="tab-content">
              <table>
                  <thead>
                      <tr>
                          <th>Item</th>
                          <th>Taxed</th>
                          <th>Rate %</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                          <th>Tax</th>
                      </tr>
                  </thead>
                  <tbody>
                  {articles && articles.length > 0 ? (
                    articles.map((article) => (
                      <tr key={article.article_id}>
                        <td>{article.name}</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>{article.unit_price}</td>
                        <td>1</td>
                        <td>1</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "10px" }}>
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
          </div>
          <ArticleModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Articles;
