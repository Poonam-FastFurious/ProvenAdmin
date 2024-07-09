import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../../config";

function Section2() {
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    link: "",
    status: "", // Assuming you need to add a field for status
    type: "2", // Assuming you need to add a field for type
    image: null,
  });
  const [banners, setBanners] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("details", formData.details);
    formPayload.append("link", formData.link);
    formPayload.append("status", formData.status);
    formPayload.append("type", formData.type);
    formPayload.append("image", formData.image);

    const requestOptions = {
      method: "POST",
      body: formPayload,
    };

    try {
      const response = await fetch(
        Baseurl + "/api/v1/Banner/add",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle success scenario

      setFormData({
        title: "",
        details: "",
        link: "",
        status: "",
        type: "",
        image: null,
      });
      // Close modal
      const modalElement = document.getElementById("showModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      toast.success("🦄 banner Added succsessfull!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("Failed to add banner. Please try again.");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          Baseurl + "/api/v1/Banner/allabnner?type=2"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBanners(data.data); // Assuming data is an array of banner objects
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Add Banner Section 2</h4>

                  <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li class="breadcrumb-item active">Add </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div class="listjs-table" id="customerList">
                      <div class="row g-4 mb-3">
                        <div class="col-sm-auto">
                          <div>
                            <button
                              type="button"
                              class="btn btn-success add-btn"
                              data-bs-toggle="modal"
                              id="create-btn"
                              data-bs-target="#showModal"
                            >
                              <i class="ri-add-line align-bottom me-1"></i> Add
                            </button>
                            <button
                              style={{ marginLeft: "10px" }}
                              class="btn btn-soft-danger"
                              onclick="deleteMultiple()"
                            >
                              <i class="ri-delete-bin-2-line"></i>
                            </button>
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="d-flex justify-content-sm-end">
                            <div class="search-box ms-2">
                              <input
                                type="text"
                                class="form-control search"
                                placeholder="Search..."
                              />
                              <i class="ri-search-line search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="table-responsive table-card mt-3 mb-1">
                        <table
                          class="table align-middle table-nowrap"
                          id="customerTable"
                        >
                          <thead class="table-light">
                            <tr>
                              <th scope="col" style={{ width: "50px;" }}>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th class="sort" data-sort="customer_name">
                                Image
                              </th>
                              <th class="sort" data-sort="email">
                                Title
                              </th>
                              <th class="sort" data-sort="phone">
                                Details
                              </th>
                              <th class="sort" data-sort="phone">
                                Place
                              </th>
                              <th class="sort" data-sort="date">
                                Link
                              </th>
                              <th class="sort" data-sort="status">
                                Status
                              </th>
                              <th class="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {banners.map((item, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td class="id" style={{ display: "none;" }}>
                                  <img
                                    src={item.image}
                                    alt=""
                                    className="avatar-xs rounded-circle"
                                  />
                                </td>
                                <td class="email">{item.title}</td>
                                <td class="email">{item.details}</td>
                                <td class="phone">Section 1</td>
                                <td class="date">{item.link}</td>
                                <td class="status">
                                  <span class="badge bg-success-subtle text-success text-uppercase">
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <button
                                        class="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#showModal"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div class="noresult" style={{ display: "none" }}>
                          <div class="text-center">
                            <lord-icon
                              src="../../../msoeawqm.json"
                              trigger="loop"
                              colors="primary:#121331,secondary:#08a88a"
                              style={{ width: "75px", height: "75px" }}
                            ></lord-icon>
                            <h5 class="mt-2">Sorry! No Result Found</h5>
                            <p class="text-muted mb-0">
                              We've searched more than 150+ Orders We did not
                              find any orders for you search.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex justify-content-end">
                        <div class="pagination-wrap hstack gap-2">
                          <Link
                            class="page-item pagination-prev disabled"
                            to="#"
                          >
                            Previous
                          </Link>
                          <ul class="pagination listjs-pagination mb-0"></ul>
                          <Link class="page-item pagination-next" to="#">
                            Next
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade zoomIn"
            id="deleteRecordModal"
            tabindex="-1"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="btn-close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="mt-2 text-center">
                    <RiDeleteBin6Line style={{ width: "100%" }} />
                    <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                      <h4>Are you Sure ?</h4>
                      <p class="text-muted mx-4 mb-0">
                        Are you Sure You want to Remove this Record ?
                      </p>
                    </div>
                  </div>
                  <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      class="btn w-sm btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn w-sm btn-danger"
                      id="delete-record"
                    >
                      Yes, Delete It!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="showModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-light p-3">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add BANNER
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  className="tablelist-form"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="title-field" className="form-label">
                        Banner Title
                      </label>
                      <input
                        type="text"
                        id="title-field"
                        className="form-control"
                        placeholder="Enter Title"
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a Title
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details-field" className="form-label">
                        Details
                      </label>
                      <input
                        type="text"
                        id="details-field"
                        className="form-control"
                        placeholder="Enter Details"
                        required
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter Details
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link-field" className="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="link-field"
                        className="form-control"
                        placeholder="Enter Link"
                        required
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please enter a Link
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="status-field" className="form-label">
                        Status
                      </label>
                      <select
                        className="form-control"
                        name="status"
                        id=""
                        required
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a Status
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type-field" className="form-label">
                        Place
                      </label>
                      <select
                        className="form-control"
                        name="type"
                        id="type"
                        required
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="">Select place</option>
                        <option value="2">Section 2</option>
                        {/* Add more options as needed */}
                      </select>
                      <div className="invalid-feedback">
                        Please select a Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image-field" className="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="image-field"
                        className="form-control"
                        required
                        name="image"
                        onChange={handleChange}
                      />
                      <div className="invalid-feedback">
                        Please select an Image
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        className="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="add-btn"
                      >
                        Add Banner
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section2;
