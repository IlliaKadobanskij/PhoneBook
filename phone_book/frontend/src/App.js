import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import './App.css';
import ContactListPage from "./pages/ContactListPage";
import ContactPage from "./pages/ContactPage";
import NewContactPage from "./pages/NewContactPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ContactListPage/>} exact/>
                    <Route path="/contact/:id" element={<ContactPage/>}/>
                    <Route path="/new_contact" element={<NewContactPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
