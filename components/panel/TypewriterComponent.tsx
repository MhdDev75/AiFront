import React, { useState, useEffect } from "react";

type TypewriterProps = {
  text: string; // متنی که باید تایپ شود
  speed?: number; // سرعت تایپ (بر حسب میلی‌ثانیه)
};

const TypewriterComponent: React.FC<TypewriterProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval); // متوقف کردن وقتی متن کامل شد
      }
    }, speed);

    return () => clearInterval(interval); // پاک کردن تایمر در هنگام حذف کامپوننت
  }, [text, speed]);

  return <p>{displayedText}</p>;
};

export default TypewriterComponent;
