import React from "react";

export default function DemoHOCModal() {
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary btn-lg mr-3"
        data-toggle="modal"
        data-target="#modelId"
      >
        Login
      </button>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Register
      </button>
    </div>
  );
}
