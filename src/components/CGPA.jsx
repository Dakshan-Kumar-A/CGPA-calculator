import { useState, useEffect } from "react";
import SGPA from "./SGPA";
import Result from "./Result";

import { semesters } from "../utils/sem";
import { calculateCGPA } from "../utils/calculator";

export default function CGPA() {
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      sem: semesters[0], // default semester
      subjects: [
        { name: "Subject 1", grade: "10", credit: "3" }
      ]
    }
  ]);

  const [final, setFinal] = useState(null);

  /* ---------------------------------
     ✅ ADD SGPA SECTION (UNCHANGED)
  ---------------------------------- */
  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        sem: semesters[0],
        subjects: [{ name: "Subject 1", grade: "", credit: "" }]
      }
    ]);
  };

  /* ---------------------------------
     ✅ UPDATE SINGLE SECTION
  ---------------------------------- */
  const updateSection = (updated) => {
    setSections(sections.map(s => (s.id === updated.id ? updated : s)));
  };

  /* ---------------------------------
     🔁 DYNAMIC CGPA CALCULATION
     (AUTO UPDATES LIKE SGPA)
  ---------------------------------- */
  useEffect(() => {
    const result = calculateCGPA(sections);

    if (result && result.cgpa !== null) {
      setFinal(result);
    }
  }, [sections]);

  /* ---------------------------------
     🧮 MANUAL BUTTON (KEPT)
  ---------------------------------- */
  const calculate = () => {
    setFinal(calculateCGPA(sections));
  };

  return (
    <>
      <button onClick={addSection}>Add SGPA Section</button>

      {sections.map(sec => (
  <div key={sec.id}>
    <SGPA
      section={sec}
      onUpdate={updateSection}
    />
    <br />   {/* 👈 SPACE AFTER EACH SGPA SECTION */}
  </div>
))}

      <button onClick={calculate}>Calculate CGPA</button>

      <Result sections={sections} final={final} />
    </>
  );
}
