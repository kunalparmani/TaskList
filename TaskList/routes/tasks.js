var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db=mongojs('mongodb://kunalparmani:kunal123@ds141454.mlab.com:41454/demoapp7620',['tasks']);
//get all the tasks
router.get('/tasks',function(req,res){
  db.tasks.find(function(err,tasks){
    if(err) {
      res.send(err);
    }
    res.json(tasks);
  });
});
//get single tasks
router.get('/tasks/:id',function(req,res){
  db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
});

//Save a task
router.post('/tasks',function(req,res,next){
  var task = req.body;
  if(!task.title || !(task.isDone + ' ')){
    res.status(400);
    res.json({
      "error":"Bad Data1"
    });
  }else{
    db.tasks.save(task,function(err,task){
      if(err){
        res.send(err)
      }
      res.json(task);
    })
  }
})

//delete task
router.delete('/tasks/:id',function(req,res,next){
  db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
});
//update task
router.put('/tasks/:id',function(req,res,next){
  var task=req.body;
  var updtask = {};
  if(task.isDone){
    updtask.isDone=task.isDone;
  }
  if(task.title){
    updtask.title=task.title;
  }
  if(!updtask){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });

  }else {
    db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updtask,{},function(err,task){
      if(err) {
        res.send(err);
      }
      res.json(task);

    });
}
  });

module.exports=router;
