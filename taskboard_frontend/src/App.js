import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    const container = {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'start'
    };
    return (
        <>
            <Header/>
            <div style={container}>
                <Navbar/>
                <Outlet/>
            </div>
        </>
    );
}

export default App;
