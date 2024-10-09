import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../../config";
import * as XLSX from "xlsx"; // Import xlsx for Excel file generation

function Searchdata() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch inquiries from the API
    fetch(Baseurl + "/api/v1/serach/search-data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInquiries(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load inquiries. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Function to download data as CSV
  const downloadCSV = () => {
    const csvRows = [];
    // Get the headers
    const headers = ["SearchName", "Date"];
    csvRows.push(headers.join(","));
    // Format data into rows
    inquiries.forEach((inquiry) => {
      const row = [
        inquiry.searchParam,
        new Date(inquiry.createdAt).toLocaleDateString(),
      ];
      csvRows.push(row.join(","));
    });
    // Create a blob and download the file
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "inquiries.csv");
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Function to download data as Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      inquiries.map((inquiry) => ({
        SearchName: inquiry.searchParam,
        Date: new Date(inquiry.createdAt).toLocaleDateString(),
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inquiries");
    XLSX.writeFile(wb, "inquiries.xlsx");
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Searchdata</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="">Proven Ro</Link>
                    </li>
                    <li className="breadcrumb-item active">Searchdata</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card" id="orderList">
                <div className="card-header border-0">
                  <div className="row align-items-center gy-3">
                    <div className="col-sm">
                      <h5 className="card-title mb-0">Searchdata</h5>
                    </div>
                    <div className="col-sm-auto">
                      <div className="d-flex gap-1 flex-wrap">
                        <button
                          className="btn btn-soft-danger"
                          id="remove-actions"
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={downloadCSV}
                        >
                          Download CSV
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={downloadExcel}
                        >
                          Download Excel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-2"
                  style={{ marginTop: "25px", backgroundColor: "white" }}
                >
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <>
                      <table className="table table-striped align-middle table-nowrap mb-0">
                        <thead>
                          <tr>
                            <th scope="col">SearchName</th>
                            <th scope="col">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.length === 0 ? (
                            <tr>
                              <td colSpan="6" className="text-center">
                                <div className="noresult">
                                  <div className="text-center">
                                    <lord-icon
                                      src="../../../msoeawqm.json"
                                      trigger="loop"
                                      colors="primary:#121331,secondary:#08a88a"
                                      style={{ width: "75px", height: "75px" }}
                                    ></lord-icon>
                                    <h5 className="mt-2">
                                      Sorry! No Result Found
                                    </h5>
                                    <p className="text-muted mb-0">
                                      We've searched more than 150+ customers.
                                      We did not find any customer for your
                                      search.
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            inquiries.map((inquiry) => (
                              <tr key={inquiry._id}>
                                <td>{inquiry.searchParam}</td>
                                <td>
                                  {new Date(
                                    inquiry.createdAt
                                  ).toLocaleDateString()}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchdata;
