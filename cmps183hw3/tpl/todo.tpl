<!DOCTYPE html>
<html>
<head>
  <title>cmps183: Homework 3</title>
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
  <meta charset="UTF-8">
  <script src="/scripts/edit.js"></script>
</head>

<body>

  <header>
    <h3>cmps183: Homework 3</h3>
  </header>

  <div class="topnav">
    <a href="/index">Home</a>
    <a class="active" href="/list">Todo</a>
    <a href="/new">Todo Form</a>
  </div>

  <div class="container">

    <div class="left-bar">
      <h2>Howdy!</h2>
      <div class="search-settings">
        <p>
          Lots of help from <a href="www.sqlite.org/">sqlite's</a> website.
        </p>
        <br>
        <p>
          More help from <a href="bottlepy.org">bottlepy's</a> website.
        </p>
        <br>
        <p>
          And from <a href="docs.python.org">python's</a> doc pages.
        </p>
        <br>
        <p>
          And my roommate help alot with debugging and explaining things from the previous website's.
        </p>
      </div>
    </div>

    <div class="main">
      <h1>Todo list</h1>

      <form method="post" action="/list">
        <p>Please select your preferred sorting:</p>
        <div>
          <input type="radio" id="showChoice1" name="show" value="all"
          % if sort[0] == 'all' :
            checked
          % end
          >
          <label for="showChoice1">Show all</label>
          <input type="radio" id="showChoice2" name="show" value="completed"
          % if sort[0] == 'completed' :
            checked
          % end
          >
          <label for="showChoice2">Show completed</label>
          <input type="radio" id="showChoice3" name="show" value="todo"
          % if sort[0] == 'todo' :
            checked
          % end
          >
          <label for="showChoice3">Show to do</label>
          <br>
          <input type="radio" id="sortChoice1" name="sort" value="posted"
          % if sort[1] == 'posted' :
            checked
          % end
          >
          <label for="sortChoice1">Posted Date</label>
          <input type="radio" id="sortChoice2" name="sort" value="due"
          % if sort[1] == 'due' :
            checked
          % end
          >
          <label for="sortChoice2">Due Date</label>
          <input type="radio" id="sortChoice3" name="sort" value="updated"
          % if sort[1] == 'updated' :
            checked
          % end
          >
          <label for="sortChoice3">Updated Date</label>
          <br>
          <input type="radio" id="directionChoice2" name="direction" value="asc"
          % if sort[2] == 'asc' :
            checked
          % end
          >
          <label for="directionChoice2">Ascending</label>
          <input type="radio" id="directionChoice3" name="direction" value="desc"
          % if sort[2] == 'desc' :
            checked
          % end
          >
          <label for="directionChoice3">Descending</label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      <div id="todoListDisplay">
        <%

        for el in list:
          include('tpl/item.tpl', element=el, edit=edititem)
        end

        %>
      </div>
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
