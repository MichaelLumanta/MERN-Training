import React from "react";

const AddEditLibrary = (props) =>{

    const {
        editID,
        form,
        updateForm,
        addToList,   
        editBooks,                    
    } = props  

    return(
        <>
            <br></br>
            <label>Book Name</label>
            <input type="text"         
                value={form.book_name}
                onChange={
                    (e)=>{
                        updateForm("book_name",e )
                    }
            }
            />
            <br></br>
            <label>Author</label>
            <input type="text"
                value={form.author}
                onChange={(e)=>{updateForm("author",e )}}/>
            <br></br>
            {
                editID?
                <button onClick={editBooks}>
                    Edit Book
                </button>
                :
                <button onClick={addToList}>
                    Add To List
                </button>
            }
           
        </>
    )
}

export default AddEditLibrary