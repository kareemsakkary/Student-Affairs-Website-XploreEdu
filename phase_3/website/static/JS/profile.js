

// function getStudents(callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', '/getStudents', true);
    
//     xhr.onreadystatechange = function() {
//     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//         var response = JSON.parse(xhr.responseText);
//         var students = response.students;  // Assuming the response is in JSON format with a 'students' key
//         callback(students);  // Invoke the callback function with the students data
//     }
//     };
//     xhr.send();
// }
// const all_data = {};

// function displayStudents(students) {
//     for(const student of students){
//         all_data[student.id] = student;
//     }
// }



// getStudents(displayStudents);

// console.log("updated3")
// console.log(all_data);


