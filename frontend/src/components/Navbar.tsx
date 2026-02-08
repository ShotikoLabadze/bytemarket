import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
            </svg>
          </span>
          ByteMarket
        </Link>

        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search tech..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.navActions}>
          <Link to="/cart" className={styles.navLink}>
            <svg
              className={styles.navLinkIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className={styles.navLinkLabel}>Cart</span>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>

          {user ? (
            <div className={styles.authWrapper}>
              {user.isAdmin && (
                <Link to="/admin" className={styles.navLink}>
                  Admin
                </Link>
              )}
              <button onClick={logout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className={styles.navLink}>
              <svg
                className={styles.navLinkIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className={styles.navLinkLabel}>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
