const express=require('express');
const db=require("./db");
const app=express();
app.use(express.json());
app.use(express.static("frontend"));
const PORT=3002;
app.get('/',(req,res)=>{
    res.send("Welcome to notes API");
});
app.get('/notes',(req,res)=>{
    const sql="SELECT *FROM notes";
    db.query(sql,(err,result)=>{
        if(err){
        return res.status(500).json({
            message:"Database Error",
            error:err
        });
    }
        res.json(result);
    });
});

app.post("/notes",(req,res)=>{
    const {title,content}=req.body;
    const sql="INSERT INTO notes(title,content)VALUES(?,?)";
    db.query(sql,[title,content],(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"Database Error",
                error:err

            });
        }
        res.json({
            message:"Note added successfully",
            id:result.insertId
        });
    });
});

app.delete("/notes/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM notes WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully"
        });

    });

});
app.put("/notes/:id", (req, res) => {

    const id = req.params.id;
    const { title, content } = req.body;

    const sql = "UPDATE notes SET title = ?, content = ? WHERE id = ?";

    db.query(sql, [title, content, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note updated successfully"
        });

    });

});
app.listen(PORT,()=>{
    console.log("Server is running on port 3002");
});

