// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Baseurl } from "../../../config";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Addblogs() {
//   const [thumbnail, setThumbnail] = useState(null);
//   const [gallery, setGallery] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [author, setAuthor] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const handleThumbnailChange = (e) => {
//     setThumbnail(e.target.files[0]);
//   };

//   const handleGalleryChange = (e) => {
//     setGallery([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("thumbnail", thumbnail);
//     formData.append("title", title);
//     formData.append("content", content);
//     formData.append("author", author);

//     for (let i = 0; i < gallery.length; i++) {
//       formData.append("gallery", gallery[i]);
//     }

//     setLoading(true); // Start loader

//     try {
//       const response = await fetch(Baseurl + "/api/v1/blog/add", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();

//       if (data.success) {
//         toast.success("Blog post added successfully", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           onClose: () => {
//             // Clear the form
//             setTitle("");
//             setThumbnail(null);
//             setGallery([]);
//             setContent("");
//             setAuthor("");

//             navigate("/Bloges");
//           },
//         });
//       } else {
//         throw new Error("Blog post creation failed");
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//       toast.error("Blog post creation failed", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     } finally {
//       setLoading(false); // Stop loader
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="main-content">
//         <div className="page-content">
//           <div className="col-xl-12 col-lg-8">
//             <div>
//               <div className="card">
//                 <div className="card-header border-0">
//                   <div className="row g-4">
//                     <div className="col-sm-auto ">
//                       <div>
//                         <Link to="/add-blog" className="btn" id="addblog-btn">
//                           Add Blog
//                         </Link>
//                       </div>
//                     </div>
//                     <div className="col-sm">
//                       <div className="d-flex justify-content-sm-end">
//                         <div className="search-box ms-2">
//                           <Link
//                             onClick={handleGoBack}
//                             to="/blogs"
//                             className="btn btn-success"
//                             id="back-btn"
//                           >
//                             <i className="align-bottom me-1"></i> Back
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div style={{ backgroundColor: "white" }}>
//             <form
//               onSubmit={handleSubmit}
//               style={{
//                 paddingLeft: "50px",
//                 paddingRight: "50px",
//                 height: "auto",
//                 paddingBottom: "40px",
//               }}
//             >
//               <div className="row" style={{ paddingTop: "10px" }}>
//                 <div className="col-lg-6">
//                   <div className="card">
//                     <div className="card-header">
//                       <h4 className="card-title mb-0">Blog Thumbnail</h4>
//                     </div>

//                     <div className="card-body">
//                       <input
//                         type="file"
//                         className="form-control"
//                         name="thumbnail"
//                         onChange={handleThumbnailChange}
//                       />
//                     </div>
//                   </div>
//                   {thumbnail && (
//                     <ul className="list-unstyled mb-0" id="thumbnail-preview">
//                       <li className="mt-2" id="thumbnail-preview-list">
//                         <div className="border rounded">
//                           <div className="d-flex p-2">
//                             <div className="flex-shrink-0 me-3">
//                               <div className="avatar-sm bg-light rounded">
//                                 <img
//                                   src={URL.createObjectURL(thumbnail)}
//                                   alt="Selected"
//                                   style={{
//                                     width: "300px",
//                                     height: "auto",
//                                   }}
//                                   className="img-fluid rounded d-block"
//                                 />
//                               </div>
//                             </div>
//                             <div className="flex-grow-1">
//                               <div className="pt-1">
//                                 <h5 className="fs-14 mb-1" data-dz-name="">
//                                   &nbsp;
//                                 </h5>
//                                 <p
//                                   className="fs-13 text-muted mb-0"
//                                   data-dz-size=""
//                                 ></p>
//                                 <strong
//                                   className="error text-danger"
//                                   data-dz-errormessage=""
//                                 ></strong>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                   )}
//                 </div>
//               </div>

