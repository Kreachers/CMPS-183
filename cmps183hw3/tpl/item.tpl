<script type="text/javascript">

element = [
  {{element[0]}},
  '{{element[1]}}',
  '{{element[2]}}',
  '{{element[3]}}',
  '{{element[4]}}',
  '{{element[5]}}',
  '{{element[6]}}',
]

</script>

<div class="todoItem">
  %if edit != element[0] :
  <form method="get" action="/edit/{{element[0]}}">
    <p>
      <input name="status" type="checkbox" onchange="edit({{element[0]}}, element)"
      % if element[6] == 1 :
        checked
      % end
      >
      <span class="titleTemplate">Title: {{element[1]}}</span>
    </p>
    <p>
      <span class="dueDateTemplate">Due Date: {{element[4]}}</span>
    </p>
    <p>
      <span class="notesTemplate">Description: {{element[2]}}</span>
    </p>
    <p class="postedOnTemplate">Posted On: {{element[3]}}</p>
    <p class="lastUpdatedTemplate">Last Updated: {{element[5]}}</p>

    <button class="editButton" type="submit">Edit</button>
  </form>
  <form method="post" action="/delete/{{element[0]}}">
    <button class="deleteButton" type="submit">Delete</button>
  </form>
  %else :
  <form method="post" action="/edit/{{element[0]}}">
    <p>
      <input name="status" type="checkbox" onchange="edit({{element[0]}}, element)"
      % if element[6] == 1 :
        checked
      % end
      >
      <span class="titleTemplate">Title: </span>
      <input class="titleTemplateInput" type="text" name="title" value="{{element[1]}}">
    </p>
    <p>
      <span class="dueDateTemplate">Due Date: </span>
      <input class="dueDateTemplateInput" type="date" name="dueDate" value="{{element[4]}}">
    </p>
    <p>
      <span class="notesTemplate">Description: </span>
      <input class="notesTemplateInput" type="text" name="notes" value="{{element[2]}}">
    </p>
    <p class="postedOnTemplate">Posted On: {{element[3]}}</p>
    <p class="lastUpdatedTemplate">Last Updated: {{element[5]}}</p>
    <button class="editButton" type="submit">Submit</button>
  </form>
  <form action="/list">
    <button type="submit">Cancel</button>
  </form>
%end
</div>
