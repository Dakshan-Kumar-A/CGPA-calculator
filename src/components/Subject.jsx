import { gradeMap } from "../utils/grade";

export default function SubjectRow({ subject, index, onChange, onDelete }) {
  return (
    <div className="row">
      {/* Editable subject name */}
      <input
        value={subject.name}
        onChange={e => onChange(index, "name", e.target.value)}
      />

      {/* Grade dropdown using gradeMap */}
      <select
        value={subject.grade}
        onChange={e => onChange(index, "grade", e.target.value)}
      >
        <option value="">Grade</option>
        {Object.entries(gradeMap).map(([letter, value]) => (
          <option key={letter} value={value}>
            {letter}
          </option>
        ))}
      </select>

      {/* Credit dropdown */}
      <select
        value={subject.credit}
        onChange={e => onChange(index, "credit", e.target.value)}
      >
        <option value="">Credits</option>
        {[1, 2, 3, 4, 5].map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Delete subject button */}
      <button onClick={() => onDelete(index)}>❌</button>
    </div>
  );
}
