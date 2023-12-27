
const express = require('express')
const connectDb = require("./utils/db")
const bcrypt = require('bcryptjs')
const User = require("./modlas/userSchema");
const app = express()

app.use(express.json());
const port = 4000



app.get('/', (req, res) => {
  res.status(200).send('Hwelcome!')
})
app.get('/register', (req, res) => {
  res.status(200).send('Hii yash  jidshfhi!')
})

app.post('/register', (req, res) => {
  // console.log(req.body)
  // res.status(200).json({message:req.body})

  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "please fill" });
  }

  User.findOne({ email: email })
    .then( async(userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "email exist" });
      } else if (password != cpassword){
        return res.status(422).json({ error: "password not match" });
     
      } else{
        
        const user = new User({ name, email, password, cpassword })
  
       await user.save().then(() => {
          res.status(201).json({ message: "register success" });
        }).catch((err) => res.status(500).json({ error: "Failed register" }))
      }



    }).catch(err =>{console.log(err)})
})

app.post('/login', async (req, res) =>{
    
  try{
      const {email, password } = req.body;
      
      if(!email || !password){
        return res.status(400).json({error: "plz fill data login"})
      }

    const userLogin = await  User.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if(userLogin){
      
      if(!isMatch){
        res.status(400).json({error: "invalid login pass"})
      }else{
        res.json({message: "user sign succd"})
      }

    }else{
      res.status(400).json({error: "invalid login emi"})
    }


  }catch (err){
   console.log(err)
  }
})

connectDb().then(() => {

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});