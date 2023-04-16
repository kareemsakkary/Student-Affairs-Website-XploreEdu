
window.onload = () => {
    set_all_data()
    set_rows(all_data,false)
};
function search_function(){
    const value = search_input.value
    if (value.length == 0) {
        set_rows(all_data,false)
        return
    }
    let valid_data = []
    for (student of all_data) {
        if (test_search_student(value, student)) {
            valid_data.push(student)
        }
    }
    set_rows(valid_data,false)
}
search_input.addEventListener('keyup', (e) => {
    search_function()
})
const activate_button = document.getElementById('activate')
const deactivate_button = document.getElementById('deactivate')

function alter_state(state){
    let id_input = document.querySelector('input[name="id"]:checked');
    if(!id_input){
        return
    }
    const id = id_input.value
    const student_data = getData()[id]
    student_data['status'] = state
    setStudent(id,student_data)
    set_all_data()
    search_function()
    const active_row = document.getElementById(id);
    id_input = active_row.querySelector('input[name="id"]')
    id_input.checked = true
}
activate_button.addEventListener('click',()=>{
    alter_state('Active')
})
deactivate_button.addEventListener('click',()=>{
    alter_state('Inactive')
})