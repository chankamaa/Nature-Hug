import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "jspdf-autotable";  // Importing jspdf-autotable for generating PDFs
import { saveAs } from "file-saver";  // Importing file-saver to save files
import axios from "axios";  // Importing axios for making HTTP requests
import Swal from "sweetalert2";  // Importing SweetAlert2 for alert dialogs
import './usertable.css'

const UserTable = () => {
    // State to store members data
    const [members, setMembers] = useState([]);

    // useEffect hook to fetch data when the component is mounted
    useEffect(() => {
        function getMembers() {
            axios.get(`http://localhost:4000/NatureHug/user/all-users`).then((res) => {
                setMembers(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getMembers();
    }, []);

    // Function to handle member deletion
    const onDelete = (id) => {
        axios.delete(`http://localhost:4000/NatureHug/user/delete-user/${id}`).then((res) => {
            // Remove the deleted member from the state
            setMembers(members.filter(member => member._id !== id));
        }).catch((err) => {
            alert(err.message);  // Handle error
        });
    }

    // Function to handle search input
    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:4000/NatureHug/user/all-users").then((res) => {
            if (res.data) {
                // Filter members based on search input
                const filteredMembers = res.data.filter((member) =>
                    member.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
                    member.phoneNumber.toString().includes(searchKey)
                );
                setMembers(filteredMembers);
            }
        }).catch((err) => {
            alert(err.message);  // Handle error
        })
    }

    // Function to generate a PDF report of all users
    const genaratepdf = async () => {
        await axios.post(`http://localhost:4000/NatureHug/documents/createpdf`, members).then((response) => {
            axios.get(`http://localhost:4000/NatureHug/documents/fetchpdf`, { responseType: 'blob' }).then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'allUserDoc.pdf');  // Save the PDF file
            })
        }).catch((err) => {
            alert(err.message);  // Handle error
        });
    }

    return (
        <>
            <div className="pt-3" style={{ marginTop: "80px" }}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-icon" onChange={handleSearchArea} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary" onClick={genaratepdf} style={{ marginLeft: 10, marginBottom: 10, width: 200 }}>Generate Report</button>

            <table className="table table-hover mx-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{member.firstName}</td>
                            <td>{member.email}</td>
                            <td>{member.phoneNumber}</td>
                            <td>
                                {/* Delete button with confirmation dialog */}
                                <Link to="#" className="btn btn-outline-danger btn-sm m-1" onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#dc3545',
                                        cancelButtonColor: '#6c757d',
                                        confirmButtonText: 'Yes, delete it!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            onDelete(member._id);
                                            Swal.fire(
                                                'Deleted!',
                                                'Your file has been deleted.',
                                                'success'
                                            )
                                        }
                                    })
                                }}>
                                    <i className="bi bi-trash3-fill"></i> Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default UserTable;
