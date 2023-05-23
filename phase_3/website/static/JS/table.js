var all_data = {};

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


const tbdoy = document.getElementById('main_tbody')
const row_template = (name, id, gpa, email, phone,level,state = false,) => {
    let template = `
    <td><input type="radio" name = 'id' value="${id}"  class = 'select' required></td>
    <td>${id}</td>
    <td>${name}</td>
    <td>${gpa}</td>
    <td>${level}</td>
    <td>${email}</td>
    <td>${phone}</td>
    `
    if(state != false){
        template += `<td>${state}</td>`
    }
    return template
} 

function check_departmen_able(e){
    const department_button = document.querySelector('#department_submit')
    department_button.title = ''
    department_button.disabled = false
    const id_input = document.querySelector('input[name="id"]:checked');
    const student = all_data[id_input.value]
    if(student['level'] != 3){
        department_button.disabled = true
        department_button.title = 'Student must be level three'
    }
}

function set_onclick_disable_department(){
    const rows = document.querySelectorAll('.select')
    rows.forEach(element => {
        element.addEventListener('click',(e)=>{
            check_departmen_able(e)
        })
    });
}
function set_onclick_for_row(){
    const rows = document.querySelectorAll('.student_row')
    rows.forEach(element => {
        element.addEventListener('click',(e)=>{
            const id_input = element.querySelector('input[name="id"]');
            id_input.checked = true
            check_departmen_able(e)
        })
    });
}
function set_rows(rows, active_only = true) {
    tbdoy.innerHTML = ''
    for (stud in rows) {
        student = rows[stud]
        if(active_only && student['status'] != 'Active'){
            continue
        }

        const row = document.createElement('tr')
        row.classList = ['student_row']
        row.id = `${student['id']}`
        let template = ''
        if(active_only){
            template = row_template(student['name'], student['id'], student['gpa'], student['email'], student['phone'],student['level'])
        }else{
            template = row_template(student['name'], student['id'], student['gpa'], student['email'], student['phone'],student['status'])
            template = row_template(student['name'], student['id'], student['gpa'], student['email'], student['phone'],student['level'],student['status'])
        }
        row.innerHTML = template
        tbdoy.appendChild(row)
    }
    set_onclick_for_row()
    set_onclick_disable_department()
}
const search_input = document.getElementById('search')
function test_search_student(value, student) {
    const reg = RegExp(value.toLowerCase())
    const string_to_test = `${student['name']},${student['id']},${student['email']},${student['phone']},`
    return reg.test(string_to_test.toLowerCase());
}