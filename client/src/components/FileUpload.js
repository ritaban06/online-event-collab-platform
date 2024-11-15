import React, { useState } from "react";
import { FaFileUpload, FaTrashAlt } from "react-icons/fa"; // Importing icons from react-icons

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 font-medium mb-3">Upload Files</label>
      
      {/* File Input and Button */}
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
        multiple
      />
      
      <label
        htmlFor="file-upload"
        className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition duration-200"
      >
        <FaFileUpload /> {/* Icon for Upload */}
        <span>Choose Files</span>
      </label>

      {/* Preview of Selected Files */}
      <div className="mt-4 space-y-3">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow hover:shadow-lg transition duration-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-600 rounded-full">
                <FaFileUpload />
              </div>
              <span className="text-gray-800 font-medium">{file.name}</span>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="text-red-500 hover:text-red-600 transition duration-200"
            >
              <FaTrashAlt size={18} /> {/* Trash icon for removal */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
