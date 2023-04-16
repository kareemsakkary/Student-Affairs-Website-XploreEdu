all_data = []
function set_all_data() {
    all_data = []
    const all_students = getData()
    for (const student in all_students) {
        const student_data = all_students[student]
        all_data.push({
            'id' : student,
            'Bdate':student_data['Bdate'],
            'gpa':student_data['GPA'],
            'department':student_data['department'],
            'email':student_data['email'],
            'gender':student_data['gender'],
            'level':student_data['level'],
            'phone':student_data['phone'],
            'status':student_data['status'],
            'name':student_data['studentName']
        })
    }
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
    department_button.disabled = false
    const id_input = document.querySelector('input[name="id"]:checked');
    const data = getData()
    const student = data[id_input.value]
    if(student['level'] < 3){
        department_button.disabled = true
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
function set_rows(rows,active_only = true) {
    tbdoy.innerHTML = ''
    for (student of rows) {
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