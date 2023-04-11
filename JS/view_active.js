all_data = []
function set_all_data(){
    all_data =  [
        {
            'name' : 'Kareem',
            'id' : '20210301',
            'gpa' : 4,
            'email' : 'Kareem@gmail.com',
            'phone' : '01204124124',
        },
        {
            'name' : 'Kareem 2',
            'id' : '20210302',
            'gpa' : 3.2,
            'email' : 'Kareem@gmail.com',
            'phone' : '01204124124',
        },
        {
            'name' : 'Kareem 3',
            'id' : '20210302',
            'gpa' : 3,
            'email' : 'Kareem@gmail.com',
            'phone' : '01204124124',
        },
        {
            'name' : 'Kareem 4',
            'id' : '20210303',
            'gpa' : 4,
            'email' : 'Kareem@gmail.com',
            'phone' : '01204124124',
        },
    ]
}
const tbdoy = document.getElementById('main_tbody')
const row_template = (name,id,gpa,email,phone) => `
<td><input type="radio" name = 'id' value="${id}" class = 'select'></td>
<td>${id}</td>
<td>${name}</td>
<td>${gpa}</td>
<td>${email}</td>
<td>${phone}</td>

`
function set_rows(rows){
    tbdoy.innerHTML = ''
    for(student of rows){
        const row = document.createElement('tr')
        row.id = `row_${student['id']}` 
        row.innerHTML = row_template(student['name'],student['id'],student['gpa'],student['email'],student['phone'],)
        tbdoy.appendChild(row)
    }
}
window.onload = ()=>{
    set_all_data()
    set_rows(all_data)
};
const search_input = document.getElementById('search')
function test_search_student(value,student){
    const reg = RegExp(value.toLowerCase())
    const string_to_test = `${student['name']},${student['id']},${student['email']},${student['phone']},`
    return reg.test(string_to_test.toLowerCase());
}
search_input.addEventListener('keyup',(e)=>{
    const value = search_input.value
    if (value.length == 0){
        set_rows(all_data)
        return
    }
    let valid_data = []
    for(student of all_data){
        if(test_search_student(value,student)){
            valid_data.push(student)
        }
    }
    set_rows(valid_data)
})