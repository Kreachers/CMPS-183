var todoList = [];
var ascending = false;


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
function createTodoItem(item){
  // console.log("createtodoList executed");
  // console.log("Checked: " + item.checked);
  // console.log("Title: " + item.title);
  // console.log("Due Date: " + item.dueDate);
  // console.log("Notes: " + item.notes);
  // console.log("Created on: " + item.inputDate);
  // console.log("Last Edited: " + item.editDate);

  //get Template
  var temp = document.getElementById("todoItemTemplate").content.querySelector("div");

  var todoListDisplay = document.getElementById("todoListDisplay");

  //Duplicate it
  var div = temp.cloneNode(true);
  div.item = item;

  div.getElementsByTagName("input")[0].checked = item.checked;
  div.getElementsByClassName("titleTemplate")[0].innerHTML = item["title"];
  div.getElementsByClassName("dueDateTemplate")[0].innerHTML = item.dueDate;
  div.getElementsByClassName("notesTemplate")[0].innerHTML = item.notes;
  div.getElementsByClassName("postedOnTemplate")[0].innerHTML = item.inputDate;
  div.getElementsByClassName("lastUpdatedTemplate")[0].innerHTML = item.editDate;

  div.getElementsByClassName("editButton")[0].onclick = function(){editItem(div, item)};
  div.getElementsByClassName("deleteButton")[0].onclick = function(){deleteItem(div, item)};


  // console.log(div);

  todoListDisplay.appendChild(div);

  // console.log("");
}
function editItem(div, item){
  console.log("edit item button pushed");
  // console.log(div);
  console.log(item);

  div.getElementsByClassName("titleTemplate")[0].className = "titleTemplate hidden";
  div.getElementsByClassName("dueDateTemplate")[0].className = "dueDateTemplate hidden";
  div.getElementsByClassName("notesTemplate")[0].className = "notesTemplate hidden";

  div.getElementsByClassName("titleTemplateInput")[0].className = "titleTemplateInput";
  div.getElementsByClassName("dueDateTemplateInput")[0].className = "dueDateTemplateInput";
  div.getElementsByClassName("notesTemplateInput")[0].className = "notesTemplateInput";

  div.getElementsByClassName("titleTemplateInput")[0].value = div.getElementsByClassName("titleTemplate")[0].innerHTML;
  div.getElementsByClassName("dueDateTemplateInput")[0].value = div.getElementsByClassName("dueDateTemplate")[0].innerHTML;
  div.getElementsByClassName("notesTemplateInput")[0].value = div.getElementsByClassName("notesTemplate")[0].innerHTML;

  div.getElementsByClassName("editButton")[0].innerHTML = "Submit";
  div.getElementsByClassName("editButton")[0].onclick = function(){confirmEdit(div, item)};
}
function confirmEdit(div, item){
  console.log("confirm button pushed");
  console.log(item);

  div.getElementsByClassName("titleTemplate")[0].className = "titleTemplate";
  div.getElementsByClassName("dueDateTemplate")[0].className = "dueDateTemplate";
  div.getElementsByClassName("notesTemplate")[0].className = "notesTemplate";

  div.getElementsByClassName("titleTemplateInput")[0].className = "titleTemplateInput hidden";
  div.getElementsByClassName("dueDateTemplateInput")[0].className = "dueDateTemplateInput hidden";
  div.getElementsByClassName("notesTemplateInput")[0].className = "notesTemplateInput hidden";

  div.getElementsByClassName("titleTemplate")[0].innerHTML = div.getElementsByClassName("titleTemplateInput")[0].value;
  div.getElementsByClassName("dueDateTemplate")[0].innerHTML = div.getElementsByClassName("dueDateTemplateInput")[0].value;
  div.getElementsByClassName("notesTemplate")[0].innerHTML = div.getElementsByClassName("notesTemplateInput")[0].value;

  div.getElementsByClassName("editButton")[0].innerHTML = "Edit";
  div.getElementsByClassName("editButton")[0].onclick = function(){editItem(div, item)};

  // console.log(item);
  var date = new Date();
  item.title = div.getElementsByClassName("titleTemplate")[0].innerHTML;
  item.dueDate = div.getElementsByClassName("dueDateTemplate")[0].innerHTML;
  item.notes = div.getElementsByClassName("notesTemplate")[0].innerHTML;
  item.editDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  console.log(item);
  store();
  window.location.href = "./todo.html";
}
function deleteItem(div, item){
  console.log("delete item button pushed");

  for (var i = 0; i < todoList.length; i++) {
    console.log(i);
    if(todoList[i] == item){
      todoList.splice(i,1);
      console.log("if = true");
    }
  }
  console.log(todoList);

  store();
  location.reload();

}
function createList(){
  // for (var i = 0; i < todoList.length; i++) {
  //   // console.log(todoList[i]);
  //   console.log("");
  //   console.log("checked: " + todoList[i].checked);
  //   console.log("Title: " + todoList[i].title);
  //   console.log("Due date: " + todoList[i].DueDate);
  //   console.log("Notes: " + todoList[i].Notes);
  //   console.log("Posted on: " + todoList[i].PostedOn);
  //   console.log("Last updated: " + todoList[i].LastUpdated);
  // }

  for (var i = 0; i < todoList.length; i++) {
    createTodoItem(todoList[i]);
  }
}
function store(){
  console.log(todoList);
  localStorage.setItem("array", JSON.stringify(todoList));
}
function load(){
  if(localStorage.getItem("array") != null){
    todoList = JSON.parse(localStorage.getItem("array"));
  }
  console.log(todoList);
}
function clearStorage(){
  localStorage.clear();
}
function fetchParams(){
  // console.log(window.location.search);

  var url = window.location.search.substr(1);
  if(url == "") return;
  var params = url.split('&');

  // console.log(params);

  paramsDict = {};

  for (var i = 0; i < params.length; i++) {

    var key = formatParam(params[i].split("=")[0])
    var value = formatParam(params[i].split("=")[1])

    // console.log(key);
    // console.log(value);

    paramsDict[key]=value;

  }

  paramsDict["checked"] = false;
  var date = new Date();
  paramsDict["inputDate"] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  paramsDict["editDate"] = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  // console.log(paramsDict);
  var bool = true;

  for (var i = 0; i < todoList.length; i++) {
    if(todoList[i].title == paramsDict.title) bool = false;
  }
  // console.log(todoList);
  if(bool)todoList.push(paramsDict);
  console.log(todoList);
  // createTodoItem(paramsDict);

}
function formatParam(item){
  item.replace(/\+/g,' ');
  item = decodeURIComponent(item);
  return item;
}
function ascendingVsDescending(){
  ascending = !ascending;
  if(ascending) document.getElementsByClassName("ascendingVsDescending")[0].innerHTML = "Ascending"
  if(!ascending) document.getElementsByClassName("ascendingVsDescending")[0].innerHTML = "Descending"
  console.log(ascending);
}