//               <div className="row mt-3">
//                 <div className="col-lg-12">
//                   <div className="card">
//                     <div className="card-header">
//                       <h4 className="card-title mb-0">Gallery Images</h4>
//                     </div>
//                     <div className="card-body">
//                       <input
//                         type="file"
//                         className="form-control"
//                         name="gallery"
//                         multiple
//                         onChange={handleGalleryChange}
//                       />
//                     </div>
//                   </div>
//                   {gallery.length > 0 && (
//                     <ul className="list-unstyled mb-0" id="gallery-preview">
//                       {gallery.map((image, index) => (
//                         <li
//                           key={index}
//                           className="mt-2"
//                           id="gallery-preview-list"
//                         >
//                           <div className="border rounded">
//                             <div className="d-flex p-2">
//                               <div className="flex-shrink-0 me-3">
//                                 <div className="avatar-sm bg-light rounded">
//                                   <img
//                                     src={URL.createObjectURL(image)}
//                                     alt="Selected"
//                                     style={{
//                                       width: "300px",
//                                       height: "auto",
//                                     }}
//                                     className="img-fluid rounded d-block"
//                                   />
//                                 </div>
//                               </div>
//                               <div className="flex-grow-1">
//                                 <div className="pt-1">
//                                   <h5 className="fs-14 mb-1" data-dz-name="">
//                                     &nbsp;
//                                   </h5>
//                                   <p
//                                     className="fs-13 text-muted mb-0"
//                                     data-dz-size=""
//                                   ></p>
//                                   <strong
//                                     className="error text-danger"
//                                     data-dz-errormessage=""
//                                   ></strong>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3 mt-3">
//                 <label htmlFor="title" className="form-label">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="content" className="form-label">
//                   Content
//                 </label>
//                 <textarea
//                   className="form-control"
//                   id="content"
//                   rows="8"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                 ></textarea>
//               </div>

//               <div className="mb-3">
//                 <label htmlFor="author" className="form-label">
//                   Author
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="author"
//                   value={author}
//                   onChange={(e) => setAuthor(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {loading && (
//                   <span className="spinner-border spinner-border-sm me-1"></span>
//                 )}
//                 {loading ? "Loading..." : "Submit"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Addblogs;
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Baseurl } from "../../../config";


