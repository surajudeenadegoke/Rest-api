
const { urlencoded } = require('body-parser');
const { application } = require('express');
const express = require('express');
const colors = require('colors');
const {connectDB } = require('./src/config/dbConfig')
const dotenv = require('dotenv').config()
 const { errorHandler } = require('./middleware/errorMiddleware')
 connectDB()

 const port = process.env.PORT || 3006;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals',require('./src/routes/usersRoute'))
app.use(errorHandler)





app.listen(port,()=> console.log(`Server started on ${ port }`));
