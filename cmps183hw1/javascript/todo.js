function showAll(){
  var todolist = document.getElementsByClassName("todoItem");
  // console.log(todolist);
  for(i = 0; i < todolist.length; i++){
    todolist[i].style.display = "block";
  }
}

function showTodo(){
  var todolist = document.getElementsByClassName("todoItem");
  // console.log(todolist);
  for(i = 0; i < todolist.length; i++){
    if(todolist[i].getElementsByTagName("input")[0].checked){
      console.log(todolist[i]);
      todolist[i].style.display = "none";
    }else{
      todolist[i].style.display = "block";
    }
  }
}

function showCompleted(){
  var todolist = document.getElementsByClassName("todoItem");
  // console.log(todolist);
  for(i = 0; i < todolist.length; i++){
    if(todolist[i].getElementsByTagName("input")[0].checked){
      console.log(todolist[i]);
      todolist[i].style.display = "block";
    }else{
      todolist[i].style.display = "none";
    }
  }
}
