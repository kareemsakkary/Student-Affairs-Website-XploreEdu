// studentName , Bdate , gender , phone , email , GPA , level , deparment , status("active","inactive")

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
    data[id] = student;
    localStorage.setItem("data",JSON.stringify(data));
    var x = Number(size())+1;
    if(x == NaN) x = 1;
    console.log(x);
    localStorage.setItem("count",(x).toString());
    
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