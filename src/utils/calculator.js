export function calculateSGPA(subjects) {
  let totalCredits = 0;
  let totalWeightedScore = 0;

  subjects.forEach((sub) => {
    const grade = Number(sub.grade);
    const credit = Number(sub.credit);

    // skip incomplete rows safely
    if (isNaN(grade) || isNaN(credit) || credit <= 0) return;

    totalCredits += credit;
    totalWeightedScore += grade * credit;
  });

  if (totalCredits === 0) {
    return { sgpa: null, totalCredits: 0 };
  }

  const sgpa = (totalWeightedScore / totalCredits).toFixed(2);

  return {
    sgpa,
    totalCredits
  };
}

export function calculateCGPA(sections) {
  let totalCredits = 0;
  let totalWeightedSGPA = 0;

  sections.forEach((sec) => {
    const { sgpa, totalCredits: semCredits } =
      calculateSGPA(sec.subjects);

    if (sgpa === null || semCredits === 0) return;

    totalCredits += semCredits;
    totalWeightedSGPA += Number(sgpa) * semCredits;
  });

  if (totalCredits === 0) {
    return { cgpa: null, credits: 0 };
  }

  return {
    cgpa: (totalWeightedSGPA / totalCredits).toFixed(2),
    credits: totalCredits
  };
}
