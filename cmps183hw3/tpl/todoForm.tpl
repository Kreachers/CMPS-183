<!DOCTYPE html>
<html>
<head>
  <title>cmps183: Homework 3</title>
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
  <meta charset="UTF-8">
  <!-- <script src="javascript/todoForm.js"></script> -->
</head>

<body>

  <header>
    <h3>cmps183: Homework 3</h3>
  </header>

  <div class="topnav">
    <a href="/index">Home</a>
    <a href="/list">Todo</a>
    <a class="active" href="/new">Todo Form</a>
  </div>

  <div class="container">

    <div class="left-bar">
      <h2>Howdy!</h2>
      <div class="search-settings">
        <p>
          I used alot of the same websites listed on the list page.
        </p>
        <br>
        <p>
          This part was signifigantly easier then the list page.
        </p>
      </div>
    </div>

    <div class="main">
      <h1>Create todo Item</h1>
      <form name="todoForm" method="post" action="/new">
        <label for="titleInput">Title:</label><br>
        <input id="titleInput" type="text" name="title" value=""><br>

        <label for="dateInput">Due Date:</label><br>
        %if validDate:
          <input id="dateInput" type="date" name="dueDate" value=""><br>
        %else:
          <font color="red"> Please enter a date after todays date</font><br>
          <input id="dateInput" type="date" name="dueDate" value=""><br>
        %end
        <label for="notesInput">Notes:</label><br>
        <input id="notesInput" type="text" name="notes" value=""><br><br>

        <button type="submit" onsubmit="return checkDate()">Submit</button>
      </form>
    </div>

  </div>

  <footer>
    <a class="footerAnchor" href="#">About Us</a>
    <a class="footerAnchor" href="#">Contact</a>
    <a class="footerAnchor" href="#">Privacy</a>
    <a class="footerAnchor" href="#">Credits</a>
  </footer>

</body>
</html>
