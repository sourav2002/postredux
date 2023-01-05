import React from "react";
import RingLoader from "react-spinners/RingLoader";
const Spinner = ({ text = "", size = "5em", loading }) => {
  const header = text !== "" ? text : "loading...";
  return (
    <div className="spinner flex-col justify-center items-center">
      {loading && (
        <>
          <div className="loader">
            <RingLoader
              color="red"
              loading={loading}
              size={100}
            />
          </div>
          <br />
          <p className="block mt-0">{header}</p>
        </>
      )}
    </div>
  );
};
export default Spinner;
