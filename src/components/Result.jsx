import { calculateSGPA } from "../utils/calculator";
import { gradeMap } from "../utils/grade";

const reverseGradeMap = Object.fromEntries(
  Object.entries(gradeMap).map(([k, v]) => [v, k])
);

const getYearFromSem = (sem) => {
  const n = parseInt(sem.replace("Sem ", ""));
  if (n <= 2) return "Year 1";
  if (n <= 4) return "Year 2";
  if (n <= 6) return "Year 3";
  return "Year 4";
};

export default function ResultSummary({ sections, final }) {
  if (!final) return null;

  return (
    <div id="print-area" className="result-summary">
      <h2>Academic Result Summary</h2>

      {sections.map((sec) => {
        const { sgpa, totalCredits = 0 } = calculateSGPA(sec.subjects);
        const year = getYearFromSem(sec.sem);

        return (
          <div key={sec.id} className="print-block semester-block">

            <h3 className="semester-title">
              {year} — {sec.sem}
            </h3>

            <table className="result-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {sec.subjects.map((sub, index) => (
                  <tr key={index}>
                    <td>{sub.name}</td>
                    <td>{reverseGradeMap[sub.grade] || "-"}</td>
                    <td>{sub.credit || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ ALWAYS PRINTED */}
            <div className="sgpa-footer">
              <div>
                <strong>SGPA:</strong>{" "}
                {sgpa !== null ? sgpa : "Not calculated"}
              </div>
              <div>
                <strong>Total Credits (This Semester):</strong>{" "}
                {totalCredits}
              </div>
            </div>
          </div>
        );
      })}

      <div className="print-block cgpa-box">

        <h3>Final CGPA</h3>
        <p>
          <strong>CGPA:</strong> {final.cgpa}
          <br />
          <strong>Total Credits Completed:</strong> {final.credits}
        </p>
      </div>
    </div>
  );
}
