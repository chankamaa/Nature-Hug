import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmptyCart from './pages/EmptyCart/EmptyCart';
import FullCart from './pages/FullCart/FullCart';
import Step01 from './pages/OrderStep01/Step01';
import Step02 from './pages/OrderStep02/Step02';
import Step03 from './pages/OrderStep03/Step03';
import Step04 from './pages/OrderStep04/Step04';
import Aboutus from './pages/AboutUs/Aboutus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Order manager Routes */}
        <Route path="EmptyCart" element={<EmptyCart />} />
        <Route path="FullCart" element={<FullCart />} />
        <Route path="Step01" element={<Step01 />} />
        <Route path="Step02" element={<Step02 />} />
        <Route path="Step03" element={<Step03 />} />
        <Route path="Step04" element={<Step04 />} />
        <Route path="Aboutus" element={<Aboutus />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
