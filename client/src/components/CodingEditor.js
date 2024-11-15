// import React, { useState } from "react";
// import { FaPlay } from "react-icons/fa";

// const CodingEditor = () => {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");

//   const handleRunCode = () => {
//     // Placeholder: call backend API to compile and execute code
//     setOutput("Running code..."); // Mock output for now
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
//       <h3 className="text-xl font-semibold">Code Editor</h3>
//       <textarea
//         className="w-full h-64 p-4 bg-gray-100 rounded-lg font-mono text-sm"
//         value={code}
//         onChange={(e) => setCode(e.target.value)}
//         placeholder="Write your code here..."
//       />
//       <button
//         onClick={handleRunCode}
//         className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center hover:bg-green-600 transition duration-200"
//       >
//         <FaPlay className="mr-2" /> Run Code
//       </button>
//       <div className="mt-4">
//         <h4 className="text-lg font-medium">Output:</h4>
//         <pre className="bg-gray-200 p-4 rounded-lg mt-2 text-sm font-mono whitespace-pre-wrap">
//           {output}
//         </pre>
//       </div>
//     </div>
//   );
// };

// export default CodingEditor;



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
      {/* <h3 className="text-xl font-semibold">Code Editor</h3>
      <textarea
        className="w-full h-64 p-4 bg-gray-100 rounded-lg font-mono text-sm"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
      /> */}
      {/* <button
        onClick={handleRunCode}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded inline-flex items-center hover:bg-green-600 transition duration-200"
      >
        <FaPlay className="mr-2" /> Run Code
      </button> */}
      <div className="mt-4">
        {/* <h4 className="text-lg font-medium">Output:</h4> */}
        {/* Embedding JDoodle iframe */}
        <div data-pym-src="https://www.jdoodle.com/embed/v1/267ac45b1092fb36">
          <iframe
            id="jdoodle-iframe"
            src="https://www.jdoodle.com/embed/v1/267ac45b1092fb36"
            width="100%"
            height="300px"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CodingEditor;
