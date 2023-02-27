const listItem = require('/models/ToDoList');

//create
//Create One
async function createTask(req, res, next) {
    try {
        //pares out fields from POST request
        const name = req.body.name ;
        const description = req.body.description;

        //pass fields to new ListItem model
        //notice how it's way more organized and does the type checking for us
        const newListItem = new listItem({
            name, 
            description
        });

        //save our new entry to the database
        const savedData = await newListItem.save();

        //return the successful request to the user
        res.json({
            success: true,
            blogs: savedData
        });

    }  catch (e) {
        console.log(typeof e);
        console.log(e);
        res.json({
            error: e.toString(),
        })
    }
}

//Create Multiple Tasks

//Read
//Read All
async function getAllTasks(req, res){
    //query toDo List
try {
    const listItems = await listItem.find({});
    res.json({listItems: listItems});
    } catch(e) {
        console.log(e);
    }
}

//Update
//Update One
async function updateOneTask(req, res){
    try {
        const updates = {
            status: req.body.status

        } if(req.body.status === "complete") {
            updates.dateCompleted = Date.now();
            updates.completed = true;
        } 
        
        await listItem.updateOne({ name:req.params.name }, updates);
        res.json({success: true, updates: res.body});

        } catch(e){
            console.log(e);
        }
}

//Update Many

//Delete
//Delete One
