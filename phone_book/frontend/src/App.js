import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import './App.css';
import ContactListPage from "./pages/ContactListPage";
import ContactPage from "./pages/ContactPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ContactListPage/>} exact/>
                    <Route path="/contact/:id" element={<ContactPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