function Addblogs() {
  const [image, setImage] = useState(null);
  const [thumbnail, setthumbnail] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target.result;
        img.onload = () => {
          if (img.width !== 920 || img.height !== 613) {
            setImageError("The image must be 920x613 pixels.");
            setImage(null); // Clear the image if it doesn't meet the requirement
          } else {
            setImage(file);
            setImageError(""); // Clear any previous errors
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e) => {
    setthumbnail([...e.target.files]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("author", author);

    if (image) formData.append("image", image);
    thumbnail.forEach((file) => formData.append("thumbnail", file));

    try {
      const response = await fetch(Baseurl + "/api/v1/blog/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add blog");
      }

      const data = await response.json();
      // Handle success (e.g., show a success message, redirect, etc.)
      console.log("Blog added successfully:", data);
      toast.success("Blog added successfully!");
      // Clear form fields
      setTitle("");
      setContent("");
      setDescription("");
      setTags("");
      setCategory("");
      setAuthor("");
      setImage(null);
      setthumbnail([]);
      setImageError("");
      // Redirect to blog list page
      navigate("/Bloges");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error adding blog:", error);
    } finally {
      setLoading(false);
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
                  <h4 className="mb-sm-0">Create Blogpost</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">Proven Ro</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Create Blog Post
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <form
              id="createproduct-form"
              autoComplete="off"
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-lg-12 p-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Blogs Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formAction"
                          value={title}
                          placeholder="Enter blog title"
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />

                        <div className="invalid-feedback">
                          Please Enter a product title.
                        </div>
                      </div>
                      <div>
                        <label>Blogs Content</label>

                        <CKEditor
                          editor={ClassicEditor}
                          data={content}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Blogs Gallery</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Main Image</h5>

                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
                              <label
                                htmlFor="product-image-input"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Image"
                              >
                                <div className="avatar-xs">
                                  <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                    <i className="ri-image-fill"></i>
                                  </div>
                                </div>
                              </label>
                              <input
                                className="form-control d-none"
                                value=""
                                id="product-image-input"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImageChange}
                              />
                            </div>
                            {imageError && (
                              <div className="text-danger mt-2">
                                {imageError}
                              </div>
                            )}
                            {image && (
                              <ul
                                className="list-unstyled mb-0"
                                id="dropzone-preview"
                              >
                                <li className="mt-2" id="dropzone-preview-list">
                                  <div className="border rounded">
                                    <div className="d-flex p-2">
                                      <div className="flex-shrink-0 me-3">
                                        <div className="avatar-sm bg-light rounded">
                                          <img
                                            src={URL.createObjectURL(image)}
                                            alt="Selected"
                                            style={{
                                              width: "300px",
                                              height: "auto",
                                            }}
                                            className="img-fluid rounded d-block"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex-grow-1">
                                        <div className="pt-1">
                                          <h5
                                            className="fs-14 mb-1"
                                            data-dz-name=""
                                          >
                                            &nbsp;
                                          </h5>
                                          <p
                                            className="fs-13 text-muted mb-0"
                                            data-dz-size=""
                                          ></p>
                                          <strong
                                            className="error text-danger"
                                            data-dz-errormessage=""
                                          ></strong>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Blogs Thumbnail</h5>

                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
                              <label
                                htmlFor="product-thumbnail-input"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Image"
                              >
                                <div className="avatar-xs">
                                  <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                    <i className="ri-image-fill"></i>
                                  </div>
                                </div>
                              </label>
                              <input
                                className="form-control d-none"
                                id="product-thumbnail-input"
                                type="file"
                                multiple
                                onChange={handleGalleryChange}
                              />
                            </div>

                            {thumbnail.length > 0 && (
                              <ul
                                className="list-unstyled mb-0  d-flex"
                                id="gallery-preview"
                              >
                                {thumbnail.map((file, index) => (
                                  <li
                                    key={index}
                                    className="mt-2"
                                    id="gallery-preview-list"
                                  >
                                    <div className="border rounded">
                                      <div className="d-flex p-2">
                                        <div className="flex-shrink-0 me-3">
                                          {file.type.startsWith("image/") ? ( // Check if file is an image
                                            <div className="avatar-sm bg-light rounded">
                                              <img
                                                src={URL.createObjectURL(file)}
                                                alt="Selected"
                                                style={{
                                                  width: "300px",
                                                  height: "auto",
                                                }}
                                                className="img-fluid rounded d-block"
                                              />
                                            </div>
                                          ) : file.type.startsWith("video/") ? ( // Check if file is a video
                                            <div className="video-container">
                                              <video
                                                controls
                                                className="img-fluid rounded d-block"
                                                style={{
                                                  width: "300px",
                                                  height: "auto",
                                                }}
                                              >
                                                <source
                                                  src={URL.createObjectURL(
                                                    file
                                                  )}
                                                  type={file.type}
                                                />
                                                Your browser does not support
                                                the video tag.
                                              </video>
                                            </div>
                                          ) : (
                                            <div className="avatar-sm bg-light rounded">
                                              <p>
                                                Unsupported file format:{" "}
                                                {file.type}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <ul
                        className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#addproduct-general-info"
                            role="tab"
                          >
                            More Info
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="addproduct-general-info"
                          role="tabpanel"
                        >
                          <div className="row">
                            <div className="col-lg-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturer-name-input"
                                >
                                  Blogs category
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="manufacturer-name-input"
                                  placeholder="Enter manufacturer name"
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturer-brand-input"
                                >
                                  Author
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="manufacturer-brand-input"
                                  value={author}
                                  placeholder="Enter author name"
                                  onChange={(e) => setAuthor(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturer-brand-input"
                                >
                                  Blogs tag
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="manufacturer-brand-input"
                                  value={tags}
                                  placeholder="Enter blog tags"
                                  onChange={(e) => setTags(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-3">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="manufacturer-brand-input"
                                >
                                  Short Description
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="manufacturer-brand-input"
                                  value={description}
                                  placeholder="Enter short description"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-end mb-3">
                    <button type="submit" className="btn btn-success w-sm">
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addblogs;