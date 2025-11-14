import React from "react";

const ComprehensiveContent = ({ paragraph, handleClose }) => {
  return (
    <>
      <p className="text-lg font-medium text-[#1C3141]">{paragraph}</p>
      <div className="w-full flex justify-end">
        <button
          className="sm:px-30 px-15 py-2 bg-[#1C3141] text-white rounded-md mt-3 cursor-pointer"
          onClick={handleClose}
        >
          Minimize
        </button>
      </div>
    </>
  );
};

export default ComprehensiveContent;
