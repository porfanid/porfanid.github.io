// src/components/Tabs.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // <-- Import NavLink

// Το component δέχεται τα tabs και το τρέχον path (αν και το NavLink το χειρίζεται αυτόματα)
function Tabs({ tabs }) {
  return (
    <div>
      {tabs.map(tab => (
        <NavLink
          key={tab.id}
          element={<button/>}
          // To NavLink χρησιμοποιεί το `to` prop για το path (π.χ., '#/projects')
          // Το `end` prop είναι σημαντικό για το root path ('/') ώστε να μην είναι active και στα άλλα paths
          to={tab.path}
          // Η class 'active' προστίθεται αυτόματα από το NavLink όταν το path ταιριάζει
          className={({ isActive }) =>
            `main-tab-button ${isActive ? 'active' : ''}`
          }
          end={tab.path === '/'} // Σημαντικό για το root path
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

export default Tabs;
