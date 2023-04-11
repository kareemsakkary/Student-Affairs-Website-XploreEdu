function update() {
    var urlParams = new URLSearchParams(window.location.search);
    document.getElementById("submit_id").value = urlParams.get("id");
}
