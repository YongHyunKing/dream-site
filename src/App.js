import React, { useEffect, useState } from "react";
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Desktop
import { Main, MobileMain } from "./pages/Main.js"
import { Header, MobileHeader } from "./components/Header.js"
import { Footer, MobileFooter } from "./components/Footer.js"
import { desktopSize } from "./data/style.js"
import { About, MobileAbout } from "./pages/About.js";
import { Inquiry, MobileInquiry } from "./pages/Inquiry.js";
import { MobileReport, Report } from "./pages/Report.js";
import { Introduce, MobileIntroduce } from "./pages/Introduce.js";
import { Content, MobileContent } from "./pages/Content.js";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= desktopSize);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="wrap">
        {isDesktop ? <Header /> : <MobileHeader />}
        <div className="container">
          <Routes>
            <Route path="/" element={isDesktop ? <Main /> : <MobileMain />} />
            <Route path="/about" element={isDesktop ? <About /> : <MobileAbout />} />
            <Route path="/introduce" element={isDesktop ? <Introduce /> : <MobileIntroduce />} />
            <Route path="/inquiry" element={isDesktop ? <Inquiry /> : <MobileInquiry />} />
            <Route path="/report" element={isDesktop ? <Report /> : <MobileReport />} />
            <Route path="/content" element={isDesktop ? <Content /> : <MobileContent />} />
          </Routes>
        </div>
        {isDesktop ? <Footer /> : <MobileFooter />}
      </div>
    </Router>
  );
}

export default App;
