const router = require("express").Router();
const User = require("../models/User");


//REGISTER
router.post("/register", async (req,res) => {
    const newUser = new User({
        username: req.body.username
    });
    console.log(newUser)
    try{
    const user = await newUser.save();
    res.status(201).json(user)
    } 
    catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

router.post("/login", async(req,res)=> {
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json("Wrong pssword or username!")
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && 
        res.status(401).json("wrong password or username!");
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: "5d"})

        const { password, ...info } = user._doc
        res.status(200).json({...info, accessToken}) // if originalPassword is not equal req.body.password then 401 otherwise 200
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;