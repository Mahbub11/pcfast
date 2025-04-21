import React from "react";

const ErrorDetails = ({ mistake }) => {
  return (
    <div>
      <p>Error: {mistake.error}</p>
      <p>Correction: {mistake.correction}</p>
      <p>Explanation: {mistake.explanation}</p>
    </div>
  );
};

export default ErrorDetails;
