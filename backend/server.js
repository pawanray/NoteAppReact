const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDb();

const PORT = process.env.PORT || 5000;

// ---------------------- deployment ----------------------- 
__dirname = path.resolve()
 
if(process.env.NODE_ENV_PROD === "production"){
  app.use(express.static(path.join(__dirname,'frontend/build')));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend",'build','index.html'));
  })
}
else{
  app.use('/',(req,res)=>{
    console.log("API is running...")
  })
}

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server started on PORT ${PORT}`)  )