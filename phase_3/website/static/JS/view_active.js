function load_active(){
    fetch('/xploreedu/getStudents/')
    .then(response => response.json())
    .then(data => {
        arr = data['students']
        for ( studu in arr){
            console.log(arr[studu].id)
            all_data[arr[studu].id] = arr[studu];
        }
        search_function_active()

    })
}

window.onload = () => {
    load_active()
};


function search_function_active(){
    const value = search_input.value
    if (value.length == 0) {
        set_rows(all_data,)
        return
    }
    let valid_data = []
    for (stud in all_data) {
        if (test_search_student(value, all_data[stud])) {
            valid_data.push(all_data[stud])
        }
    }
    set_rows(valid_data,)
}

search_input.addEventListener('keyup', (e) => {
    search_function_active()
    load_active()
});