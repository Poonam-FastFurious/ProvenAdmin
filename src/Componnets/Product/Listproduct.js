/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { Baseurl } from "../../config";

function Listproduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/Product/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.products); // Assuming data.products is correct
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/category/allcategory");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.data.slice(0, 5));
      } catch (err) {
        throw (new Error("data not fetch "), err);
      }
    };

    fetchCategory();
  }, []);
  const deleteProduct = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`${Baseurl}/api/v1/Product/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Update state after successful deletion
        setProducts(products.filter((product) => product._id !== id));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire("Error!", "Failed to delete the product.", "error");
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Products</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">Products</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex mb-3">
                      <div className="flex-grow-1">
                        <h5 className="fs-16">Filters</h5>
                      </div>
                      <div className="flex-shrink-0">
                        <Link
                          to="#"
                          className="text-decoration-underline"
                          id="clearall"
                        >
                          Clear All
                        </Link>
                      </div>
                    </div>

                    <div className="filter-choices-input">
                      <input
                        className="form-control"
                        data-choices=""
                        data-choices-removeitem=""
                        type="text"
                        id="filter-choices-input"
                      />
                    </div>
                  </div>

                  <div className="accordion accordion-flush filter-accordion">
                    <div className="card-body border-bottom">
                      <div>
                        <p className="text-muted text-uppercase fs-12 fw-medium mb-2">
                          Category
                        </p>
                        <ul className="list-unstyled mb-0 filter-list">
                          {categories.map((category, index) => (
                            <li key={index}>
                              <Link
                                to="#"
                                className="d-flex py-1 align-items-center"
                              >
                                <div className="flex-grow-1">
                                  <h5 className="fs-13 mb-0 listname">
                                    {category.categoriesTitle}
                                  </h5>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="card-body border-bottom">
                      <p className="text-muted text-uppercase fs-12 fw-medium mb-4">
                        Price
                      </p>

                      <input
                        type="range"
                        style={{ width: "100%", color: "#0AB39C" }}
                      ></input>
                      <div className="formCost d-flex gap-2 align-items-center mt-3">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          id="minCost"
                          value="0"
                        />
                        <span className="fw-semibold text-muted">to</span>{" "}
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          id="maxCost"
                          value="1000"
                        />
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="flush-headingDiscount"
                      >
                        <button
                          className="accordion-button bg-transparent shadow-none collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseDiscount"
                          aria-expanded="true"
                          aria-controls="flush-collapseDiscount"
                        >
                          <span className="text-muted text-uppercase fs-12 fw-medium">
                            Discount
                          </span>
                          <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                        </button>
                      </h2>
                      <div
                        id="flush-collapseDiscount"
                        className="accordion-collapse collapse show"
                        aria-labelledby="flush-headingDiscount"
                      >
                        <div className="accordion-body text-body pt-1">
                          <div className="d-flex flex-column gap-2 filter-check">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="50% or more"
                                id="productdiscountRadio6"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productdiscountRadio6"
                              >
                                50% or more
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="40% or more"
                                id="productdiscountRadio5"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productdiscountRadio5"
                              >
                                40% or more
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="30% or more"
                                id="productdiscountRadio4"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productdiscountRadio4"
                              >
                                30% or more
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="20% or more"
                                id="productdiscountRadio3"
                                checked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productdiscountRadio3"
                              >
                                20% or more
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="10% or more"
                                id="productdiscountRadio2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productdiscountRadio2"
                              >
                                10% or more
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="Less than 10%"
                                id="productdiscountRadio1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productdiscountRadio1"
                              >
                                Less than 10%
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="flush-headingRating">
                        <button
                          className="accordion-button bg-transparent shadow-none collapsed "
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseRating"
                          aria-expanded="false"
                          aria-controls="flush-collapseRating"
                        >
                          <span className="text-muted text-uppercase fs-12 fw-medium">
                            Rating
                          </span>{" "}
                          <span className="badge bg-success rounded-pill align-middle ms-1 filter-badge"></span>
                        </button>
                      </h2>

                      <div
                        id="flush-collapseRating"
                        className="accordion-collapse collapse show "
                        aria-labelledby="flush-headingRating"
                      >
                        <div className="accordion-body text-body">
                          <div className="d-flex flex-column gap-2 filter-check">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="4 & Above Star"
                                id="productratingRadio4"
                                checked=""
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productratingRadio4"
                              >
                                <span className="text-muted">
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star"></i>
                                </span>{" "}
                                4 & Above
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="3 & Above Star"
                                id="productratingRadio3"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productratingRadio3"
                              >
                                <span className="text-muted">
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star"></i>
                                  <i className="mdi mdi-star"></i>
                                </span>{" "}
                                3 & Above
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="2 & Above Star"
                                id="productratingRadio2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productratingRadio2"
                              >
                                <span className="text-muted">
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star"></i>
                                  <i className="mdi mdi-star"></i>
                                  <i className="mdi mdi-star"></i>
                                </span>{" "}
                                2 & Above
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value="1 Star"
                                id="productratingRadio1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="productratingRadio1"
                              >
                                <span className="text-muted">
                                  <i className="mdi mdi-star text-warning"></i>
                                  <i className="mdi mdi-star"></i>
                                  <i className="mdi mdi-star"></i>
                                  <i className="mdi mdi-star"></i>
                                  <i className="mdi mdi-star"></i>
                                </span>{" "}
                                1
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-9 col-lg-8">
                <div>
                  <div className="card">
                    <div className="card-header border-0">
                      <div className="row g-4">
                        <div className="col-sm-auto">
                          <div>
                            <Link
                              to="/AddProduct"
                              className="btn btn-success"
                              id="addproduct-btn"
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add Product
                            </Link>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="d-flex justify-content-sm-end">
                            <div className="search-box ms-2">
                              <input
                                type="text"
                                className="form-control"
                                id="searchProductList"
                                placeholder="Search Products..."
                              />
                              <i className="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <ul
                            className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <Link
                                className="nav-link active fw-semibold"
                                data-bs-toggle="tab"
                                to="#productnav-all"
                                role="tab"
                              >
                                All
                                <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                  12
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link fw-semibold"
                                data-bs-toggle="tab"
                                to="#productnav-published"
                                role="tab"
                              >
                                Active
                                <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                                  5
                                </span>
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className="nav-link fw-semibold"
                                data-bs-toggle="tab"
                                to="#productnav-draft"
                                role="tab"
                              >
                                InActive
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="col-auto">
                          <div id="selection-element">
                            <div className="my-n1 d-flex align-items-center text-muted">
                              Select
                              <div
                                id="select-content"
                                className="text-body fw-semibold px-1"
                              ></div>
                              Result
                              <button
                                type="button"
                                className="btn btn-link link-danger p-0 ms-3"
                                data-bs-toggle="modal"
                                data-bs-target="#removeItemModal"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="tab-content text-muted">
                        <div
                          className="tab-pane active"
                          id="productnav-all"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card">
                            <table className="table table-nowrap table-striped-columns mb-0">
                              <thead className="table-light">
                                <tr>
                                  <th scope="col">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="cardtableCheck"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="cardtableCheck"
                                      ></label>
                                    </div>
                                  </th>
                                  <th scope="col">Product</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Price</th>

                                  <th scope="col">Rating</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map((product, index) => (
                                  <tr key={index}>
                                    <td>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="cardtableCheck04"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="cardtableCheck04"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <Link
                                        to={`${product._id}`}
                                        className="fw-semibold"
                                      >
                                        {product.name}
                                        <br />
                                        Category :{product.category}
                                      </Link>
                                    </td>
                                    <td>{product.stock.quantity}</td>
                                    <td> Rs{product.price}</td>

                                    <td>{product.rating}</td>
                                    <td>
                                      <span className="badge bg-success">
                                        {product.visibility}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="hstack gap-3 flex-wrap">
                                        <Link
                                          to="#;"
                                          className="link-success fs-15"
                                        >
                                          <i className="ri-edit-2-line"></i>
                                        </Link>
                                        <Link
                                          to="#;"
                                          className="link-danger fs-15"
                                          onClick={() =>
                                            deleteProduct(product._id)
                                          }
                                        >
                                          <i className="ri-delete-bin-line"></i>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div
                          className="tab-pane"
                          id="productnav-published"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card">
                            <table className="table table-nowrap table-striped-columns mb-0">
                              <thead className="table-light">
                                <tr>
                                  <th scope="col">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="cardtableCheck"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="cardtableCheck"
                                      ></label>
                                    </div>
                                  </th>
                                  <th scope="col">Product</th>
                                  <th scope="col">Stock</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Orders</th>
                                  <th scope="col">Rating</th>
                                  <th scope="col">Publish</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {products.map((product, index) => (
                                  <tr key={index}>
                                    <td>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value=""
                                          id="cardtableCheck04"
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="cardtableCheck04"
                                        ></label>
                                      </div>
                                    </td>
                                    <td>
                                      <Link
                                        to={`${product._id}`}
                                        className="fw-semibold"
                                      >
                                        {product.name}
                                        <br />
                                        Category :{product.category}
                                      </Link>
                                    </td>
                                    <td>{product.stock.quantity}</td>
                                    <td> Rs{product.price}</td>

                                    <td>{product.rating}</td>
                                    <td>
                                      <span className="badge bg-success">
                                        {product.visibility}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="hstack gap-3 flex-wrap">
                                        <Link
                                          to="#;"
                                          className="link-success fs-15"
                                        >
                                          <i className="ri-edit-2-line"></i>
                                        </Link>
                                        <Link
                                          to="#;"
                                          className="link-danger fs-15"
                                          onClick={() =>
                                            deleteProduct(product._id)
                                          }
                                        >
                                          <i className="ri-delete-bin-line"></i>
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div
                          className="tab-pane"
                          id="productnav-draft"
                          role="tabpanel"
                        >
                          <div className="py-4 text-center">
                            <lord-icon
                              src="../../../msoeawqm.json"
                              trigger="loop"
                              colors="primary:#405189,secondary:#0ab39c"
                              style={{ width: "72px" }}
                            ></lord-icon>
                            <h5 className="mt-4">Sorry! No Result Found</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listproduct;
