var data = getData();
// console.log(data[20230001]);

// to get url parameters
var urlParams = new URLSearchParams(window.location.search); 
var student_id = urlParams.get("id");

var student = data[student_id];



//executes when page loads
window.onload = function(){
    //checks if student exsists
    if (student == undefined){
        console.log('doesnt exist');
        return;
    }
    //display student info
    document.getElementById("studname").innerText = student['studentName'];
    document.getElementById("studbirth").innerText = student['Bdate'];
    document.getElementById("studgender").innerText = student['gender'];
    document.getElementById("studmail").innerText = student['email'];
    document.getElementById("studphone").innerText = student['phone'];
    document.getElementById("studid").innerText = student_id;
    document.getElementById("gpa").innerText = student['GPA'];
    document.getElementById("lvl").innerText = student['level'];
    document.getElementById("depart").innerText = student['department'];
    document.getElementById("status").innerText = student['status'];
    //makes the current id a url parameter
    document.getElementById("submit_id").value = student_id;
}


