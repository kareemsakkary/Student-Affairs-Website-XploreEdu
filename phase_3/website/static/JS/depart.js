
function setStudent(data, callback) {
    var xhr = new XMLHttpRequest();
    var url = '/setStudent';

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

function getStudents(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/getStudents', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var students = response.students;  // Assuming the response is in JSON format with a 'students' key
            callback(students);  // Invoke the callback function with the students data
        }
    };
    xhr.send();
}
var all_data = {};
function set_all_data(students) {
    for(const student of students){
        all_data[student.id] = student;
    }
}
getStudents(set_all_data);


window.onload = function(){
    student = all_data[student_id];
    //checks if student exists
    if (student == undefined)
        return;
    //display student info
    document.getElementById("studname").innerText = student['name'];
    document.getElementById("studid").innerText = student_id;
    document.getElementById("deps").value = student['department'];
}

function verify_level(){
    student = all_data[student_id];
    //checks if student exists
    if (student == undefined){
        alert("Student doesn\'t exist");
        return;
    }
    //checks if student level is 3 or higher to assign department
    if (student['level'] == "3"){
        student['department'] = document.getElementById("deps").value;
        alert('Changes made successfully!');
    }
    // if not 3 or higher, the department returns to N/A
    else{
        alert('This student must be level 3');
    }
    //update the database
    setStudent(student,function(response){});
    //makes the current id a url parameter
    document.getElementById("submit_id").value = student_id;
}
