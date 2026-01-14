# CGPA & SGPA Calculator (React)

A React-based CGPA and SGPA calculator for students to manage multiple semesters, dynamically calculate SGPA, compute CGPA across sections, and export results as a printable PDF. Designed for ease of use, with dynamic updates and minimal input requirements.

# Features

Separate SGPA calculation per semester.

Multiple SGPA sections for different semesters.

Dynamic SGPA update: changes in grades, credits, or subjects immediately update results.

CGPA calculation: aggregates all SGPA sections automatically.

Semester dropdowns: Year is inferred automatically from semester.

# Customizable subjects:

Add, edit, delete subjects

Change subject names dynamically

Grade and Credit as dropdowns (grade values mapped via gradeMap.js)

Printable PDF/export: neatly formatted A4 report with all sections and CGPA summary.

Responsive UI: works in modern browsers.

Default SGPA section loaded on first use.

# Installation

Clone the repository:

git clone https://github.com/yourusername/cgpa-calculator.git
cd cgpa-calculator


Install dependencies:

npm install


Run locally (development mode):

npm run dev


Open http://localhost:5173
 in your browser.

# Usage

Add SGPA Sections: By default, one SGPA section loads. Add more sections for different semesters.

Select Semester: Choose the semester from the dropdown; year is inferred automatically.

Add/Remove Subjects: Use “Add Subject” or delete existing ones.

Select Grades & Credits: Use dropdowns for each subject.

Calculate SGPA: Click the “Calculate SGPA” button for that section (results also update dynamically).

CGPA Calculation: CGPA updates automatically as SGPA sections are modified.

Export / Print PDF: Click the “Print/Download PDF” button to generate a report.

# Utilities

gradeMap.js: Maps letter grades (O, A, B, etc.) to numeric values for calculation.

calculations.js: Functions to calculate SGPA and CGPA based on subjects.

semesterOptions.js: List of available semesters (Sem 1 to Sem 8) and inferred year mapping.


# Future Improvements

Add custom grading scales for different universities.

Color-code SGPA sections in PDF.

Auto-sort SGPA sections by semester.

Mobile-friendly layout enhancements.

# License

MIT License © Dakshan Kumar A
