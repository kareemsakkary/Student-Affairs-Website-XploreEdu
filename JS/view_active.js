
window.onload = () => {
    set_all_data()
    set_rows(all_data)
};

search_input.addEventListener('keyup', (e) => {
    const value = search_input.value
    if (value.length == 0) {
        set_rows(all_data,)
        return
    }
    let valid_data = []
    for (student of all_data) {
        if (test_search_student(value, student)) {
            valid_data.push(student)
        }
    }
    set_rows(valid_data,)
})