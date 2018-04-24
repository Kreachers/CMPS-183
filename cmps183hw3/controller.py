from bottle import route, run, debug, template, static_file, get, post, request, redirect
import sqlite3
import random
import datetime

#connect to database file
database = sqlite3.connect('todo.db')
# create cursor to
cursor = database.cursor()

# Create table
cursor.execute('''CREATE TABLE IF NOT EXISTS
                  todoList(
                  id INTEGER primary key,
                  title TEXT,
                  description TEXT,
                  posted DATE,
                  due DATE,
                  updated DATE,
                  status BOOL
                  )''')
# define sorting variable
#           show, sort by, direction
sorting = ['all','posted','desc']

#enable debugging
debug(True)

#home page/index page
@route('/')
@route('/index')
def index():
    # We can also close the connection if we are done with it.
    # Just be sure any changes have been committed or they will be lost.
    # database.close()
    return template('index.html')


@get('/list')
def list():
    return template('tpl/todo.tpl', list=databaseStuff(), edititem=-1, sort=sorting)

@post('/list')
def list():
    form = request.forms

    show = form.get('show')
    sort = form.get('sort')
    direction = form.get('direction')

    # print(show)
    # print(sort)
    # print(direction)

    sorting[0] = show
    sorting[1] = sort
    sorting[2] = direction

    print(sorting)

    return template('tpl/todo.tpl', list=databaseStuff(), edititem=-1, sort=sorting)

def databaseStuff():
    if sorting[0] == 'all':
        show = 2
    elif sorting[0] == 'completed':
        show = 0
    else:
        show = 1
        
    print(sorting)
    print(show)
    cursor.execute('''SELECT * FROM todoList WHERE status!=? ORDER BY %s %s ''' %(sorting[1],sorting[2]), (show,))
    return cursor.fetchall()

@route('/new')
def get_new():
    return template('tpl/todoForm.tpl', validDate=True)

@post('/new')
def post_new():
    # make it easier to get form data
    form = request.forms
    #retreive data from form
    title = form.get('title')
    # print(type(form.get('dueDate')))
    # print(form.get('dueDate'))
    # dueDate = datetime.datetime.strptime(form.get('dueDate'), '%Y-%m-%d')
    dueDate = form.get('dueDate')
    notes = form.get('notes')
    todayDate = datetime.date.today().isoformat()
    editDate = datetime.date.today().isoformat()
    #print data from form
    # print("title  = " + title)
    # print("due date = " + dueDate)
    # print("notes = " + notes)
    # print("todayDate = " + todayDate)
    # print("editDate = " + editDate)
    #check if due date is after todays date
    if(dueDate >= todayDate) :
        #create item from form data
        item = (random.randint(0,2147483647), title, notes, editDate, dueDate, editDate, 0)
        # print(item)
        #pass item into add_item to create item and switch to list page
        return add_item(item)
    else :
        return template('tpl/todoForm.tpl', validDate=False)

def add_item(item):
    # Insert a row of data
    cursor.execute('INSERT INTO todoList VALUES(?,?,?,?,?,?,?)', item)
    # Save (commit) the changes
    database.commit()
    redirect('/list')

@get('/edit/<id:int>')
def callback(id):
    return template('tpl/todo.tpl', list=databaseStuff(), edititem=id)

@post('/edit/<id:int>')
def callback(id):

    form = request.forms
    title = form.get('title')
    notes = form.get('notes')
    dueDate =  form.get('dueDate')
    updated = datetime.date.today().isoformat()
    status = form.get('status')

    # print("title = " + title)
    # print("description = " + notes)
    # print("due date = " + dueDate)
    # print("updated date = " + updated)
    # print("status")
    # print(status)

    if status is "on" :
        item = (title,notes,dueDate,updated,True,id)
        # print(item)
        cursor.execute('''UPDATE todoList SET title=?, description=?, due=?, updated=?, status=? WHERE id = ?''',item)
        database.commit()
    else :
        item = (title,notes,dueDate,updated,False,id)
        # print(item)
        cursor.execute('''UPDATE todoList SET title=?, description=?, due=?, updated=?, status=? WHERE id = ?''',item)
        database.commit()

    # return template('tpl/todo.tpl', list=databaseStuff(), edititem=id)
    redirect('/list')

@post('/edit/<id:int>/status')
def edit_status(id) :
    # print("hello")
    checked = request.forms.get('status')
    print(request.forms.get('status'))
    # if request.forms.get('status') == 'on':
    #     checked = 1
    # else :
    #     checked = 0
    cursor.execute('''UPDATE todoList SET status=? WHERE id=?''', (checked,id))
    database.commit()
    redirect('/list')

@post('/delete/<id:int>')
def callback(id):
    # print(id)
    cursor.execute('''DELETE FROM todoList WHERE id = ?''', (id,))
    database.commit()
    redirect('/list')

# Change order #######################################################
def asc_vs_desc():
    # print(sorting)
    if sorting[2] is 'asc' :
        sorting[2] = 'desc'
        # print(sorting)
    else:
        sorting[2] = 'asc'
        # print(sorting)
    redirect('/list')

def showAll():
    # print(sorting)
    sorting[0] = 'all'
    # print(sorting)
    redirect('/list')

def showCompleted():
    # print(sorting)
    sorting[0] = 'completed'
    # print(sorting)
    redirect('/list')

def showTodo():
    # print(sorting)
    sorting[0] = 'todo'
    # print(sorting)
    redirect('/list')

def sortPosted():
    # print(sorting)
    sorting[1] = 'posted'
    # print(sorting)
    redirect('/list')

def sortUpdate():
    # print(sorting)
    sorting[0] = 'updated'
    # print(sorting)
    redirect('/list')

def sortDue():
    # print(sorting)
    sorting[0] = 'due'
    # print(sorting)
    redirect('/list')

# Static Files########################################################
@route('/<action:path>/css/<filename:path>')
def static_css_long(action, filename):
    return static_css(filename)

@route('/css/<filename:path>')
def static_css(filename):
    return static_file(filename, root='./css/')

@route('/pictures/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./pictures/')

@route('/scripts/<filename:path>')
def send_static(filename):
    return static_file(filename, root='./scripts/')

# Run ################################################################

run(host='localhost', port=8080, reloader=True)
