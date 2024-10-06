export default(member)=>{
  
  return `
    
    <meta charset="UTF-8">
    <title>Leave Report</title>
    <style>
      /* Style for header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #88AED0;
        flex-direction: row;
      }
      
      /* Style for school logo */
      .logo {
        height: 200px;
        margin-right: 10px;
      }
      
      /* Style for school details */
      .details {
        text-align: right;
        margin-left: auto;
        color : white;
      }
      
      .detailscontact{
      	text-align: left;
      	margin-left: 255px;
      }
      
      /* Style for principle signature box */
      .signature-box {
        border: 1px solid black;
        height: 100px;
        width: 200px;
        margin-top: 30px;
        margin-left: auto;
        margin-right: 0;
        padding: 10px;
        float: right;
      }
      
      /* Style for topic */
      .topic {
        text-align: center;
        font-size: 24px;
        margin-top: 40px;
        margin-bottom: 20px;
      }
      
      /* Style for table */
      table {
        border-collapse: collapse;
        width: 100%;
        font-size: 12px;
        margin-top: 100px;
      }
      
      th, td {
        text-align: left;
        padding: 8px;
        border: 1px solid #ddd;
      }
      
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      
      th {
        background-color: #88AED0;
        color: white;
      }
      
      /* Style for page break */
      .page-break {
        page-break-after: always;
      }
    </style>
  </head>
  <body>
        
      </div>
    </div>
    <h1 class="topic">All users</h1>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>
      </thead>
  
      <tbody>
      ${member.map((per) => {
         return(
          `
          <tr>
          <td>${per.firstName}</td>
          <td>${per.email}</td>
          <td>${per.phoneNumber}</td>
        </tr>

          `
         )
      })}
     
      
    </tbody>
    
      </table>
      <footer>
        <p></p>
      </footer>
    </body>
  </html>

    
    `




}