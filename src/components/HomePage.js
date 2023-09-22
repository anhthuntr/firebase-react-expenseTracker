import React, { useEffect } from 'react';
import './HomePage.css'; // Import a CSS file for styling

function HomePage() {

  return (
    <div className="home-page-container">
      <h1>Welcome to Your Budget Tracker!</h1>
      <p>Keep track of your expenses with us.</p>
      <div className="home-page-buttons">
        <a href="/signin">Log in</a>
        <a href="/signup">Sign up</a>
      </div>

    </div>
  );
}

export default HomePage;