function sortPosted(){
  console.log("sort Posted");
  // console.log(document.getElementById("todoListDisplay").children);
  var arr = Array.from(document.getElementById("todoListDisplay").children);
  arr.sort(function(a,b){
    if(ascending){
      return new Date(a.item.inputDate) - new Date(b.item.inputDate)
    }else{
      return -(new Date(a.item.inputDate) - new Date(b.item.inputDate))
    }
  });

  for (var i = 0; i < arr.length; i++) {
    document.getElementById("todoListDisplay").appendChild(arr[i]);
  }
  console.log(arr);
}

function sortUpdate(){
  console.log("sort updated");
  // console.log(document.getElementById("todoListDisplay").children);
  var arr = Array.from(document.getElementById("todoListDisplay").children);
  arr.sort(function(a,b){
    if(ascending){
      return new Date(a.item.editDate) - new Date(b.item.editDate)
    }else{
      return -(new Date(a.item.editDate) - new Date(b.item.editDate))
    }
  });

  for (var i = 0; i < arr.length; i++) {
    document.getElementById("todoListDisplay").appendChild(arr[i]);
  }
  console.log(arr);
}

function sortDue(){
  console.log("sort due date");
  // console.log(document.getElementById("todoListDisplay").children);
  var arr = Array.from(document.getElementById("todoListDisplay").children);
  arr.sort(function(a,b){
    if(ascending){
      return new Date(a.item.dueDate) - new Date(b.item.dueDate)
    }else{
      return -(new Date(a.item.dueDate) - new Date(b.item.dueDate))
    }
  });

  console.log(arr);

  for (var i = 0; i < arr.length; i++) {
    document.getElementById("todoListDisplay").appendChild(arr[i]);
  }
  console.log(arr);
}

console.log("load");
load()
//console.log(localStorage);
console.log("fetch");
fetchParams();
console.log("store");
store();
console.log("create");
createList();
