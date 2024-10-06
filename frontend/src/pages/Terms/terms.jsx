import React from 'react';
import './Terms.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1 className="terms-heading">Terms and Conditions</h1>
      <p className="terms-intro">Welcome to Nature Hug! These terms and conditions outline the rules and regulations for the use of our website.</p>
      
      <h2 className="terms-subheading">1. Introduction</h2>
      <p className="terms-text">By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Nature Hug's website if you do not accept all of the terms and conditions stated on this page.</p>
      
      <h2 className="terms-subheading">2. Cookies</h2>
      <p className="terms-text">We employ the use of cookies. By using Nature Hug's website you consent to the use of cookies in accordance with our privacy policy.</p>
      
      <h2 className="terms-subheading">3. License</h2>
      <p className="terms-text">Unless otherwise stated, Nature Hug and/or its licensors own the intellectual property rights for all material on Nature Hug. All intellectual property rights are reserved.</p>
      
      <h2 className="terms-subheading">4. User Comments</h2>
      <p className="terms-text">Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material, and data ('Comments'). Nature Hug does not screen, edit, publish or review Comments prior to their appearance on the website.</p>
      
      <h2 className="terms-subheading">5. Hyperlinking</h2>
      <p className="terms-text">You may link to our homepage, publications, or other website information as long as the link: (a) is not misleading; (b) does not falsely imply sponsorship, endorsement, or approval; and (c) fits within the context of your site.</p>
      
      <h2 className="terms-subheading">6. Reservation of Rights</h2>
      <p className="terms-text">We reserve the right at any time to request that you remove all links or any particular link to our website. You agree to immediately remove all links to our website upon such a request.</p>
      
      <h2 className="terms-subheading">7. Disclaimer</h2>
      <p className="terms-text">To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website.</p>
      
      <p className="terms-conclusion">If you have any questions regarding our terms and conditions, please feel free to contact us at support@naturehug.com.</p>
    </div>
  );
};

export default Terms;
