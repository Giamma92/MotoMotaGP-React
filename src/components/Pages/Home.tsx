import Layout from "components/UI/Layout";
import Dashboard from "./Dashboard";
import { AppProvider } from "components/App/AppContext";

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
