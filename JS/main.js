// studentName , Bdate , gender , phone , email , GPA , level , department , status("Active","Inactive")

function getData(){
    var x  =   JSON.parse(localStorage.getItem("data"));
    if(x!= null)  {
        return x ;
    }else{
        return {};
    }
}

function setStudent(id,student){   
    var data = getData();
    var x = Number(size())+1;
    if(x == NaN) x = 1;
    console.log(x);
    if(data[id] == null || data[id]=="")
        localStorage.setItem("count",(x).toString());
    data[id] = student;
    localStorage.setItem("data",JSON.stringify(data));

}
function size(){
    var x = localStorage.getItem("count");
    if(x==null || x == NaN) return "0";
    return localStorage.getItem("count");
}
function format(){
    localStorage.removeItem("data");
    localStorage.removeItem("count");
}