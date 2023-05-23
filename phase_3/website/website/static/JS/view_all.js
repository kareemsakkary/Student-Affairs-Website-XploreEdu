// setInterval(function() {
//     // Make an Ajax request to the view
//     fetch('/getStudents')
//     .then(response => response.json())
//     .then(data => {
//         arr = data['students']
//         for ( studu in arr){
//             console.log(arr[studu].id)
//             all_data[arr[studu].id] = arr[studu];
//         }
//         console.log(all_data)
//         console.log('viewall')
//         search_function();
//     })
// }, 2000);

function load_all(){
    fetch('/xploreedu/getStudents/')
    .then(response => response.json())
    .then(data => {
        arr = data['students']
        for ( studu in arr){
            all_data[arr[studu].id] = arr[studu];
        }
        search_function();
    })
}

window.onload = () => {
    load_all()
};
function search_function(){
    const value = search_input.value
    if (value.length == 0) {
        set_rows(all_data,false)
        return
    }
    let valid_data = []
    for (stud in all_data) {
        if (test_search_student(value, all_data[stud])) {
            valid_data.push(all_data[stud])
        }
    }
    set_rows(valid_data,false)
}
search_input.addEventListener('keyup', (e) => {
    search_function()
    load_all()
})

const activate_button = document.getElementById('activate')
const deactivate_button = document.getElementById('deactivate')

function alter_state(state){
    let id_input = document.querySelector('input[name="id"]:checked');
    if(!id_input){
        return
    }
    const id = id_input.value
    const student_data = all_data[id]
    student_data['status'] = state
    setStudent(student_data,function(response){});
    // search_function()
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