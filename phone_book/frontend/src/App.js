import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import './App.css';
import ContactListPage from "./pages/ContactListPage";
import ContactPage from "./pages/ContactPage";
import NewContactPage from "./pages/NewContactPage";
import UpdateContactPage from "./pages/UpdateContactPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ContactListPage/>} exact/>
                    <Route path="/contact/:id" element={<ContactPage/>}/>
                    <Route path="/new_contact" element={<NewContactPage/>}/>
                    <Route path="/update_contact/:id" element={<UpdateContactPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
