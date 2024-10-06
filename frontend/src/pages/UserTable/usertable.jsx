/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";  // Importing jspdf-autotable for generating PDFs
import { saveAs } from "file-saver";  // Importing file-saver to save files
import axios from "axios";  // Importing axios for making HTTP requests
import Swal from "sweetalert2";  // Importing SweetAlert2 for alert dialogs
import './usertable.css'
import { assets } from '../../assets/assets'; // Assuming you have assets imported correctly


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

    const generatePDF = () => {
        const doc = new jsPDF();

        // Header with logo, company details, and date
        const imgLogo = assets.logo; // Assuming logo is stored in assets
        const headerText = [
            "Nature Hug",
            "Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara",
            "Email: handamama.pvt@gmail.com",
            "Phone: +94 76 258 2337"
        ];
        const currentDate = new Date().toLocaleDateString(); // Get current date

        // Load logo
        doc.addImage(imgLogo, 'PNG', 10, 10, 30, 30); // Logo position (x, y) and size (width, height)
        
        // Add company details
        doc.setFontSize(12);
        headerText.forEach((line, index) => {
            doc.text(line, 50, 10 + (index * 5)); // Adjust position of text
        });

        // Add date
        doc.text(`Date: ${currentDate}`, 150, 10); // Date position

        // Title of the document
        doc.setFontSize(16);
        doc.text("User Table Report", 14, 60); // Adjusted Y position for the title

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

        // Add the user data table
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 70, // Start Y position for the table
        });

        // Save the PDF
        doc.save("UserTableReport.pdf");
    };

    return (
        <>
            <div className="pt-3" style={{ marginTop: "80px" }}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-icon" onChange={handleSearchArea} />
                </div>
            </div>

            <button type="submit" className="bbtn btn-primary" onClick={generatePDF} style={{ marginLeft: 10, marginBottom: 10, width: 200 }}>Generate Report</button>

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
