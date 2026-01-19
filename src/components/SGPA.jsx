import { useState, useEffect } from "react";
import Subject from "./Subject";
import { calculateSGPA } from "../utils/calculator";
import { semesters } from "../utils/sem";

// Helper: infer year from semester
const getYearFromSem = (sem) => {
  const semNumber = parseInt(sem.replace("Sem ", ""));
  if (semNumber <= 2) return "Year 1";
  if (semNumber <= 4) return "Year 2";
  if (semNumber <= 6) return "Year 3";
  if (semNumber <= 8) return "Year 4";
  return "Year 5";
};

export default function SGPASection({ section, onUpdate }) {
  const [subjects, setSubjects] = useState(section.subjects);
  const [sem, setSem] = useState(section.sem || "Sem 1");
  const [result, setResult] = useState(calculateSGPA(section.subjects));

  const year = getYearFromSem(sem);

  // ✅ CORRECT total credits calculation
  const totalCredits = subjects.reduce(
    (sum, s) => sum + Number(s.credit || 0),
    0
  );

  // 🔄 Dynamic SGPA calculation
  useEffect(() => {
    const dynamicResult = calculateSGPA(subjects);
    setResult(dynamicResult);

    onUpdate({
      ...section,
      sem,
      year,
      subjects,
      sgpa: dynamicResult?.sgpa,
      credits: totalCredits
    });
  }, [subjects, sem]);

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        name: `Subject ${subjects.length + 1}`,
        grade: "",
        credit: ""
      }
    ]);
  };

  const updateSubject = (i, field, value) => {
    const copy = [...subjects];
    copy[i][field] = value;
    setSubjects(copy);
  };

  const deleteSubject = (i) => {
    setSubjects(subjects.filter((_, idx) => idx !== i));
  };

  const calculate = () => {
    const manualResult = calculateSGPA(subjects);
    setResult(manualResult);

    onUpdate({
      ...section,
      sem,
      year,
      subjects,
      sgpa: manualResult?.sgpa,
      credits: totalCredits
    });
  };

  return (
    <div className="section">
      {/* Semester dropdown */}
      <div className="row">
        <label>
          Semester:
          <select value={sem} onChange={e => setSem(e.target.value)}>
            {semesters.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Subjects */}
      {subjects.map((s, i) => (
        <Subject
          key={i}
          subject={s}
          index={i}
          onChange={updateSubject}
          onDelete={deleteSubject}
        />
      ))}

      <button onClick={addSubject}>Add Subject</button>

      {/* ✅ Dynamic SGPA Result */}
      {result && (
        <p>
          <strong>{year} — {sem}</strong>{" "}
          | <strong>SGPA:</strong> {result.sgpa ?? "—"}{" "}
          | <strong>Total Credits:</strong> {totalCredits}
        </p>
      )}
    </div>
  );
}
