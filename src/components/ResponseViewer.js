import React, { useState } from "react";

function ResponseViewer({ response, loading, status }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!response) return;

    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      {/* Status */}
      {loading && <p>⏳ Sending request...</p>}
      {status && <p>Status: {status}</p>}

      {/* Copy Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
        <span style={{ fontWeight: "500" }}>Response Body</span>

        <button
          onClick={handleCopy}
          style={{
            padding: "6px 10px",
            backgroundColor: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "12px"
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* JSON */}
      <pre
        style={{
          backgroundColor: "#1e1e1e",
          color: "#00ffcc",
          padding: "15px",
          borderRadius: "8px",
          fontSize: "13px",
          lineHeight: "1.6",
          overflowX: "auto",
          marginTop: "10px"
        }}
      >
        {response
          ? JSON.stringify(response, null, 2)
          : "Response will appear here"}
      </pre>
    </div>
  );
}

export default ResponseViewer;