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
            'deparment':student_data['deparment'],
            'email':student_data['email'],
            'gender':student_data['gender'],
            'level':student_data['level'],
            'phone':student_data['phone'],
            'statues':student_data['statues'],
            'name':student_data['studentName']
        })
    }
}
const tbdoy = document.getElementById('main_tbody')
const row_template = (name, id, gpa, email, phone,state = false,) => {
    let template = `
    <td><input type="radio" name = 'id' value="${id}" class = 'select' required></td>
    <td>${id}</td>
    <td>${name}</td>
    <td>${gpa}</td>
    <td>${email}</td>
    <td>${phone}</td>
    `
    if(state != false){
        template += `<td>${state}</td>`
    }
    return template
} 
function set_onclick_for_row(){
    const rows = document.querySelectorAll('.student_row')
    rows.forEach(element => {
        element.addEventListener('click',()=>{
            const id_input = element.querySelector('input[name="id"]');
            id_input.checked = true
        })
    });
}
function set_rows(rows,active_only = true) {
    tbdoy.innerHTML = ''
    for (student of rows) {
        if(active_only && student['statues'] != 'active'){
            continue
        }
        const row = document.createElement('tr')
        row.classList = ['student_row']
        row.id = `${student['id']}`
        let template = ''
        if(active_only){
            template = row_template(student['name'], student['id'], student['gpa'], student['email'], student['phone'],)
        }else{
            template = row_template(student['name'], student['id'], student['gpa'], student['email'], student['phone'],student['statues'])
        }
        row.innerHTML = template
        tbdoy.appendChild(row)
    }
    set_onclick_for_row()
}
const search_input = document.getElementById('search')
function test_search_student(value, student) {
    const reg = RegExp(value.toLowerCase())
    const string_to_test = `${student['name']},${student['id']},${student['email']},${student['phone']},`
    return reg.test(string_to_test.toLowerCase());
}