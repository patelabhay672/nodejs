const express= require('express');
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000 : http://localhost:3000');
}   );