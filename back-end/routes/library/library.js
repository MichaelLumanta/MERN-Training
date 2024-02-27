const express = require("express")

const LibraryRoutes = express.Router()

const dbo = require("../../db/conn")
const { get } = require("mongoose")
const { ObjectId } = require("mongodb")


LibraryRoutes.route("/api/getBooks").get(function (req,res){

    let db_connect = dbo.getDb()

    var response = {
        remarks:"error",
        message:"",
        payload:[]
    }   

    db_connect.collection("Library").find({
      
    }).toArray(function (err,result){
        if(err){
            response.message = "Something Went Wrong"
            res.json(response)
            res.status(401);
            return
        }
        response.remarks = "Success"
        response.message = "Successfully fetch"
        response.payload = result

        res.json(response)
    })

})

LibraryRoutes.route("/api/storeBooks").post(function (req,res){
    
    var response = {
        remarks:"error",
        message:"",
        payload:[]
    }   
    


    const payload = req.body.payload

    if(!payload.book_name || !payload.author){
        response.message = "Incomplete Data Sent"
        res.json(response)
        res.status(400);
        return
    }

    let myObject = {
        book_name: payload.book_name,
        author : payload.author,       
    }

    console.log(myObject)

    let db_connect = dbo.getDb();
    
    // "INSERT INTO LIBRARY (myObject.keys) VALUES (myObject.value)"
    
    db_connect.collection("Library").insertOne(myObject,function(err,response){
        if(err){
            response.message = "Something Went Wrong"
            res.json(response)
            res.status(401);
            return
        }
        response.remarks = "Success"
        response.message = "Successfully added"        

        res.json(response)
    })




})

LibraryRoutes.route("/api/editBooks/:book_id").post(function (req,res){
    
    var response = {
        remarks:"error",
        message:"",
        payload:[]
    }       
    const payload = req.body.payload

    if(!payload.book_name || !payload.author){
        response.message = "Incomplete Data Sent"
        res.json(response)
        res.status(400);
        return
    }

    let myObject = {
        $set:{
            book_name: payload.book_name,
            author : payload.author,    
        }
          
    }
    let filter ={
        _id : ObjectId(req.params.book_id)
    }
   
    let db_connect = dbo.getDb();
    
    // "INSERT INTO LIBRARY (myObject.keys) VALUES (myObject.value)"
    
    db_connect.collection("Library").updateOne(filter,myObject,function(err,db_response){
        if(err){
            console.log(err)
            response.message = "Something Went Wrong"
            res.json(response)
            res.status(401);
            return
        }
        response.remarks = "Success"
        response.message = "Successfully updated"        

        res.json(response)
    })




})

LibraryRoutes.route("/api/deleteBook/:book_id").post(function (req,res){
    
    var response = {
        remarks:"error",
        message:"",
        payload:[]
    }       

    let filter ={
        _id : ObjectId(req.params.book_id)
    }
   
    let db_connect = dbo.getDb();
    
    // "INSERT INTO LIBRARY (myObject.keys) VALUES (myObject.value)"
    
    db_connect.collection("Library").deleteOne(filter,function(err,db_response){
        if(err){
            console.log(err)
            response.message = "Something Went Wrong"
            res.json(response)
            res.status(401);
            return
        }
        response.remarks = "Success"
        response.message = "Successfully updated"        

        res.json(response)
    })




})



module.exports = LibraryRoutes;
