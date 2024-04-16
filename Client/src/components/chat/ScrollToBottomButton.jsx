import React, { useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";

const ScrollToBottomButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToBottom}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <FaArrowCircleDown size={40} color="blue" />
        </div>
      )}
    </>
  );
};

export default ScrollToBottomButton;
