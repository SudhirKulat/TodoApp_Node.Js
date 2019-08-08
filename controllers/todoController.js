var bodyParser = require('body-parser');
var mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://127.0.0.1:27017/todo");

var newSchema = new mongoose.Schema({
        item: String
    });
var Todo = mongoose.model("Todo", newSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports=(app)=>{
    app.get('/todo',(req,res)=>{
        Todo.find({},(err,data)=>{
            debugger;
            if(err) throw err;
            res.render('todo',{data:data});
        })
    });

    app.post('/todo',urlencodedParser,(req,res)=>{
        var newTodo = Todo(req.body).save((err,data)=>{
            if(err) throw err;
            res.json(data);
        })
    });

    app.delete('/todo/:item',(req,res)=>{
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove((err,data)=>{
            if(err) throw err;
            res.json(data);
        })
    })
}

// mongodb://127.0.0.1:27017