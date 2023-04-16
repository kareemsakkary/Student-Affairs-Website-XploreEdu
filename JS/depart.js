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
    document.getElementById("studname").innerText = student['studentName'];
    document.getElementById("studid").innerText = student_id;
    document.getElementById("deps").value = student['deparment'];
}

function verify_level(){
    //checks if student exists
    if (student == undefined){
        alert("Student doesn\'t exist");
        return;
    }
    //checks if student level is 3 or higher to assign department
    if (student['level'] === "3"){
        student['deparment'] = document.getElementById("deps").value;
        alert('Changes made successfully!');
    }
    // if not 3 or higher, the department returns to N/A
    else{
        alert('This student must be level 3');
    }
    //update the local storage
    data[student_id] = student;
    localStorage.setItem("data",JSON.stringify(data));
    //makes the current id a url parameter
    document.getElementById("submit_id").value = student_id;
}
