import { InfoBox, MarkerF } from "@react-google-maps/api";
import React, { useContext } from "react";
import { BusinessListContext } from "../context/BusinessListContext";

function Marker({ userLocation }) {
  const { businessList, setBusinessList } = useContext(BusinessListContext);

  return (
    <div>
      {businessList &&
        businessList.map(
          (business, index) =>
            index <= 4 && (
              <MarkerF key={index}
                position={business.geometry.location}
                icon={{
                  url: "/location-pin.png",
                  scaledSize: {
                    width: 50,
                    height: 50,
                  },
                }}
              >
                  <InfoBox
                    position={business.geometry.location}
                    options={{
                    closeBoxURL: "",
                    enableEventPropagation: true,
                    pixelOffset: new window.google.maps.Size(-50, 0), // Positive value moves it down
                    boxStyle: {
                    overflow: "visible",
                    position: "absolute",
                    width: "auto"
                    }
                    }}
                  >
                    <div
                      style={{
                      backgroundColor: "#c084fc",
                      padding: "8px 12px",
                      color: "white",
                      borderRadius: "10px",
                      minWidth: "120px",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      position: "relative",
                      zIndex: 1
                      }}
                    >
                      <div style={{ 
                      fontSize: "13px",
                      lineHeight: "1.2",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                      }}>
                      {business.name}
                      </div>
                    </div>
                  </InfoBox>
              </MarkerF>
            )
        )}
      <MarkerF
        position={userLocation}
        icon={{
          url: "/user-location.png",
          scaledSize: {
            width: 50,
            height: 50,
          },
        }}
      />
    </div>
  );
}

export default Marker;