export const calculateSGPA = (subjects) => {
  let credits = 0;
  let points = 0;

  subjects.forEach(s => {
    if (s.credit && s.grade) {
      credits += Number(s.credit);
      points += Number(s.credit) * Number(s.grade);
    }
  });

  return credits === 0
    ? { sgpa: null, credits: 0 }
    : { sgpa: (points / credits).toFixed(2), credits };
};

export const calculateCGPA = (sections) => {
  let totalCredits = 0;
  let totalPoints = 0;

  sections.forEach(sec => {
    const { sgpa, credits } = calculateSGPA(sec.subjects);
    if (credits > 0) {
      totalCredits += credits;
      totalPoints += Number(sgpa) * credits;
    }
  });

  return totalCredits === 0
    ? { cgpa: null, credits: 0 }
    : { cgpa: (totalPoints / totalCredits).toFixed(2), credits: totalCredits };
};
