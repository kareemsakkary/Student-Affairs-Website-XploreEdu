function validateForm() {
// Get the form and form elements by their IDs
const form = document.getElementById('update-form');
const studentIdInput = document.getElementById('StudentID');
const studentNameInput = document.getElementById('StudentName');
const studentBDateInput = document.getElementById('StudentBDate');
const studentGPAInput = document.getElementById('StudentGPA');
const maleInput = document.getElementById('male');
const femaleInput = document.getElementById('female');
const levelInput = document.getElementById('level');
const statusInput = document.getElementById('status');
const studentPhoneInput = document.getElementById('StudentPhone');
const studentEmailInput = document.getElementById('StudentEmail');
  if (studentIdInput.value === '' || isNaN(studentIdInput.value) || studentIdInput.value < 0 || studentIdInput.value % 1 != 0) {
    alert('Please enter a valid ID.');
    studentIdInput.focus();
    return;
  }

  if (studentNameInput.value === '') {
    alert('Please enter a student name.');
    studentNameInput.focus();
    return;
  }
  
  if (studentBDateInput.value === '' || new Date(studentBDateInput.value) >= new Date()) {
    alert('Please enter a valid birth date.');
    studentBDateInput.focus();
    return;
  }
  
  if (studentGPAInput.value === '' || isNaN(studentGPAInput.value) || studentGPAInput.value < 0 || studentGPAInput.value > 4) {
    alert('Please enter a valid GPA.');
    studentGPAInput.focus();
    return;
  }
  
  if (!maleInput.checked && !femaleInput.checked) {
    alert('Please select a gender.');
    return;
  }
  if (levelInput=="") {
    alert('Please select a level.');
    return;
  }
  if (statusInput=="") {
    alert('Please select a status.');
    return;
  }
  if (studentPhoneInput.value === '' || isNaN(studentPhoneInput.value) || studentPhoneInput.value.length != 11) {
    alert('Please enter a valid phone number.');
    studentPhoneInput.focus();
    return; 
    }
    if (studentEmailInput.value === '' || !studentEmailInput.value.includes('@') || !studentEmailInput.value.includes('.')) {
    alert('Please enter a valid email.');
    studentEmailInput.focus();
    return;
    }
   
  return true;
};
