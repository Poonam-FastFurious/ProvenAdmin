import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Baseurl } from "../../config";
import axios from "axios";
function Category() {
  const [categoriesTitle, setCategoriesTitle] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const clearForm = () => {
    setCategoriesTitle(""); // Clear the state for categoriesTitle
    setLink(""); // Clear the state for link
    setStatus(""); // Clear the state for status
    setImage(null); // Clear the state for image
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handelsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoriesTitle", categoriesTitle);
    formData.append("link", link);
    formData.append("status", status);

    formData.append("image", image);

    try {
      setLoading(true);
      const response = await fetch(Baseurl + "/api/v1/category/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Category added successfully ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            clearForm();
            window.location.reload();
          },
        });
      } else {
        throw new Error("category upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Banner upload failed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        Baseurl + `/api/v1/category/delete/?id=${id}`
      );
      if (response.data.success) {
        // Filter out the deleted category from the state
        setCategory(category.filter((cat) => cat._id !== id));
        toast.success("Category deleted successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            // Clear the form
            window.location.reload();
          },
        });
      } else {
        throw new Error(response.data.message); // Throw error with response message
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Failed to delete category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleDeleteConfirmation = () => {
    if (categoryToDelete) {
      handleDelete(categoryToDelete);
      setCategoryToDelete(null); // Reset categoryToDelete state after deletion
    }
  };
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          Baseurl + "/api/v1/category/allcategory"
        );
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchCategory();
  }, []);
  return (
    <>
      <ToastContainer />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Add category</h4>

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
                            {category.map((cat, index) => (
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

                                <td class="email">
                                  <img
                                    className="avatar-xs rounded-circle"
                                    src={cat.image}
                                    alt=""
                                  ></img>
                                </td>
                                <td class="phone">{cat.categoriesTitle}</td>
                                <td class="date">{cat.link}</td>
                                <td class="status">
                                  <span class="badge bg-success-subtle text-success text-uppercase">
                                    {cat.status}
                                  </span>
                                </td>
                                <td>
                                  <div class="d-flex gap-2">
                                    <div class="edit">
                                      <button
                                        class="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal"
                                      >
                                        Edit
                                      </button>
                                    </div>
                                    <div class="remove">
                                      <button
                                        class="btn btn-sm btn-danger remove-item-btn"
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteRecordModal"
                                        onClick={() =>
                                          setCategoryToDelete(cat._id)
                                        }
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
                      onClick={handleDeleteConfirmation}
                    >
                      Yes, Delete It!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="showModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-light p-3">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add category
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  class="tablelist-form"
                  autocomplete="off"
                  onSubmit={handelsubmit}
                >
                  <div class="modal-body">
                    <div class="mb-3" id="modal-id" style={{ display: "none" }}>
                      <label for="id-field" class="form-label">
                        ID
                      </label>
                      <input
                        type="text"
                        id="id-field"
                        class="form-control"
                        placeholder="ID"
                        readonly=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customername-field" class="form-label">
                        Categories Title
                      </label>
                      <input
                        type="text"
                        id="customername-field"
                        class="form-control"
                        placeholder="Enter Title"
                        required=""
                        onChange={(e) => setCategoriesTitle(e.target.value)}
                        value={categoriesTitle}
                      />
                      <div class="invalid-feedback">Please enter a Title</div>
                    </div>

                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="email-field"
                        class="form-control"
                        placeholder="Enter Link"
                        required=""
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>

                    <div class="mb-3">
                      <label for="phone-field" class="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="phone-field"
                        class="form-control"
                        placeholder="Enter Phone no."
                        required=""
                        onChange={handleImageChange}
                      />
                      <div class="invalid-feedback">Please enter a phone.</div>
                    </div>

                    <div>
                      <label for="status-field" class="form-label">
                        Status
                      </label>
                      <select
                        class="form-control"
                        data-trigger=""
                        name="status-field"
                        id="status-field"
                        required=""
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                      >
                        <option value="">Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Block</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        class="btn btn-success"
                        id="add-btn"
                      >
                        Add Categories
                      </button>
                    </div>
                    {loading && (
                      <div className="loader">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="editModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header bg-light p-3">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Upadte category
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form class="tablelist-form" autocomplete="off">
                  <div class="modal-body">
                    <div class="mb-3" id="modal-id">
                      <label for="id-field" class="form-label">
                        ID
                      </label>
                      <input
                        type="text"
                        id="id-field"
                        class="form-control"
                        placeholder="ID"
                        readonly=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customername-field" class="form-label">
                        Category Title
                      </label>
                      <input
                        type="text"
                        id="customername-field"
                        class="form-control"
                        placeholder="Enter Title"
                        required=""
                      />
                      <div class="invalid-feedback">Please enter a Title</div>
                    </div>

                    <div class="mb-3">
                      <label for="email-field" class="form-label">
                        Link
                      </label>
                      <input
                        type="email"
                        id="email-field"
                        class="form-control"
                        placeholder="Enter Link"
                        required=""
                      />
                      <div class="invalid-feedback">Please enter an Link.</div>
                    </div>

                    <div class="mb-3">
                      <label for="phone-field" class="form-label">
                        Image
                      </label>
                      <input
                        type="file"
                        id="phone-field"
                        class="form-control"
                        placeholder="Enter Phone no."
                        required=""
                      />
                      <div class="invalid-feedback">Please enter a Image</div>
                    </div>

                    <div>
                      <label for="status-field" class="form-label">
                        Status
                      </label>
                      <select
                        class="form-control"
                        data-trigger=""
                        name="status-field"
                        id="status-field"
                        required=""
                      >
                        <option value="">Status</option>
                        <option value="Active">Active</option>
                        <option value="Block">Block</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="hstack gap-2 justify-content-end">
                      <button
                        type="button"
                        class="btn btn-light"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>

                      <button
                        type="button"
                        class="btn btn-success"
                        id="edit-btn"
                      >
                        Update
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

export default Category;
