import { calculateSGPA } from "../utils/calculator";

const getYearFromSem = (sem) => {
  const semNumber = parseInt(sem.replace("Sem ", ""));
  if (semNumber <= 2) return "Year 1";
  if (semNumber <= 4) return "Year 2";
  if (semNumber <= 6) return "Year 3";
  if (semNumber <= 8) return "Year 4";
  return "Year 5";
};

export default function ResultSummary({ sections, final }) {
  if (!final) return null;

  return (
    <div id="print-area">
      <h2>SGPA Breakdown</h2>

      {sections.map(sec => {
        const res = calculateSGPA(sec.subjects);
        const year = getYearFromSem(sec.sem);

        return (
          <div
            key={sec.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "15px",
              paddingBottom: "10px"
            }}
          >
            <h4>{year} — {sec.sem}</h4>

            <table width="100%" border="1" cellPadding="6">
              <thead>
                <tr>
                  <th align="left">Subject</th>
                  <th>Grade</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {sec.subjects.map((sub, i) => (
                  <tr key={i}>
                    <td>{sub.name}</td>
                    <td align="center">{sub.grade}</td>
                    <td align="center">{sub.credit}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>
              <strong>SGPA:</strong> {res.sgpa ?? "—"} <br />
              <strong>Total Credits:</strong> {res.credits}
            </p>
          </div>
        );
      })}

      <hr />

      <h2>Final CGPA Summary</h2>
      <p>
        <strong>CGPA:</strong> {final.cgpa} <br />
        <strong>Total Credits Completed:</strong> {final.credits}
      </p>
    </div>
  );
}
