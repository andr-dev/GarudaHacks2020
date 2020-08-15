import React from "react";

function SummaryPoint(props) {
  return (
    <div class="event">
      <div class="content">
        <div class="summary">{props.point}</div>
      </div>
    </div>
  );
}

export default SummaryPoint;
