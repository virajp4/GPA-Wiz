const subList = document.querySelector('.subject-list');
const addBtn = document.querySelector('.asub-btn');
const remBtn = document.querySelector('.rsub-btn');
const calcBtn = document.querySelector('.calc-btn');
const resetBtn = document.querySelector('.reset-btn');

function createGradeAndCreditsSelect(subject) {
    const grades = ['O', 'A+', 'A', 'B+', 'B', 'C', 'F'];
    const credits = [1, 2, 3, 4, 5, 6, 7];

    const gradeSelect = document.createElement('select');
    gradeSelect.name = 'grade';
    gradeSelect.id = 'grade';
    gradeSelect.classList.add('ml-1');

    grades.forEach((grade) => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = grade;
        gradeSelect.appendChild(option);
    });

    subject.appendChild(gradeSelect)

    const creditsSelect = document.createElement('select');
    creditsSelect.name = 'credits';
    creditsSelect.id = 'credits';
    creditsSelect.classList.add('ml-1');

    credits.forEach((credit) => {
        const option = document.createElement('option');
        option.value = credit;
        option.textContent = credit;
        creditsSelect.appendChild(option);
    });

    subject.appendChild(creditsSelect);
}

const createNewSub = (n) => {
    const subject = document.createElement('div');
    subject.classList.add('subject');
    subList.appendChild(subject);

    const label = document.createElement('label');
    label.classList.add('sub-name');
    label.textContent = `Subject ${n + 1}:`;
    subject.appendChild(label);

    createGradeAndCreditsSelect(subject);
}

addBtn.addEventListener('click', () => {
    const subCount = document.querySelectorAll('.subject').length;
    createNewSub(subCount);
});

remBtn.addEventListener('click', () => {
    const subCount = document.querySelectorAll('.subject').length;
    if(subCount > 1) {
        subList.removeChild(subList.lastElementChild);
    }
});

calcBtn.addEventListener('click', () => {
    const subs = document.querySelectorAll('.subject');
    const gradePoint = {
        'O': 10,
        'A+': 9,
        'A': 8,
        'B+': 7,
        'B': 6,
        'C': 5,
        'F': 0
    }
    let totalCredits = 0;
    let totalGradePoints = 0;
    let totalGPA = 0;

    subs.forEach((sub) => {
        const grade = sub.querySelector('#grade').value;
        const credits = sub.querySelector('#credits').value;
        totalCredits += parseInt(credits);
        totalGradePoints += parseInt(credits) * gradePoint[grade];
    });

    totalGPA = totalGradePoints / totalCredits;

    const result = document.querySelector('#gpa');
    result.textContent = totalGPA.toFixed(2);
});