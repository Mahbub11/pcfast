import React from "react";

export default function RHAEvaluateMock({ passage, answer,userAns }) {
  

  return (
    <div>
      <div className="text-justify">
        {passage.map((val) => (
          <p className="text-justify">
            {val.trim() === answer.trim() ? (
              <p>
                <span className="bg-green-400 rounded-sm">{val + "."}</span>
              </p>
            ) : val.trim() === (userAns.trim() === answer.trim()) ? (
              <p>
                <span className="bg-green-400 rounded-sm">{val + "."}</span>
              </p>
            ) : (
              val + "."
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
