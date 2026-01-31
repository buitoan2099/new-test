import React, { useContext, useEffect, useState } from "react";
import HomeBackGround from "../../static/images/background-brand.png";
import { AppContext } from "../../context/AppContext";

const BackgroundSection: React.FC = () => {
  const { imageBanner } = useContext(AppContext);
  const [imageBannerBg, setImageBannerBg] = useState<any>(null);

  useEffect(() => {
    if (imageBanner) {
      setImageBannerBg(imageBanner);
    }
  }, [imageBanner]);

  // console.log("imageBannerBg", imageBannerBg);

  return (
    <div
      className="relative h-full w-full"
      style={{
        // backgroundImage: `url(${HomeBackGround})`,
        backgroundImage: imageBannerBg
          ? `url(${imageBannerBg})`
          : `url(${HomeBackGround})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
};

export default BackgroundSection;
