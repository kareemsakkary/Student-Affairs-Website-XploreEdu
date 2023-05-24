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
function display_student(){
    //checks if student exists
        if (student == undefined){
            return;
        }
        console.log(student);
        //display student info
        document.getElementById("submit_id").value = student_id;
        document.getElementById("studid").textContent  = student_id;
        document.getElementById("studname").textContent  = student["name"];
        document.getElementById("studbirth").textContent  = student["bdate"];
        document.getElementById("gpa").textContent  = student["gpa"];
        document.getElementById("studphone").textContent  = student["phone"];
        document.getElementById("studmail").textContent  = student["email"];
        document.getElementById("lvl").textContent  = student["level"];
        document.getElementById("depart").textContent  = student["department"];
        document.getElementById("status").textContent  = student["status"];
        picurl = '/media/';
        document.getElementById("profilePic").setAttribute('src' , picurl + student['picture']);
        document.getElementById("studgender").textContent  = student["gender"];

    }
    
window.onload = function(){
    load();
}
