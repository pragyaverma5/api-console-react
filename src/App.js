import React, { useState } from "react";
import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "600",
              color: "#1e1e2f",
              marginBottom: "5px",
            }}
          >
            API Console
          </h1>

          <p
            style={{
              color: "#6b6b7a",
              fontSize: "14px",
            }}
          >
            Test APIs with custom headers and request body
          </p>
        </div>

        {/* Request Section */}
        <div>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "#444"
          }}>
            Request
          </h3>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <RequestForm
              setResponse={setResponse}
              setLoading={setLoading}
              setStatus={setStatus}
            />
          </div>
        </div>

        {/* Response Section */}
        <div>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "#444"
          }}>
            Response
          </h3>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <ResponseViewer
              response={response}
              loading={loading}
              status={status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;