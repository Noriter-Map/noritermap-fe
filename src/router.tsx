import { Route, Routes } from 'react-router-dom';
import {Home} from "./pages/Home/Home";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/p/place/:facilityId" element={<Home />} />
        </Routes>
    )
}