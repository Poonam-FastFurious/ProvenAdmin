import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Swal from "sweetalert2";
import { Baseurl } from "../../config";
import axios from "axios";

function StoreLocation() {
  const statesWithCities = [
    {
      state: "Andhra Pradesh",
      cities: [
        "Adoni",
        "Amaravati",
        "Anantapur",
        "Chandragiri",
        "Chittoor",
        "Dowlaiswaram",
        "Eluru",
        "Guntur",
        "Kadapa",
        "Kakinada",
        "Kurnool",
        "Machilipatnam",
        "Nagarjunakoṇḍa",
        "Rajahmundry",
        "Srikakulam",
        "Tirupati",
        "Vijayawada",
        "Visakhapatnam",
        "Vizianagaram",
        "Yemmiganur",
      ],
    },
    {
      state: "Arunachal Pradesh",
      cities: ["Itanagar"],
    },
    {
      state: "Assam",
      cities: [
        "Dhuburi",
        "Dibrugarh",
        "Dispur",
        "Guwahati",
        "Jorhat",
        "Nagaon",
        "Sivasagar",
        "Silchar",
        "Tezpur",
        "Tinsukia",
      ],
    },
    {
      state: "Bihar",
      cities: [
        "Ara",
        "Barauni",
        "Begusarai",
        "Bettiah",
        "Bhagalpur",
        "Bihar Sharif",
        "Bodh Gaya",
        "Buxar",
        "Chapra",
        "Darbhanga",
        "Dehri",
        "Dinapur Nizamat",
        "Gaya",
        "Hajipur",
        "Jamalpur",
        "Katihar",
        "Madhubani",
        "Motihari",
        "Munger",
        "Muzaffarpur",
        "Patna",
        "Purnia",
        "Pusa",
        "Saharsa",
        "Samastipur",
        "Sasaram",
        "Sitamarhi",
        "Siwan",
      ],
    },
    {
      state: "Chandigarh (union territory)",
      cities: ["Chandigarh"],
    },
    {
      state: "Chattisgarh",
      cities: [
        "Ambikapur",
        "Bhilai",
        "Bilaspur",
        "Dhamtari",
        "Durg",
        "Jagdalpur",
        "Raigarh",
        "Rajnandgaon",
      ],
    },
    {
      state: "Dadra and Nagar Haveli and Daman and Diu (union territory)",
      cities: ["Daman", "Diu", "Silvassa"],
    },
    {
      state: "Delhi",
      cities: ["Delhi", "New Delhi"],
    },
    {
      state: "Goa",
      cities: ["Madgaon", "Panaji"],
    },
    {
      state: "Gujarat",
      cities: [
        "Ahmadabad",
        "Amreli",
        "Bharuch",
        "Bhavnagar",
        "Bhuj",
        "Dwarka",
        "Gandhinagar",
        "Godhra",
        "Jamnagar",
        "Junagadh",
        "Kandla",
        "Khambhat",
        "Kheda",
        "Mahesana",
        "Morbi",
        "Nadiad",
        "Navsari",
        "Okha",
        "Palanpur",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Surat",
        "Surendranagar",
        "Valsad",
        "Veraval",
      ],
    },
    {
      state: "Haryana",
      cities: [
        "Ambala",
        "Bhiwani",
        "Chandigarh",
        "Faridabad",
        "Firozpur Jhirka",
        "Gurugram",
        "Hansi",
        "Hisar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Panipat",
        "Pehowa",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
      ],
    },
    {
      state: "Himachal Pradesh",
      cities: [
        "Bilaspur",
        "Chamba",
        "Dalhousie",
        "Dharmshala",
        "Hamirpur",
        "Kangra",
        "Kullu",
        "Mandi",
        "Nahan",
        "Shimla",
        "Una",
      ],
    },
    {
      state: "Jammu and Kashmir",
      cities: [
        "Anantnag",
        "Baramula",
        "Doda",
        "Gulmarg",
        "Jammu",
        "Kathua",
        "Punch",
        "Rajouri",
        "Srinagar",
        "Udhampur",
      ],
    },
    {
      state: "Jharkhand",
      cities: [
        "Bokaro",
        "Chaibasa",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "Giridih",
        "Hazaribag",
        "Jamshedpur",
        "Jharia",
        "Rajmahal",
        "Ranchi",
        "Saraikela",
      ],
    },
    {
      state: "Karnataka",
      cities: [
        "Badami",
        "Ballari",
        "Bengaluru",
        "Belagavi",
        "Bhadravati",
        "Bidar",
        "Chikkamagaluru",
        "Chitradurga",
        "Davangere",
        "Halebid",
        "Hassan",
        "Hubballi-Dharwad",
        "Kalaburagi",
        "Kolar",
        "Madikeri",
        "Mandya",
        "Mangaluru",
        "Mysuru",
        "Raichur",
        "Shivamogga",
        "Shravanabelagola",
        "Shrirangapattana",
        "Tumakuru",
        "Vijayapura",
      ],
    },
    {
      state: "Kerala",
      cities: [
        "Alappuzha",
        "Vatakara",
        "Idukki",
        "Kannur",
        "Kochi",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Mattancheri",
        "Palakkad",
        "Thalassery",
        "Thiruvananthapuram",
        "Thrissur",
      ],
    },
    {
      state: "Ladakh",
      cities: ["Kargil", "Leh"],
    },
    {
      state: "Madhya Pradesh",
      cities: [
        "Balaghat",
        "Barwani",
        "Betul",
        "Bharhut",
        "Bhind",
        "Bhojpur",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dr. Ambedkar Nagar (Mhow)",
        "Guna",
        "Gwalior",
        "Hoshangabad",
        "Indore",
        "Itarsi",
        "Jabalpur",
        "Jhabua",
        "Khajuraho",
        "Khandwa",
        "Khargone",
        "Maheshwar",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Murwara",
        "Narsimhapur",
        "Narsinghgarh",
        "Narwar",
        "Neemuch",
        "Nowgong",
        "Orchha",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Sarangpur",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Ujjain",
        "Vidisha",
      ],
    },
    {
      state: "Maharashtra",
      cities: [
        "Ahmadnagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Bhandara",
        "Bhusawal",
        "Bid",
        "Buldhana",
        "Chandrapur",
        "Daulatabad",
        "Dhule",
        "Jalgaon",
        "Kalyan",
        "Karli",
        "Kolhapur",
        "Mahabaleshwar",
        "Malegaon",
        "Matheran",
        "Mumbai",
        "Nagpur",
        "New Mumbai",
        "Nanded",
        "Nashik",
        "Osmanabad",
        "Pandharpur",
        "Parbhani",
        "Pune",
        "Ratnagiri",
        "Raigarh",
        "Sangli",
        "Satara",
        "Sevagram",
        "Solapur",
        "Thane",
        "Ulhasnagar",
        "Vasai-Virar",
        "Wardha",
        "Yavatmal",
      ],
    },
    {
      state: "Manipur",
      cities: ["Imphal"],
    },
    {
      state: "Meghalaya",
      cities: ["Cherrapunji", "Shillong"],
    },
    {
      state: "Mizoram",
      cities: ["Aizawl", "Lunglei"],
    },
    {
      state: "Nagaland",
      cities: ["Kohima", "Mon", "Phek", "Wokha", "Zunheboto"],
    },
    {
      state: "Odisha",
      cities: [
        "Balangir",
        "Baleshwar",
        "Baripada",
        "Bhubaneshwar",
        "Brahmapur",
        "Cuttack",
        "Dhenkanal",
        "Kendujhar",
        "Konark",
        "Koraput",
        "Paradip",
        "Phulabani",
        "Puri",
        "Sambalpur",
        "Udayagiri",
      ],
    },
    {
      state: "Puducherry",
      cities: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
    },
    {
      state: "Punjab",
      cities: [
        "Amritsar",
        "Batala",
        "Chandigarh",
        "Faridkot",
        "Firozpur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Nabha",
        "Patiala",
        "Rupnagar",
        "Sangrur",
      ],
    },
    {
      state: "Rajasthan",
      cities: [
        "Abu",
        "Ajmer",
        "Alwar",
        "Amer",
        "Barmer",
        "Beawar",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittaurgarh",
        "Churu",
        "Dhaulpur",
        "Dungarpur",
        "Ganganagar",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalor",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Kishangarh",
        "Kota",
        "Merta",
        "Nagaur",
        "Nathdwara",
        "Pali",
        "Phalodi",
        "Pushkar",
        "Sawai Madhopur",
        "Shahpura",
        "Sikar",
        "Sirohi",
        "Tonk",
        "Udaipur",
      ],
    },
    {
      state: "Sikkim",
      cities: ["Gangtok", "Gyalshing", "Lachung", "Mangan"],
    },
    {
      state: "Tamil Nadu",
      cities: [
        "Arcot",
        "Chengalpattu",
        "Chennai",
        "Chidambaram",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kanchipuram",
        "Kanniyakumari",
        "Kodaikanal",
        "Kumbakonam",
        "Madurai",
        "Mamallapuram",
        "Nagappattinam",
        "Nagercoil",
        "Palayamkottai",
        "Pudukkottai",
        "Rajapalayam",
        "Ramanathapuram",
        "Salem",
        "Thanjavur",
        "Tiruchchirappalli",
        "Tirunelveli",
        "Tiruppur",
        "Thoothukudi",
        "Udhagamandalam",
        "Vellore",
      ],
    },
    {
      state: "Telangana",
      cities: [
        "Hyderabad",
        "Karimnagar",
        "Khammam",
        "Mahbubnagar",
        "Nizamabad",
        "Sangareddi",
        "Warangal",
      ],
    },
    {
      state: "Tripura",
      cities: ["Agartala"],
    },
    {
      state: "Uttar Pradesh",
      cities: [
        "Agra",
        "Aligarh",
        "Amroha",
        "Ayodhya",
        "Azamgarh",
        "Bahraich",
        "Ballia",
        "Banda",
        "Bara Banki",
        "Bareilly",
        "Basti",
        "Bijnor",
        "Bithur",
        "Budaun",
        "Bulandshahr",
        "Deoria",
        "Etah",
        "Etawah",
        "Faizabad",
        "Farrukhabad-cum-Fatehgarh",
        "Fatehpur",
        "Fatehpur Sikri",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur",
        "Lakhimpur",
        "Lalitpur",
        "Lucknow",
        "Mainpuri",
        "Mathura",
        "Meerut",
        "Mirzapur-Vindhyachal",
        "Moradabad",
        "Muzaffarnagar",
        "Partapgarh",
        "Pilibhit",
        "Prayagraj",
        "Rae Bareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Shahjahanpur",
        "Sitapur",
        "Sultanpur",
        "Tehri",
        "Varanasi",
      ],
    },
    {
      state: "Uttarakhand",
      cities: [
        "Almora",
        "DehraDun",
        "Haridwar",
        "Mussoorie",
        "Nainital",
        "Pithoragarh",
      ],
    },
    {
      state: "West Bengal",
      cities: [
        "Alipore",
        "Alipur Duar",
        "Asansol",
        "Baharampur",
        "Bally",
        "Balurghat",
        "Bankura",
        "Baranagar",
        "Barasat",
        "Barrackpore",
        "Basirhat",
        "Bhatpara",
        "Bishnupur",
        "Budge Budge",
        "Burdwan",
        "Chandernagore",
        "Darjeeling",
        "Diamond Harbour",
        "Dum Dum",
        "Durgapur",
        "Halisahar",
        "Haora",
        "Hugli",
        "Ingraj Bazar",
        "Jalpaiguri",
        "Kalimpong",
        "Kamarhati",
        "Kanchrapara",
        "Kharagpur",
        "Cooch Behar",
        "Kolkata",
        "Krishnanagar",
        "Malda",
        "Midnapore",
        "Murshidabad",
        "Nabadwip",
        "Palashi",
        "Panihati",
        "Purulia",
        "Raiganj",
        "Santipur",
        "Shantiniketan",
        "Shrirampur",
        "Siliguri",
        "Siuri",
        "Tamluk",
        "Titagarh",
      ],
    },
  ];

  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(""); // New state for selected city
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("");
  // Handle state selection
  const handleStateChange = (e) => {
    const selected = e.target.value;
    setSelectedState(selected);

    // Find the corresponding cities for the selected state
    const stateData = statesWithCities.find(
      (state) => state.state === selected
    );
    if (stateData) {
      setCities(stateData.cities);
      setSelectedCity(""); // Reset city when state changes
    } else {
      setCities([]);
      setSelectedCity(""); // Reset city if no state is selected
    }
  };

  // Handle city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await fetch(Baseurl + "/api/v1/Storelocation");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBanners(data.data); // Assuming data is an array of banner objects
      setFilteredBanners(data.data); // Initialize filteredBanners with all banners initially
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      state: selectedState,
      cityName: selectedCity,
      Name: name,
      phone: phone,
      addressDetails: address,
      alternatePhone: alternatePhone,
    };

    try {
      const response = await axios.post(
        Baseurl + "/api/v1/Storelocation/add",
        data
      );
      console.log("Store location added:", response.data);

      const modalElement = document.getElementById("showModal");
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      modal.hide();
      toast.success("🦄 Store location added successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Close modal or reset form if needed
    } catch (error) {
      console.error("Error adding store location:", error);
      alert("Failed to add store location");
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${Baseurl}/api/v1/Storelocation/delete`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id }),
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete banner");
          }
          setBanners(banners.filter((banner) => banner._id !== id));
          setFilteredBanners(
            filteredBanners.filter((banner) => banner._id !== id)
          );
          Swal.fire("Deleted!", "Your banner has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting banner:", error);
          Swal.fire(
            "Error!",
            "Failed to delete banner. Please try again.",
            "error"
          );
        }
      }
    });
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredBanners = banners.filter((banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanners(filteredBanners);
    setCurrentPage(1); // Reset to first page when searching
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchData();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBanners.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Add Store Location</h4>

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
                          </div>
                        </div>
                        <div class="col-sm">
                          <div class="d-flex justify-content-sm-end">
                            <div class="search-box ms-2">
                              <input
                                type="text"
                                class="form-control search"
                                placeholder="Search..."
                                onChange={handleSearch}
                                value={searchTerm}
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
                              <th class="sort" data-sort="customer_name">
                                State
                              </th>

                              <th class="sort" data-sort="phone">
                                Cities
                              </th>

                              <th class="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody class="list form-check-all">
                            {currentItems.map((stateItem, stateIndex) =>
                              stateItem.cities.map((cityItem, cityIndex) =>
                                cityItem.addresses.map(
                                  (addressItem, addressIndex) => (
                                    <tr
                                      key={`${stateIndex}-${cityIndex}-${addressIndex}`}
                                    >
                                      {/* State Column */}
                                      <td class="email">{stateItem.state}</td>

                                      {/* City Column */}
                                      <td class="phone">{cityItem.name}</td>

                                      {/* Address Column */}
                                      <td class="address">
                                        <p>
                                          <strong>{addressItem.name}</strong>
                                          <br />
                                          Phone: {addressItem.phone}
                                          <br />
                                          {addressItem.alternatePhone && (
                                            <>
                                              Alternate Phone:{" "}
                                              {addressItem.alternatePhone}
                                              <br />
                                            </>
                                          )}
                                          Address: {addressItem.address}
                                        </p>
                                      </td>

                                      {/* Action Column */}
                                      <td>
                                        <div class="d-flex gap-2">
                                          <div class="edit"></div>
                                          <div class="remove">
                                            <button
                                              class="btn btn-sm btn-danger remove-item-btn"
                                              onClick={() =>
                                                handleDelete(addressItem._id)
                                              }
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )
                              )
                            )}
                          </tbody>
                        </table>
                        {filteredBanners.length === 0 && (
                          <div className="noresult">
                            <div className="text-center">
                              <lord-icon
                                src="../../../msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We've searched more than 150+ Orders. We did not
                                find any banners matching your search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <nav>
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 1 && "disabled"
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                              >
                                Previous
                              </button>
                            </li>
                            {Array.from(
                              {
                                length: Math.ceil(
                                  filteredBanners.length / itemsPerPage
                                ),
                              },
                              (_, i) => (
                                <li
                                  key={i}
                                  className={`page-item ${
                                    currentPage === i + 1 && "active"
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => paginate(i + 1)}
                                  >
                                    {i + 1}
                                  </button>
                                </li>
                              )
                            )}
                            <li
                              className={`page-item ${
                                currentPage ===
                                  Math.ceil(
                                    filteredBanners.length / itemsPerPage
                                  ) && "disabled"
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
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
                    Add Store Location
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
                      <label htmlFor="status-field" className="form-label">
                        State
                      </label>
                      <select
                        value={selectedState}
                        onChange={handleStateChange}
                        className="form-control"
                        name="status"
                        id=""
                        required
                      >
                        <option value="">Select State</option>
                        {statesWithCities.map((stateObj, index) => (
                          <option key={index} value={stateObj.state}>
                            {stateObj.state}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select a Status
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="type-field" className="form-label">
                        City
                      </label>
                      <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        className="form-control"
                        name="type"
                        id="type"
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-feedback">
                        Please select a Type
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="title-field" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="title-field"
                        className="form-control"
                        placeholder="Enter Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a Title
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details-field" className="form-label">
                        Number
                      </label>
                      <input
                        type="text"
                        id="details-field"
                        className="form-control"
                        placeholder="Enter Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        name="details"
                        maxLength={10}
                      />
                      <div className="invalid-feedback">
                        Please enter Details
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details-field" className="form-label">
                        Alternate Number
                      </label>
                      <input
                        type="text"
                        id="details-field"
                        className="form-control"
                        placeholder="Enter Number"
                        value={alternatePhone}
                        onChange={(e) => setAlternatePhone(e.target.value)}
                        name="details"
                        maxLength={10}
                      />
                      <div className="invalid-feedback">
                        Please enter Details
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link-field" className="form-label">
                        Address
                      </label>
                      <textarea
                        type="text"
                        id="link-field"
                        className="form-control"
                        placeholder="Enter Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a Link
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
                        Add Store Location
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

export default StoreLocation;
