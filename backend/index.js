const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();

const app = express()
const port = 5000

app.use(cors())
//middleware hai  // req ki body e kuch bhejne k baad show krne k liye as res
app.use(express.json())

//.get ek endpoint hai .. jo hello kunal return kr rha hai
// app.get('/', (req, res) => {
//     res.send('Hello Kunal!')
//   })

//Available routes
//so humyaha pe app.use krke routes ko link krenge
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


//hame orr bhi endpoint chahiye honge .. for write, user authenticate , konsa user kb connected, konse user k kitne notes kaha se fetch krne hai, jo bhi notebook k ander notes likhe jaayenge unko fetch krke aapko react app me dikhana h


app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})