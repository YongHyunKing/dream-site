import React, { useState, useEffect, useRef } from 'react';
import StarIcon from '@mui/icons-material/Star';
import "../../asset/scss/siteActivityComponent.scss";

import MoneyIcon from '@mui/icons-material/Money';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HomeWorkIcon from '@mui/icons-material/HomeWork';



function SiteActivityComponent(props) {

  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const threshold = 100;

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (!element) return;

      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - threshold) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);


  useEffect(() => {
    if (isVisible) {
      const start = performance.now(); // 현재 시간을 기록
      const duration = 1500; // 애니메이션 지속 시간 (1초)

      const updateCount = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1); // 진행률을 0과 1 사이로 유지

        setCount(Math.floor(progress * props.count)); // 진행률에 따라 숫자 갱신

        if (elapsed < duration) {
          // 애니메이션 종료 전까지 반복
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);

      // 컴포넌트가 언마운트되면 애니메이션 정리
      return () => cancelAnimationFrame(updateCount);

    }

  }, [props.count, isVisible]);

  return (
    <div className="siteActivityComponent">
      <div className="siteActivityComponent-inner">
        <div className="siteActivityComponent-info">
          <div className="main-info">{count}</div>
          {props.id === "projects" && <div ref={elementRef} className="main-info-unit">Projects</div>}
          {props.id === "totalTurnover" && <div ref={elementRef} className="main-info-unit">Total Turnover</div>}
          {props.id === "career" && <div ref={elementRef} className="main-info-unit">Career</div>}
        </div>
        {props.id === "projects" && <HomeWorkIcon sx={{ fontSize: 50, color: "white" }} />}
        {props.id === "totalTurnover" && <MoneyIcon sx={{ fontSize: 50, color: "white" }} />}
        {props.id === "career" && <WorkHistoryIcon sx={{ fontSize: 50, color: "white" }} />}

      </div>
    </div>
  );
}

export default SiteActivityComponent;