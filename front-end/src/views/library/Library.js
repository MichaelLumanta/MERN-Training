import React, { useEffect, useState } from "react"
import AddEditLibrary from "./AddEditLibrary"

const Library = ()=>{      

    const [page_tab, setTabs] = useState(0)
    const [bookList,setBookList] = useState([])

    const [editID,setEditID] = useState(null)

    const [form,setForm] = useState(
        {
            book_name:"",
            author:""
        }
    )     

    useEffect(()=>{
        fetchData()
    },[])

    useEffect(()=>{
        //console.log(form)
    },[form])

        
    function updateForm(key,e){
        const value = e.target.value;
        setForm({
            ...form,
            [key]: value
        })
    }

    function displayBookList(){
        
        return(<table border={1}>
            <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Actions</th>
            </tr>
            {
                bookList.map(element =>{
                    return (
                        <tr>
                            <td>{element.book_name}</td>
                            <td>{element.author}</td>
                            <td>
                                <button onClick={()=>{
                                    setEditID(element._id)
                                    setForm(element)
                                    setTabs(1)
                                }}>
                                    Update
                                </button>
                                <button className="bg-red" onClick={()=>{
                                    deleteBook(element._id)                         
                                }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                    
                    
                })
            }
        
        </table>)
    }

    const ojtLists = [
        {
            name:"Josh Josh",
            course:"Kompyuter Sayans",
            age:"15",
            talent:"Kumanta at drawing",
            subjects:[{
                subject_name: "SAD"
            },
            {
                subject_name: "SIA"
            }
            ]
        },
        {
            name:"Mar Mar",
            course:"Kompyuter Sayans",
            age:"8",
            talent:"Tangled"
        },
        {
            name:"Jas Jas",
            course:"Kompyuter Sayans",
            age:"25",
            talent:"matulog"
        }
    ]

   async function fetchData(){

        const url = "http://localhost:5100/api/getBooks";
        const requestOption = {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },           
            async: false 
        }

      
       fetch(url, requestOption)
        .then((response) => response.json())
        .then((result) => 
        {
            console.log(result);
            setBookList(result.payload)
        }       
        )
        .catch((error) => console.error(error));
           
    }

    async function addBooks(){
        const url = "http://localhost:5100/api/storeBooks"


        const reqBody = {
            authorization:{

            },
            payload:{
                ...form
            }
        }

        const requestOption = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(reqBody)
        }

        fetch(url, requestOption)
        .then((response) => response.json())
        .then((result) => 
        {
            setForm({
                book_name:"",
                author:""
            })
            fetchData()
            console.log(result);         
        }       
        )
        .catch((error) => console.error(error));
    }

    function editBooks(){
        const url = `http://localhost:5100/api/editBooks/${editID}`


        const reqBody = {
            authorization:{

            },
            payload:{
                ...form
            }
        }

        const requestOption = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(reqBody)
        }

        fetch(url, requestOption)
        .then((response) => response.json())
        .then((result) => 
        {
            setForm({
                book_name:"",
                author:""
            })
            fetchData()
            console.log(result);         
        }       
        )
        .catch((error) => console.error(error));
    }

    function deleteBook(book_id){
        const url = `http://localhost:5100/api/deleteBook/${book_id}`

        const requestOption = {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },          
        }

        fetch(url, requestOption)
        .then((response) => response.json())
        .then((result) => 
        {
            setForm({
                book_name:"",
                author:""
            })
            fetchData()       
        }       
        )
        .catch((error) => console.error(error));
    }

    return(

        // <div className="text-center">
        //     <table border={1}> 
        //         <tr>
        //             <th>Number</th>
        //             <th>OJT NAme</th>    
        //             <th>course</th>           
        //             <th>age</th>  
        //             <th>talent</th>          
        //             <th>Subjects</th>
        //         </tr>         
        //         {
        //             ojtLists?.length > 0?
        //             <>
        //             {
        //                 ojtLists?.map((ojtList,ojt_index) =>{                                                          
                               
        //                     var to_return = []
                         
        //                     to_return.push(
        //                         <tr>
        //                             <td>{ojt_index+1}</td>
        //                             <td>{ojtList.name}</td>
        //                             <td>{ojtList.course}</td>
        //                             <td>{ojtList.age}</td>
        //                             <td>{ojtList.talent}</td>
        //                             <td>
        //                                 {
        //                                     ojtList.subjects?.map((subject,subject_index)=>{
        //                                         return(
        //                                         <div>{subject_index+1}{".)"}{ subject.subject_name}</div>
        //                                         )
        //                                     })
        //                                 }
        //                             </td>
        //                         </tr>
        //                     )

        //                     return (
        //                         to_return
        //                     )
        //                 })
        //             }
        //             </>
        //             :
        //             "Empty List"

        //         }
        //     </table>
        // </div>


    <div className="ml-4">
        <br></br>
        <br></br>
        <button onClick={()=>{setTabs(0)}}>
            Book List
        </button>
        
        <button className="ml-2" onClick={()=>{setTabs(1);setEditID(null)}}>
            Add Book
        </button>
        
        <br></br>
        {
            page_tab == 0
            ?
            displayBookList():
            null
        }
        {
             page_tab == 1?
                <AddEditLibrary  form ={form} updateForm ={updateForm} addToList = {addBooks} editID={editID} editBooks= {editBooks} />
                :
                null

        }

    </div>
    )
}

export default Library