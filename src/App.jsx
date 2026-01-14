import { useState } from "react";
import SGPA from "./components/SGPA";
import CGPA from "./components/CGPA";
import Result from "./components/Result";
import "./App.css";

export default function App() {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    const name = prompt("Enter Semester Name (eg: Semester 1)");
    if (!name) return;

    setSections([
      ...sections,
      {
        id: Date.now(),
        name,
        subjects: [],
        sgpa: null,
      },
    ]);
  };

  const updateSection = (id, updatedSection) => {
    setSections(sections.map(sec => (sec.id === id ? updatedSection : sec)));
  };

  return (
    <div className="app">
      <h1>CGPA Calculator</h1>
      <CGPA sections={sections} />
      <Result sections={sections} />
    </div>
  );
}
