
import Icon from 'components/UI/Icon';
import LeftMenu from 'components/UI/LeftMenu';
import Tiles from 'components/UI/Tiles';
import Navigation from 'components/UI/navigation/Navigation';

const Dashboard = ({children}: any) => {
    return (
        <div>
            <div className="ui-controls">
                {/* <DarkMode /> */}
            </div>
            <div className="admin-interface">
                <Navigation>
                    <li className="menu-item">
                        <a href="/">
                        <Icon icon="house" /> 
                        <span className="sr-only">Dashboard</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/calendario/">
                        <Icon icon="calendar-line" /> 
                        <span className="sr-only">Calendario</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/classifica/">
                        <Icon icon="trophy" /> 
                        <span className="sr-only">Classifica</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/teams/">
                        <Icon icon="account-group" /> 
                        <span className="sr-only">Teams</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/schieramenti/">
                        <Icon icon="flag-line" /> 
                        <span className="sr-only">Schieramenti</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/scommesse-sprint/">
                        <Icon icon="messages-line" /> 
                        <span className="sr-only">Scommesse Sprint</span>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="/scommesse/">
                        <Icon icon="image-line" /> 
                        <span className="sr-only">Scommesse Gare</span>
                        </a>
                    </li>
                </Navigation>    
                <main id="main-content">
                    <>{children}</>
                </main>
            </div>
        </div>
    )
};

export default Dashboard;
