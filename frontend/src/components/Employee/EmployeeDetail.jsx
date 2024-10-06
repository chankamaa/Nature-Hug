import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDetail.css'; // CSS file to style the page
import FinanceSidebar from '../finance/FinanceSidebar';
import DashboardNavbar from './DashboardNavbar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import autoTable
import { toast } from 'react-toastify';
import natureHugLogo from '../../../public/nature-hug-logo-base64';

const EmployeeDetail = () => {
  const { id } = useParams(); // Get employee ID from the URL
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To track edit mode

  useEffect(() => {
    // Fetch the specific employee details by ID
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/employees/${id}`, employee);
      setIsEditing(false);
      toast.success('Employee details updated successfully.');
    } catch (error) {
      console.error('Error updating employee details:', error);
      toast.error('Failed to update employee details.');
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.addImage(natureHugLogo, 'PNG', 10, 10, 30, 30);
    doc.setFontSize(18);
    doc.text('NATURE HUG', 50, 15);
    doc.setFontSize(12);
    doc.text('Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.', 50, 25);
    doc.text('Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337', 50, 30);
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 160, 20);
    doc.setFontSize(16);
    doc.text(`Employee Details for ${employee.fullName}`, 14, 50);
    autoTable(doc, {
      startY: 60,
      head: [['Field', 'Value']],
      body: [
        ['Name', employee.fullName],
        ['Email', employee.email],
        ['Position', employee.position],
        ['Department', employee.department],
        ['Birthday', new Date(employee.birthday).toLocaleDateString()],
        ['NIC Number', employee.NICNumber],
      ],
    });
    doc.save(`employee-details-${employee.fullName}.pdf`);
  };

  const handleCreatePayslip = () => {
    const doc = new jsPDF();
    doc.addImage(natureHugLogo, 'PNG', 10, 10, 30, 30);
    doc.setFontSize(18);
    doc.text('NATURE HUG', 50, 15);
    doc.setFontSize(12);
    doc.text('Address: 54A, Ihala Vitiyala, Karagoda-Uyangoda, Matara.', 50, 25);
    doc.text('Email: handamama.pvt@gmail.com | Phone: +94 76 258 2337', 50, 30);
    const today = new Date().toLocaleDateString();
    doc.text(`Date: ${today}`, 160, 20);
    doc.setFontSize(16);
    doc.text('Payslip', 105, 50, null, null, 'center');
    const netSalary = employee.totalSalary - employee.totalDeductions;
    autoTable(doc, {
      startY: 60,
      head: [['Field', 'Amount']],
      body: [
        ['Employee Name', employee.fullName],
        ['Basic Salary', `Rs.${employee.basicSalary?.toLocaleString()}`],
        ['Allowances', `Rs.${employee.allowances?.toLocaleString()}`],
        ['APIT', `(Rs.${employee.apit?.toLocaleString()})`],
        ['EPF', `(Rs.${employee.epfEmployee?.toLocaleString()})`],
        ['Total Deductions', `(Rs.${employee.totalDeductions?.toLocaleString()})`],
        ['Net Salary', `Rs.${employee.totalSalary?.toLocaleString()}`],
      ],
    });
    const payslipText = `
      Dear ${employee.fullName},

      Here is your payslip for the month:

      - Basic Salary: Rs.${employee.basicSalary?.toLocaleString()}
      - Allowances: Rs.${employee.allowances?.toLocaleString()}
      - APIT: (Rs.${employee.apit?.toLocaleString()})
      - EPF: (Rs.${employee.epfEmployee?.toLocaleString()})
      - Total Deductions: (Rs.${employee.totalDeductions?.toLocaleString()})
      - Net Salary: Rs.${employee.totalSalary?.toLocaleString()}

      Best regards,
      Nature Hug Team
    `;
    axios
      .post('http://localhost:4000/api/send-email', {
        to: employee.email,
        subject: `Your Payslip for ${today} from Nature Hug`,
        text: payslipText,
      })
      .then(() => {
        toast.success(`Payslip created and sent to ${employee.email}`);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error('Error sending payslip');
      });
    doc.save(`payslip-${employee.fullName}.pdf`);
  };

  if (!employee) {
    return <p>Loading employee details...</p>;
  }

  return (
    <div className="employee-detail-container">
      <FinanceSidebar />
      <DashboardNavbar />
      <div className="employee-detail-content">
        <br /><br /><br />
        <h1 className="text-center">Employee Details</h1>
        <div className="detail-wrapper">
          {/* Personal Details */}
          <div className="employee-box">
            <div className="employee-box-header personal-header">Personal Details</div>
            <div className="employee-box-body">
              {isEditing ? (
                <>
                  <div className="employee-row">
                    <p className="employee-label"><strong>Name:</strong></p>
                    <input type="text" value={employee.fullName} onChange={(e) => setEmployee({ ...employee, fullName: e.target.value })} />
                  </div>
                  <hr />
                  <div className="employee-row">
                    <p className="employee-label"><strong>Email:</strong></p>
                    <input type="text" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                  </div>
                    <hr />
                  <div className="employee-row">
                    <p className="employee-label"><strong>Phone Number:</strong></p>
                    <input type="text" value={employee.phoneNumber} onChange={(e) => setEmployee({ ...employee, phoneNumber: e.target.value })} />
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Position:</strong></p>
                        <input type="text" value={employee.position} onChange={(e) => setEmployee({ ...employee, position: e.target.value })} />
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Department:</strong></p>
                        <input type="text" value={employee.department} onChange={(e) => setEmployee({ ...employee, department: e.target.value })} />
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Birthday:</strong></p>
                        <input type="date" value={employee.birthday} onChange={(e) => setEmployee({ ...employee, birthday: e.target.value })} />
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>NIC Number:</strong></p>
                        <input type="text" value={employee.NICNumber} onChange={(e) => setEmployee({ ...employee, NICNumber: e.target.value })} />
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Joining Date:</strong></p>
                        <input type="date" value={employee.joiningDate} onChange={(e) => setEmployee({ ...employee, joiningDate: e.target.value })} />
                    </div>
                    <hr />

                  <button onClick={handleSave} className="btn-emp-save">Save</button>
                </>
              ) : (
                <>
                  <div className="employee-row">
                    <p className="employee-label"><strong>Name:</strong></p>
                    <p>{employee.fullName}</p>
                  </div>
                    <hr />
                  <div className="employee-row">
                    <p className="employee-label"><strong>Email:</strong></p>
                    <p>{employee.email}</p>
                  </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Phone Number:</strong></p>
                        <p>{employee.phoneNumber}</p>
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Position:</strong></p>
                        <p>{employee.position}</p>
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Department:</strong></p>
                        <p>{employee.department}</p>
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Birthday:</strong></p>
                        <p>{new Date(employee.birthday).toLocaleDateString()}</p>
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>NIC Number:</strong></p>
                        <p>{employee.NICNumber}</p>
                    </div>
                    <hr />
                    <div className="employee-row">
                        <p className="employee-label"><strong>Joining Date:</strong></p>
                        <p>{new Date(employee.joiningDate).toLocaleDateString()}</p>
                    </div>
                    <hr />

                  <button onClick={handleEdit} className="btn-emp-edit">Edit</button>
                </>
              )}
            </div>
          </div>
          <br />
          <br />

          {/* Salary Details */}
          <div className="employee-box">
            <div className="employee-box-header salary-header">Salary Details</div>
            <div className="employee-box-body">
              <div className="employee-row">
                <p className="employee-label"><strong>Basic Salary:</strong></p>
                <p>Rs.{employee.basicSalary?.toLocaleString()}</p>
              </div>
              <hr />
              <div className="employee-row">
                <p className="employee-label"><strong>Allowances:</strong></p>
                <p>Rs.{employee.allowances?.toLocaleString()}</p>
              </div>
                <hr />
              <div className="employee-row deduction-css">
                <p className="employee-label"><strong>APIT:</strong></p>
                <p>Rs.{employee.apit?.toLocaleString()}</p>
              </div>
              <hr />
              <div className="employee-row deduction-css">
                <p className="employee-label"><strong>EPF:</strong></p>
                <p>Rs.{employee.epfEmployee?.toLocaleString()}</p>
              </div>
              <hr />
              <div className="employee-row deduction-css">
                <p className="employee-label"><strong>Total Deductions:</strong></p>
                <p>Rs.{employee.totalDeductions?.toLocaleString()}</p>
              </div>
              <hr />
              <div className="employee-row">
                <p className="employee-label"><strong>Total Salary:</strong></p>
                <p>Rs.{employee.totalSalary?.toLocaleString()}</p>
              </div>
              <hr />
            </div>
          </div>

          {/* Buttons */}
          <div className="buttons-slr">
            <button onClick={handleDownloadPDF}>Download PDF</button>
            <button onClick={handleCreatePayslip}>Create Payslip</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
