// student name , Bdate , gender , phone , email , GPA , level , deparment , status("active","inactive")

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
}
