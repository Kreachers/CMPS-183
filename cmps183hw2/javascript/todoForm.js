
  function checkDate(){
    console.log('form button clicked');
    var dueDate = document.getElementById("dateInput").value;
    var inputDate = new Date();
    console.log(dueDate);
    console.log(inputDate);

    //Convert both input to date type
    var dueToDate = Date.parse(dueDate);
    var inputToDate = Date.parse(inputDate);

    console.log(dueToDate);
    console.log(inputToDate);

    if (dueToDate > inputToDate) {
      console.log('input Date after due date');
      return true;
    }
    else if (dueToDate < inputToDate) {
      alert("The input is earlier than today. Please make the date later then today");
      console.log("The input is earlier than today. Please make the date later then today");
      return false;
    }
    else {
      alert("The input is same as today. You might want to make the due date after today.");
      console.log("The input is same as today. You might want to make the due date after today.");
      return false;
    }
  }
