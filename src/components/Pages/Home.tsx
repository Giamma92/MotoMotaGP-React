import Layout from "components/UI/elements/Layout";
import Dashboard from "./Dashboard";
import { AppProvider } from "components/App/AppContext";
// import TableBetsRace from "./TableBetsRace";

function Home() {
    return (
        <AppProvider>
            <Layout>
                <Dashboard />
            </Layout>  
        </AppProvider>
    );
}

export default Home;
