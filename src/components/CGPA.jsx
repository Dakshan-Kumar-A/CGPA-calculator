import { useState } from "react";
import SGPA from "./SGPA";
import Result from "./Result";
import PDF from "./PDF";
import {semesters } from "../utils/sem";
import { calculateCGPA } from "../utils/calculator";

export default function CGPA() {
const [sections, setSections] = useState([
  {
    id: Date.now(),
    sem: semesters[0], // default
    subjects: [
      { name: "Subject 1", grade: "10", credit: "3" }
    ]
  }
]);

  const [final, setFinal] = useState(null);

 const addSection = () => {
  setSections([
    ...sections,
    {
      id: Date.now(),
      sem: semesters[0],
      subjects: [
        { name: "Subject 1", grade: "", credit: "" }
      ]
    }
  ]);
};


  const updateSection = (updated) => {
    setSections(sections.map(s => (s.id === updated.id ? updated : s)));
  };

  const calculate = () => {
    setFinal(calculateCGPA(sections));
  };

  return (
    <>
      <button onClick={addSection}>Add SGPA Section</button>

      {sections.map(sec => (
        <SGPA
          key={sec.id}
          section={sec}
          onUpdate={updateSection}
        />
      ))}

      <button onClick={calculate}>Calculate CGPA</button>
      <PDF />

      <Result sections={sections} final={final} />
    </>
  );
}
