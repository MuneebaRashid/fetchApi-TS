import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";

const Index = () => {
  const [apiData, setApiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchApis = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log("API call succeeded");
        setApiData(res.data);
      })
      .catch((error) => {
        console.log("API call failed", error);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    fetchApis();
  }, []);
  return (
    <div className={styles.tables}>
      <h2 className={styles.heading}>Products</h2>
      {apiData && apiData.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">category</th>
              <th scope="col">price</th>
              <th scope="col">pics</th>
            </tr>
          </thead>
          {apiData.map((items: { id: number; category: string; description: string; price: number; image: string }) => {
            return (
              <tbody key={items.id}>
                <tr>
                  <td>{items.id}</td>
                  <td>{items.category}</td>
                  <td>{items.price}</td>
                  <td>
                    <img src={items.image} className={styles.images} alt="" />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>

      ) : (
        !errorMessage && <div className="spinner-border mt-5" style={{width: "6rem", height: "6rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      )}
      {errorMessage && <h2 className={styles.error}>{errorMessage}</h2>}

    </div>
  );
};

export default Index;