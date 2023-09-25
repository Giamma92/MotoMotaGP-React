import Icon from "../Icon";
import ResponsiveToggle from "../ResponsiveToggle";

function Navigation({children}: any) {
    return ( 
        <div id="main-navigation" className="is-desktop">
            <div className="desktop-menu">
                <nav>
                    <ul>
                        <li className="brand-logo">
                            <img src="assets/img/site-logo.svg" alt="logo" />
                        </li>
                        <>{children}</>
                        <li className="menu-item bottom-position">
                            <a href="/login/" id='logout-btn'>
                                <Icon icon="logout" />
                                <span className="sr-only">Logout</span>
                            </a>
                            </li>
                        <li className="menu-item bottom-position">
                            <a href="/settings/" className="logout-link">
                                <Icon icon="cog" />
                                <span className="sr-only">Settings</span>
                            </a>
                        </li>
                        <li className="menu-item bottom-position">
                            <button className="toggle-expanded-view" aria-expanded="false">
                                <Icon icon="chevron-double-right-line" />
                                <span className="sr-only">Expand menu</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="container mobile-menu padding-16">
                <a href="/">
                <img className="logo-mobile"
                    src="/assets/img/logo.svg"
                    alt="Your Logo"
                />
                </a>
                <ResponsiveToggle />
                <nav>
                <ul>
                    <>{children}</>
                    <li className="menu-item">
                    <a href="/login">
                        <Icon pack="majesticons" name="logout-line" />
                        <span className="sr-only">Logout</span>
                    </a>
                    </li>
                    <li className="menu-item">
                    <a href="/settings">
                        <Icon icon="cog" />
                        <span className="sr-only">Settings</span>
                    </a>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;