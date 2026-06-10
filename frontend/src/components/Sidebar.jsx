import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Role access map:
//   admin       → everything
//   manager     → everything except Users management
//   staff       → Dashboard, Inventory, StockIn, StockOut, Alerts, Report, Settings
//   storekeeper → Dashboard, StockIn, StockOut, Alerts, Settings
const allNavItems = [
  { to: '/',          label: 'Dashboard',  icon: '', roles: ['admin','manager','staff','storekeeper'] },
  { to: '/inventory', label: 'Inventory',  icon: '', roles: ['admin','manager','staff','storekeeper'] },
  { to: '/stockin',   label: 'Stock In',   icon: '', roles: ['admin','manager','staff','storekeeper'] },
  { to: '/stockout',  label: 'Stock Out',  icon: '', roles: ['admin','manager','staff','storekeeper'] },
  { to: '/alerts',    label: 'Alerts',     icon: '', roles: ['admin','manager','staff','storekeeper'] },
  { to: '/items',     label: 'Products',   icon: '', roles: ['admin','manager'] },
  { to: '/suppliers', label: 'Suppliers',  icon: '', roles: ['admin','manager'] },
  { to: '/users',     label: 'Users',      icon: '', roles: ['admin'] },
  { to: '/report',    label: 'Report',     icon: '', roles: ['admin','manager','staff'] },
  { to: '/settings',  label: 'Settings',   icon: '', roles: ['admin','manager','staff','storekeeper'] },
];

const roleColors = {
  admin:       '#1e40af',
  manager:     '#6b21a8',
  staff:       '#065f46',
  storekeeper: '#0b6177',
};

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = allNavItems.filter(item => item.roles.includes(user?.role));
  const roleColor = roleColors[user?.role] || '#64748b';
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : '';

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo">DAB</div>
          <div className="brand-text">
            <span className="brand-name">DAB Enterprise</span>
            <span className="brand-sub">Store Management</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="user-info">
            <div
              className="user-avatar"
              style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}cc)` }}
            >
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="user-name">{user?.username}</p>
              <p className="user-role" style={{ color: roleColor }}>{roleLabel}</p>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}> Logout</button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
