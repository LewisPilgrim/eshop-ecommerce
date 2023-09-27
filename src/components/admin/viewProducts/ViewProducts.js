import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import {
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts,
} from "../../../redux/features/productsSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Search from "../../search/Search";
import { FILTER_BY_SEARCH, selectFilteredProducts } from "../../../redux/features/filterSlice";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("")
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts)
  
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }))
  }, [dispatch, products, search])

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = () => {
  //   setIsLoading(true);

  //   try {
  //     const productsRef = collection(db, "products");

  //     const q = query(productsRef, orderBy("createdAt", "desc"));

  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(STORE_PRODUCTS({
  //         products: allProducts
  //       }))
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product?",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete cancelled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>
        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color='green' />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color='red'
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
      </div>
    </>
  );
};

export default ViewProducts;
