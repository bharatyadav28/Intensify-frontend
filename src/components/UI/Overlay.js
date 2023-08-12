import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React from "react";

const OverLay = ({
  placement = "right",
  delay = { show: 250, hide: 400 },
  children,
  tooltip,
}) => {
  return (
    <OverlayTrigger
      placement={placement}
      delay={delay}
      overlay={tooltip}
      popperConfig={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [-40, 0], // Adjust the offset values as needed
            },
          },
        ],
      }}
    >
      <div> {children}</div>
    </OverlayTrigger>
  );
};

export default OverLay;
