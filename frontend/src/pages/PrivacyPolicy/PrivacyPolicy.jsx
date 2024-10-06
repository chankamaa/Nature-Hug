import React from 'react';
import './PrivacyPolicy.css'; // Import the CSS file



const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-heading">Nature Hug Privacy Policy</h1>
      <p className="last-updated">LAST UPDATED: September 23, 2024</p>
      
      <p className="privacy-intro">At Nature Hug, we take your privacy seriously. Please read this Privacy Policy to learn how we collect, use, and share your personal data. By using or accessing our Services, you acknowledge that you accept the practices outlined below and consent to the collection and use of your information.</p>
      
      <h2 className="privacy-subheading">1. Information We Collect</h2>
      <p className="privacy-text">We collect personal data such as name, email, contact information, and payment details when you interact with our services. This may include when you make purchases, sign up for our newsletter, or contact us.</p>
      
      <h2 className="privacy-subheading">2. How We Use Your Information</h2>
      <p className="privacy-text">We use your information to provide, maintain, and improve our services. This includes processing transactions, sending you updates and marketing materials, and analyzing website usage.</p>
      
      <h2 className="privacy-subheading">3. How We Share Your Information</h2>
      <p className="privacy-text">We share your information with the following categories of third parties:</p>
      
      <table className="privacy-table">
        <thead>
          <tr>
            <th>Category of Personal Data</th>
            <th>Examples of Personal Data</th>
            <th>Third Parties We Share With</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Profile or Contact Data</td>
            <td>Name, Email, Phone Number, Unique Identifiers</td>
            <td>Service Providers, Advertising Partners</td>
          </tr>
          <tr>
            <td>Payment Data</td>
            <td>Payment Card Type, Last 4 Digits, Billing Info</td>
            <td>Payment Processors (Stripe, PayPal)</td>
          </tr>
          <tr>
            <td>Commercial Data</td>
            <td>Purchase History, Consumer Profiles</td>
            <td>Service Providers, Analytics Partners</td>
          </tr>
          <tr>
            <td>Web Analytics</td>
            <td>IP Address, Browser Type</td>
            <td>Analytics Partners, Advertising Networks</td>
          </tr>
        </tbody>
      </table>

      <h2 className="privacy-subheading">4. How We Protect Your Data</h2>
      <p className="privacy-text">We employ industry-standard measures to safeguard your data. This includes encryption, secure servers, and regular audits.</p>

      <h2 className="privacy-subheading">5. Your Rights and Choices</h2>
      <p className="privacy-text">You have the right to request access to your personal data, request corrections, and opt-out of certain data collection practices.</p>
      
      <p className="privacy-conclusion">If you have any questions regarding our privacy practices, feel free to contact us at privacy@naturehug.com.</p>
    </div>
  );
};

export default PrivacyPolicy;
