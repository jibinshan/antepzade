"use client";
import React, { useEffect, useState } from "react";

const ModelBox: React.FC<{
  iosSrc?: string;
  src: string;
  width?: string;
  height?: string;
  Top?: string;
  Bottom?: string;
  Right?: string;
  Left?: string;
  fieldOfView: string;
  cameraOrbit: string;
  cameraTarget: string;
}> = ({
  iosSrc,
  src,
  width,
  height,
  Top,
  Bottom,
  Right,
  Left,
  cameraOrbit,
  fieldOfView,
  cameraTarget,
}) => {
    const [isClient, setIsClient] = useState(false);
    const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsClient(true);
        void import("@google/model-viewer").then(() => {
          setIsModelViewerLoaded(true);
        });
      }
    }, []);

    if (!isClient || !isModelViewerLoaded) {
      return null;
    }

    return (
      <model-viewer
        id="model"
        src={src}
        ios-src={iosSrc}
        seamless-poster
        environment-image="neutral"
        exposure="1.0"
        interaction-prompt-threshold="0"
        shadow-intensity="1"
        // ar
        ar-modes="webxr scene-viewer quick-look"
        auto-rotate
        camera-controls
        // camera-orbit="0deg 90deg 0deg 8.37364m"
        camera-orbit={cameraOrbit} // Closer orbit
        field-of-view={fieldOfView}
        disable-tap
        camera-target={cameraTarget}
        max-camera-orbit="Infinity 90deg auto"
        alt="3D model"
        style={{
          width: width ?? "100px",
          height: height ?? "500px",
          // display: "flex",
          // justifyContent: 'center',
          // alignItems: "center",
          zIndex: "99",
          top: Top,
          bottom: Bottom,
          left: Left,
          right: Right,
        }}
      ></model-viewer>
      //  <div div className = "poster" slot = "poster" >
      //     <div className="pre-prompt" >
      //         <Prompt />
      //     </div>
      //     </div >
    );
  };

export default ModelBox;
