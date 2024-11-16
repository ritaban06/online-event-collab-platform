import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const CodingEditor = () => {
  const [code, setCode] = useState("");

  const handleRunCode = () => {
    // Instead of running code locally, embed JDoodle iframe with pre-defined options
    document.getElementById("jdoodle-iframe").contentWindow.postMessage(
      {
        event: "jdoodleRun",
        code: code,
      },
      "*"
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="mt-4">
        {/* Embedding JDoodle iframe */}
        <div data-pym-src="https://www.jdoodle.com/embed/v1/267ac45b1092fb36">
          <iframe
            id="jdoodle-iframe"
            src="https://www.jdoodle.com/embed/v1/267ac45b1092fb36"
            width="100%"
            height="1000px"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodingEditor;
