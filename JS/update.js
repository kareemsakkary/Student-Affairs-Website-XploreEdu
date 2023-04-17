
var data = getData();

// to get url parameters
var urlParams = new URLSearchParams(window.location.search); 
var student_id = urlParams.get("id");

var student = data[student_id];

window.onload = function(){
    //checks if student exists
    if (student == undefined)
        return;
    //display student info
    console.log(student);
    document.getElementById("StudentID").value = student_id;
    document.getElementById("StudentName").value = student["studentName"];
    document.getElementById("StudentBDate").value = student["Bdate"];
    document.getElementById("StudentGPA").value = student["GPA"];
    document.getElementById("StudentNumber").value = student["phone"];
    document.getElementById("StudentEmail").value = student["email"];
    document.getElementById("level").value = student["level"];
    document.getElementById("deps").value = student["department"];
    document.getElementById("status").value = student["status"];
    document.getElementById("pic").setAttribute('src',student['pic']);
      if(student['gender']=='Male'){
        document.getElementById("option-1").checked= true;
      }else if(student['gender']=='Female'){
        document.getElementById("option-2").checked= true;
    }


}
var clickOn = function(str){
  document.getElementById(str).click();
}
function readURL(input , str) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          document.getElementById(str).setAttribute('src', e.target.result);
          student['pic'] = e.target.result;
          // $('#img')
          //     .attr('src', e.target.result)
      };

      reader.readAsDataURL(input.files[0]);
  }
}

function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
} 
function validateForm() {
// Get the form and form elements by their IDs
var studentIdInput = document.getElementById('StudentID');
var studentNameInput = document.getElementById('StudentName');
var studentBDateInput = document.getElementById('StudentBDate');
var studentGPAInput = document.getElementById('StudentGPA');
var maleInput = document.getElementById('option-1').checked;
var femaleInput = document.getElementById('option-2').checked;
var levelInput = document.getElementById('level');
var statusInput = document.getElementById('status');
var departmentInput = document.getElementById('deps');
var studentPhoneInput = document.getElementById('StudentNumber');
var studentEmailInput = document.getElementById('StudentEmail');
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
  
  if (!maleInput && !femaleInput) {
    alert('Please select a gender.');
    return;
  }
  if (levelInput=="") {
    alert('Please select a level.');
    return;}

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
document.getElementById('update').addEventListener('click',()=>{
  if(validateForm()){
    if(student_id!=document.getElementById("StudentID").value){
      data[document.getElementById("StudentID").value]=data[student_id];
      delete data[student_id];
      student_id=document.getElementById("StudentID").value;
      }
 
    student['studentName'] = document.getElementById("StudentName").value;
    student['Bdate'] = document.getElementById("StudentBDate").value;
    student['GPA'] = document.getElementById("StudentGPA").value;
    student['phone'] = document.getElementById("StudentNumber").value;
    student['email'] = document.getElementById("StudentEmail").value;
    student['level'] = document.getElementById("level").value;
    student['status'] = document.getElementById("status").value;
    student['department'] = document.getElementById("deps").value;
    if(document.getElementById('option-1').checked){
      student['gender']="Male";
    }else if(document.getElementById('option-2').checked){
      student['gender']="Female";
  
    }
  
        
  }  if((((document.getElementById("level").value==1)||(document.getElementById("level").value==2))&&(document.getElementById("deps").value!="General"))||((document.getElementById("level").value==1)||(document.getElementById("level").value==2))&&(document.getElementById("deps").value!="General")){
    alert("Please select the correct department");
    
  }else{
    //update the local storage
    data[student_id] = student;
    localStorage.setItem("data",JSON.stringify(data));
    //makes the current id a url parameter
    document.getElementById("StudentID").value = student_id;
    alert("Student Updated Successfully");

  }
        
});
function deleteStudent(){
  if (confirm("Are you sure you want to delete this student?")==true){
    delete data[student_id];
    localStorage.setItem("data",JSON.stringify(data));
  }
  
}
