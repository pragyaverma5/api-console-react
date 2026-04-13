import React, { useState } from "react";

function RequestForm({ setResponse, setLoading, setStatus }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [activeTab, setActiveTab] = useState("body");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setResponse(null);
    setLoading(true);

    let parsedHeaders = {
      "Content-Type": "application/json",
    };

    try {
      if (headers) {
        parsedHeaders = {
          ...parsedHeaders,
          ...JSON.parse(headers),
        };
      }
    } catch {
      setResponse({ error: "Invalid JSON in headers" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method: method,
        headers: parsedHeaders,
        body: method !== "GET" ? body : undefined,
      });

      setStatus(res.status);

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: "No JSON response received" };
      }

      setResponse(data);
    } catch {
      setResponse({ error: "Request failed" });
    }

    setLoading(false);
  };

  const textareaStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    marginTop: "10px",
    fontSize: "14px",
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* URL + Method + Send */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "10px"
      }}>
        <input
          type="text"
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}
        />

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            backgroundColor: "#6c63ff",   // ✅ MATCH THEME
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <span
          onClick={() => setActiveTab("body")}
          style={{
            paddingBottom: "8px",
            cursor: "pointer",
            borderBottom:
              activeTab === "body" ? "2px solid #6c63ff" : "none",
            color: activeTab === "body" ? "#6c63ff" : "#666",
            fontWeight: "500",
          }}
        >
          Body
        </span>

        <span
          onClick={() => setActiveTab("headers")}
          style={{
            paddingBottom: "8px",
            cursor: "pointer",
            borderBottom:
              activeTab === "headers" ? "2px solid #6c63ff" : "none",
            color: activeTab === "headers" ? "#6c63ff" : "#666",
            fontWeight: "500",
          }}
        >
          Headers
        </span>
      </div>

      {/* Body */}
      {activeTab === "body" && (
        <textarea
          placeholder="Enter JSON body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={textareaStyle}
        />
      )}

      {/* Headers */}
      {activeTab === "headers" && (
        <textarea
          placeholder='Enter headers JSON'
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          style={textareaStyle}
        />
      )}
    </form>
  );
}

export default RequestForm;