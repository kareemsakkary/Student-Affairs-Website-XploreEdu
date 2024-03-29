all_data = {}
student = {}

function load(){
  fetch('/xploreedu/getStudents/')
  .then(response => response.json())
  .then(data => {
    arr = data['students']
    for ( studu in arr){
      all_data[arr[studu].id] = arr[studu];
    } 
    student = all_data[student_id]
    display_student();
  })
}

function deletestud(data, callback){
  var xhr = new XMLHttpRequest();
  var url = '/xploreedu/delete/';
  xhr.open('POST', url, true);
  // Set the appropriate headers for sending JSON data
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              callback(response);
          } else {
              console.error('Error: ' + xhr.status);
          }
      }
  };
  var jsonData = JSON.stringify(data);
  xhr.send(jsonData);
}
function setStudent(data, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/xploreedu/setStudent/';

  xhr.open('POST', url, true);

  // Set the appropriate headers for sending JSON data
  xhr.setRequestHeader('Content-Type', 'multipart/form-data');

  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              callback(response);
          } else {
              console.error('Error: ' + xhr.status);
          }
      }
  };
  // var jsonData = JSON.stringify(data);
  xhr.send(data);
}


function display_student(){
//checks if student exists
    if (student == undefined){
        return;
      }
    //display student info
    document.getElementById("StudentID").value = student_id;
    document.getElementById("StudentName").value = student["name"];
    document.getElementById("StudentBDate").value = student["bdate"];
    document.getElementById("StudentGPA").value = student["gpa"];
    document.getElementById("StudentNumber").value = student["phone"];
    document.getElementById("StudentEmail").value = student["email"];
    document.getElementById("level").value = student["level"];
    document.getElementById("deps").value = student["department"];
    document.getElementById("status").value = student["status"];
    if(student['pic']){
        document.getElementById("pic").setAttribute('src' , student['pic']);
    }
    if(student["level"] == "2"){
      document.getElementById("level").remove(0);
    }else if(student["level"] == "3"){
      document.getElementById("level").remove(1);
      document.getElementById("level").remove(0);
    }else if(student["level"] == "4"){
      document.getElementById("level").remove(2);
      document.getElementById("level").remove(1);
      document.getElementById("level").remove(0);
    }
      if(student['gender']=='Male'){
        document.getElementById("option-1").checked= true;
      }else if(student['gender']=='Female'){
        document.getElementById("option-2").checked= true;
    }  
}

window.onload = function(){
    load();
}

var clickOn = function(str){
  document.getElementById(str).click();
}
function readURL(input , str) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          document.getElementById(str).setAttribute('src', e.target.result);
          // student['pic'] = e.target.result;
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
  student = all_data[student_id]
  if(validateForm()){
    if(student_id!=document.getElementById("StudentID").value){
      all_data[document.getElementById("StudentID").value]=all_data[student_id];
      delete data[student_id];
      student_id=document.getElementById("StudentID").value;
      }
    student['name'] = document.getElementById("StudentName").value;
    student['bdate'] = document.getElementById("StudentBDate").value;
    student['gpa'] = document.getElementById("StudentGPA").value;
    student['phone'] = document.getElementById("StudentNumber").value;
    student['email'] = document.getElementById("StudentEmail").value;
    student['level'] = document.getElementById("level").value;
    student['status'] = document.getElementById("status").value;
    student['department'] = document.getElementById("deps").value;
    student['picture'] = document.getElementById("profilePic").files[0]
    if(document.getElementById('option-1').checked){
      student['gender']="Male";
    }else if(document.getElementById('option-2').checked){
      student['gender']="Female";
  
    }
    alert("Student Updated Successfully");
        
  } 
    data = new FormData();
    for(var key in student){
      data.append(key,student[key])
    }
    console.log(data)
    csrf_token = $('input[name="csrfmiddlewaretoken"]').val();
					
    //console.log(csrf_token);
    
    data.append("csrfmiddlewaretoken", csrf_token);
    //update the database
    setStudent(data,function(response){});
    //makes the current id a url parameter
    document.getElementById("StudentID").value = student_id;
  }
        
);

function deleteStudent(){
  if (confirm("Are you sure you want to delete this student?")==true){
    student = all_data[student_id]
    deletestud(student,function(response){});
  }
}
