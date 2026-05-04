import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const sendToBackend = async () => {
    const res = await fetch("http://localhost:3001/parse-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>AI Task Manager</h1>

      <textarea value={input} onChange={(e) => setInput(e.target.value)} />

      <button onClick={sendToBackend}>Send</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

function Tasks() {
  return <h1>Tasks</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}
