var bodyParser = require('body-parser')
const express = require('express')
const stdRoute=express.Router()
var jsonParser = bodyParser.json()
const Student=require('../models/student-schema')
const authMw=require('../middleware/auth-mw')













stdRoute.post('/addStudent',authMw,jsonParser,(req,res,next) =>{
  console.log("---Save Student---"+JSON.stringify(req.body))
  const std = new Student({
     name:req.body.name,
    branch:req.body.branch,
    //creator: req.userData.userId


  })
  // const std = new Student({
  //   name:'jenish',
  //   branch:'ICT'
  // })
  console.log('saving');
std.save().then(createdStudent=> {
  console.log('Successfully Saved..'+JSON.stringify(createdStudent))
  res.status(201).json({
    message:"Student added Successfully",
    studentId:createdStudent._id,
    student:createdStudent
  });
});
  console.log('code running');
})


stdRoute.get('/listStudents',(req,res) =>{
  console.log("Get Requnest happend");
  console.log(req.query)
  const pageSize = +req.query.pageSize;
  const pageIndex = +req.query.pageIndex;
  const stdQuery = Student.find()
  let fetchedStudent;

  if(pageSize && pageIndex){
    stdQuery
    .skip(pageSize * (pageIndex-1))
    .limit(pageSize)
  }
  // stdQuery.find().then(students =>{
  //   res.status(200).send(students);
  // })
  stdQuery
  .then(students =>{
    fetchedStudent=students;
    return Student.count();
  })
  .then(count =>{
    res.status(200).json({
      message:"Student fetched Successfully ",
      students:fetchedStudent,
      maxStudents:count
    });

  });

})


stdRoute.get('/listStudent',(req,res) =>{

  Student.find().then(student =>{
    res.status(200).send(student);
  })
 })


// exApp.get('/api/student',(req,res) =>{
//   students = [
//     {id:"1", name:"Jenish",brach:"ICT"},
//     {id:"2", name:"Dipesh",brach:"ICT"},
//     {id:"3", name:"Nimish",brach:"ICT"},
//   ];
//   res.status(200).send(students);
// })



// exApp.get('/api/faculty',(req,res) =>{
//   faculties = [
//     {id:"1",name:"Jenish sir",brach:"ICT"},
//     {id:"2",name:"Dipesh sir",brach:"ICT"},
//     {id:"3",name:"Nimish sir",brach:"ICT"},
//   ];
//   res.status(200).send(faculties);
// })

stdRoute.get('/student/:id',authMw,(req,res) =>{
   students = [
     {id:"1", name:"Jenish",brach:"ICT"},
     {id:"2", name:"Dipesh",brach:"ICT"},
     {id:"3", name:"Nimish",brach:"ICT"},
        ];
   console.log("Passed Id is:"+req.params.id);
   const foundStudent=students.filter(student=> student.id == req.params.id);
   res.status(200).send(foundStudent);
 })


stdRoute.post('/student',jsonParser,(req,res)=>{
 console.log('passed body :'+JSON.stringify(req.body));
   res.status(200).send(res.body)
 })


 stdRoute.get('/:id',(req,res) =>{

  Student.findOne({_id:req.params.id}).then(student =>{
    res.status(200).send(student);
  })

})

stdRoute.delete('/:id',authMw,(req,res) =>{
  Student.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result)
    res.status(200).json({message:"Student deleted"});
});
  console.log('code running');
})

stdRoute.put('/:id',authMw,jsonParser,(req,res) =>{
  console.log("---Save Student---"+JSON.stringify(req.body))
  const std = new Student({
    _id:req.body.id,
     name:req.body.name,
    branch:req.body.branch,
  //  creator: req.userData.userId
  })

Student.updateOne({_id:req.params.id,creator: req.userData.userId},std).then(upadateStudent=> {
  console.log('Updated Successfully Saved..'+JSON.stringify(upadateStudent))
  if(upadateStudent.nModified > 0){
    res.status(201).json({
      message:"Student Updated Successfully",

    });
  }
  else{
    res.status(401).json({
      message:"Unauthorize",

    });
  }

});

})


module.exports=stdRoute
