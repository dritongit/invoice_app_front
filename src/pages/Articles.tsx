import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Articles = () => {
  const context = useContext(AppContext);

  if (!context) return <p>Loading...</p>;
  const { articles } = context;

  return (
    <div>
      <h2>Articles</h2>
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
                            {articles.map((article) => (
                                <tr key={article.article_id}>
                                  <td>{article.name}</td>7
                                  <td>1</td>
                                  <td>1</td>
                                  <td>1</td>
                                  {/* <td><input type="checkbox" /></td> */}
                                  <td>{article.unit_price}</td>
                                  <td>1</td>
                                  <td>1</td>
                                </tr>
                              ))}
                            <tr>
                                <td>Birra Peja</td>
                                <td><input type="checkbox" /></td>
                                <td>18.00</td>
                                <td>1</td>
                                <td>12.00</td>
                                <td>12.00</td>
                                <td>12.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    </div>
  );
};

export default Articles;
