/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";  // Importing jspdf-autotable for generating PDFs
import { saveAs } from "file-saver";  // Importing file-saver to save files
import axios from "axios";  // Importing axios for making HTTP requests
import Swal from "sweetalert2";  // Importing SweetAlert2 for alert dialogs
import './usertable.css'

const UserTable = () => {
    const [members, setMembers] = useState([]);

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

    const onDelete = (id) => {
        axios.delete(`http://localhost:4000/NatureHug/user/delete-user/${id}`).then((res) => {
            setMembers(members.filter(member => member._id !== id));
        }).catch((err) => {
            alert(err.message);
        });
    };

    const handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
        axios.get("http://localhost:4000/NatureHug/user/all-users").then((res) => {
            if (res.data) {
                const filteredMembers = res.data.filter((member) =>
                    member.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
                    member.phoneNumber.toString().includes(searchKey)
                );
                setMembers(filteredMembers);
            }
        }).catch((err) => {
            alert(err.message);
        });
    };

    const genaratepdf = () => {
        const doc = new jsPDF();
        doc.text("User Table Report", 14, 16);

        const tableColumn = ["#", "Name", "Email", "Contact Number"];
        const tableRows = [];

        members.forEach((member, index) => {
            const memberData = [
                index + 1,
                member.firstName,
                member.email,
                member.phoneNumber,
            ];
            tableRows.push(memberData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("UserTableReport.pdf");
    };

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
                                            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                                        }
                                    });
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
