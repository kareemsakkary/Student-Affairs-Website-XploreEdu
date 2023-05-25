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
        display();
    })
}
    
function setStudent(data, callback) {
    var xhr = new XMLHttpRequest();
    var url = '/xploreedu/setStudent/';

    xhr.open('POST', url, true);

    // Set the appropriate headers for sending JSON data
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    
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

function display(){
    //checks if student exists
    if (student == undefined)
        return;
    //display student info
    document.getElementById("studname").innerText = student['name'];
    document.getElementById("studid").innerText = student_id;
    document.getElementById("deps").value = student['department'];
}


window.onload = function(){
    load();
    
}

function verify_level(){
    // student = all_data[student_id];
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
    data = new FormData();
    for(var k in student){
        data.append(k,student[k])
    }
    setStudent(data,function(response){});
    
    //makes the current id a url parameter
    document.getElementById("submit_id").value = student_id;
}
