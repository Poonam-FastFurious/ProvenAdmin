/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../config";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [user, setUser] = useState([]);
  const [usercount, setusercount] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch the products from the API
    fetch(Baseurl + "/api/v1/Product/products")
      .then((responce) => responce.json())
      .then((data) => setProducts(data.data));
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetching(true);

        //order fetch
        const response = await fetch(Baseurl + "/api/v1/order/allorder");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data.data);
        setOrdersCount(data.data.length);
        //userfetch
        const responseuser = await fetch(Baseurl + "/api/v1/user/alluser");
        if (!responseuser.ok) {
          throw new Error(`HTTP error! status: ${responseuser.status}`);
        }
        const user = await responseuser.json();
        setUser(user.data);
        setusercount(user.data.length);
      } catch (err) {
        throw (new Error("data not fetch "), err);
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(fetching);
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <div className="row mb-3 pb-1">
                    <div className="col-12">
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <h4 className="fs-16 mb-1">Good Morning, Admin!</h4>
                          <p className="text-muted mb-0">
                            Here's what's happening with your store today.
                          </p>
                        </div>
                        <div className="mt-3 mt-lg-0">
                          <form>
                            <div className="row g-3 mb-0 align-items-center">
                              <div className="col-sm-auto">
                                <div className="input-group">
                                  <input
                                    type="date"
                                    className="form-control border-0 dash-filter-picker shadow"
                                    data-provider="flatpickr"
                                    data-range-date="true"
                                    data-date-format="d M, Y"
                                    data-deafult-date="01 Jan 2022 to 31 Jan 2022"
                                  />
                                  <div className="input-group-text bg-primary border-primary text-white">
                                    <i className="ri-calendar-2-line"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Total Sales
                              </p>
                            </div>
                            <div className="flex-shrink-0"></div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="559.25"
                                >
                                  0
                                </span>
                                k
                              </h4>
                              <Link
                                to=""
                                className="text-decoration-underline "
                                style={{ visibility: "hidden" }}
                              >
                                View net earnings
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-success-subtle rounded fs-3">
                                <i className="bx bx-dollar-circle text-success"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Orders
                              </p>
                            </div>
                            <div className="flex-shrink-0"></div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="36894"
                                >
                                  {ordersCount}
                                </span>
                              </h4>
                              <Link
                                to=""
                                className="text-decoration-underline"
                                style={{ visibility: "hidden" }}
                              >
                                View all orders
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-info-subtle rounded fs-3">
                                <i className="bx bx-shopping-bag text-info"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Customers
                              </p>
                            </div>
                            <div className="flex-shrink-0"></div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                <span
                                  className="counter-value"
                                  data-target="183.35"
                                >
                                  {usercount}
                                </span>
                                M
                              </h4>
                              <Link
                                to=""
                                className="text-decoration-underline"
                                style={{ visibility: "hidden" }}
                              >
                                See details
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-warning-subtle rounded fs-3">
                                <i className="bx bx-user-circle text-warning"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                My Balance
                              </p>
                            </div>
                            <div className="flex-shrink-0"></div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                $
                                <span
                                  className="counter-value"
                                  data-target="165.89"
                                >
                                  0
                                </span>
                                k
                              </h4>
                              <Link
                                to=""
                                className="text-decoration-underline  "
                                style={{ visibility: "hidden" }}
                              >
                                Withdraw money
                              </Link>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-primary-subtle rounded fs-3">
                                <i className="bx bx-wallet text-primary"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header border-0 align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Recent Order
                          </h4>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                              <thead className="text-muted table-light">
                                <tr>
                                  <th scope="col">Order ID</th>
                                  <th scope="col">Customer</th>
                                  <th scope="col">Product</th>
                                  <th scope="col">Amount</th>

                                  <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders.slice(0, 6).map((order) => (
                                  <tr key={order.id}>
                                    <td>
                                      <Link
                                        to="#"
                                        className="fw-medium link-primary"
                                      >
                                        #{order.orderID}
                                      </Link>
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-2"></div>
                                        <div className="flex-grow-1">
                                          {order.customer.fullName}
                                        </div>
                                      </div>
                                    </td>
                                    <td>{order.customer.fullName}</td>
                                    <td>
                                      <span className="text-success">
                                        Rs{order.totalAmount}
                                      </span>
                                    </td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          order.paymentStatus === "Paid"
                                            ? "bg-success-subtle text-success"
                                            : order.paymentStatus === "Pending"
                                            ? "bg-warning-subtle text-warning"
                                            : "bg-danger-subtle text-danger"
                                        }`}
                                      >
                                        {order.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Best Selling Products
                          </h4>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                              <tbody>
                                {products.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <div className="avatar-sm bg-light rounded p-1 me-2">
                                          <img
                                            src={item.image}
                                            alt=""
                                            className="img-fluid d-block"
                                          />
                                        </div>
                                        <div>
                                          <h5 className="fs-14 my-1">
                                            <Link
                                              to={`/product/${item._id}`}
                                              className="text-reset text-truncate"
                                            >
                                              {item.title}
                                            </Link>
                                          </h5>
                                          <span className="text-muted">
                                            {item.categories}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <h5 className="fs-14 my-1 fw-normal">
                                        ₹{item.price}
                                      </h5>
                                      <span className="text-muted">Price</span>
                                    </td>
                                    <td>
                                      <h5 className="fs-14 my-1 fw-normal">
                                        62
                                      </h5>
                                      <span className="text-muted">Orders</span>
                                    </td>
                                    <td>
                                      <h5 className="fs-14 my-1 fw-normal">
                                        {item.stocks}
                                      </h5>
                                      <span className="text-muted">Stock</span>
                                    </td>
                                    <td>
                                      <h5 className="fs-14 my-1 fw-normal">
                                        {item.discount}%
                                      </h5>
                                      <span className="text-muted">
                                        Discount
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Recent User
                          </h4>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                              <thead className="text-muted table-light">
                                <tr>
                                  <th scope="col">Customer</th>
                                  <th scope="col">email</th>
                                  <th scope="col">mobile</th>
                                  <th scope="col">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {user.slice(0, 8).map((user) => (
                                  <tr key={user._id}>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                      {new Date(
                                        user.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
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

export default Dashboard;
