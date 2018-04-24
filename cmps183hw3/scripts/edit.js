function edit(id, element){

  // console.log("hello");

  if(element[6] == 0) {
    element[6] = 1
  }else {
    element[6] = 0
  }

  console.log(element[6]);
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/edit/" + id + "/status", true)
  xhttp.send(`status=${element[6]}`);

}
