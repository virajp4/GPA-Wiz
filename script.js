const subList = document.querySelector('.subject-list');
const addBtn = document.querySelector('.asub-btn');
const remBtn = document.querySelector('.rsub-btn');
const calcBtn = document.querySelector('.calc-btn');
const resetBtn = document.querySelector('.reset-btn');
const cgpaBtn = document.querySelector('.cgpa-btn');
const result = document.querySelector('#gpa');
const resText = document.querySelector('#res-text');
let mode = 0

const createSubList = (n) => {
    for (let i = 0; i < n; i++) {
        createNewSub(i);
    }
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

const deleteSubList = () => {
    for (sub of document.querySelectorAll('.subject')) {
        subList.removeChild(sub);
    }
}

const createSemList = (n) => {
    for (let i = 0; i < n; i++) {
        createNewSem(i);
    }
}

const createNewSem = (n) => {
    const sem = document.createElement('div');
    sem.classList.add('semester');
    subList.appendChild(sem);

    const label = document.createElement('label');
    label.classList.add('sem-name');
    label.textContent = `Semester ${n + 1}:`;
    sem.appendChild(label);

    const gpa = document.createElement('input');
    gpa.type = 'number';
    gpa.name = 'gpa';
    gpa.id = 'gpa';
    gpa.placeholder = 'GPA';
    gpa.classList.add('ml-1');
    sem.appendChild(gpa);

    subList.appendChild(sem);
}

const deleteSemList = () => {
    for (sem of document.querySelectorAll('.semester')) {
        subList.removeChild(sem);
    }
}

addBtn.addEventListener('click', () => {
    if (mode === 0) {
        const subCount = document.querySelectorAll('.subject').length;
        createNewSub(subCount);
    }
    else {
        const semCount = document.querySelectorAll('.semester').length;
        createNewSem(semCount);
    }
});

remBtn.addEventListener('click', () => {
    if (mode === 0) {
        const subCount = document.querySelectorAll('.subject').length;
        if (subCount > 1) {
            subList.removeChild(subList.lastElementChild);
        }
    }
    else {
        const semCount = document.querySelectorAll('.semester').length;
        if (semCount > 1) {
            subList.removeChild(subList.lastElementChild);
        }
    }
});

calcBtn.addEventListener('click', () => {
    if (mode === 0) {
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

        
        result.textContent = totalGPA.toFixed(2);
    }
    else {
        const sems = document.querySelectorAll('.semester');
        let totalCredits = 0;
        let totalGradePoints = 0;
        let totalCGPA = 0;

        sems.forEach((sem) => {
            const gpa = sem.querySelector('#gpa').value;
            if (gpa != '') {
                totalCredits += 10;
                totalGradePoints += parseFloat(gpa);
            }
        });

        totalCGPA = totalGradePoints / totalCredits * 10;
        
        result.textContent = totalCGPA.toFixed(3);
        result.textContent = result.textContent.slice(0, -1);
    }
});

cgpaBtn.addEventListener('click', () => {
    if (mode === 0) {
        addBtn.textContent = 'Add Semester';
        remBtn.textContent = 'Remove Semester';
        deleteSubList();
        createSemList(8);
        cgpaBtn.innerText = 'SGPA';
        resText.textContent = 'Calculated CGPA:';
        result.textContent = '0.00';
        mode = 1
    }
    else {
        addBtn.textContent = 'Add Subject';
        remBtn.textContent = 'Remove Subject';
        deleteSemList();
        createSubList(5);
        cgpaBtn.innerText = 'CGPA';
        resText.textContent = 'Calculated SGPA:';
        result.textContent = '0.00';
        mode = 0
    }
});