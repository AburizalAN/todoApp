import styles from '../../styles/Navbar.module.scss';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';



const Navbar = ({setNavHeight}) => {

  const ref = useRef();

  const location = useLocation();

  const { pathname } = location;

  const [ sideNavToggle, setSideNavToggle ] = useState(false);

  useEffect(() => {
    const navHeight = ref?.current?.clientHeight;

    if (navHeight) {
      setNavHeight(navHeight);
    }
  }, [ref])

  return (
    <nav ref={ref} className={`${styles.navbar} fixed-top navbar navbar-expand-lg navbar-dark`}>
      <div className="container">
        <a className="navbar-brand">My App</a>
        <button onClick={() => setSideNavToggle(!sideNavToggle)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/">
              <a className={`nav-link ${pathname === "/" ? "active" : null}`} aria-current="page">Home</a>
            </Link>
            <Link to="/blog"> 
              <a className={`nav-link ${pathname === "/blog" ? "active" : null}`}>Blog</a>
            </Link>
            <Link to="/maps"> 
              <a className={`nav-link ${pathname === "/maps" ? "active" : null}`}>maps</a>
            </Link>
          </div>
        </div>

        <div className={`${!sideNavToggle ? styles.close : null} ${styles.sideNav}`}>
          <Link to="/">
            <a className={`nav-link ${pathname === "/" ? "active" : null}`} aria-current="page">Home</a>
          </Link>
          <Link to="/blog"> 
            <a className={`nav-link ${pathname === "/blog" ? "active" : null}`}>Blog</a>
          </Link>
          <Link to="/maps"> 
            <a className={`nav-link ${pathname === "/maps" ? "active" : null}`}>maps</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;