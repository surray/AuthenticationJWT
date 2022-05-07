const router =require('express').Router();
const User=require('./userSchema');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');


router.post('/register',async(req,res) => {
    
    
    try{
        var emailExist=await User.findOne({email:req.body.email});
        if (emailExist){
             res.status(400).json("Email already registered");
             return;
        }


        var hash =await bcrypt.hash(req.body.password, 10);
        var user =new User({
            name:req.body.name,
            email:req.body.email,
            password:hash,
        });
        var data =await user.save();

        console.log(data);
        res.json(data); 
    }catch(err) {

      res.status(400).json(err) ;

    }

     //res.json(user); 
});


router.post('/',async(req,res) => {
    try{
        var userData=await User.findOne({email:req.body.email});
        if (!userData){
             res.status(400).json("Please register");
             return;
        }
        var validPsw =await bcrypt.compare(req.body.password,userData.password);

        if(!validPsw){
            res.status(400).json("Invalid Password");
             return;
        }

        var userToken = await jwt.sign({email:userData.email},'seckey');

        res.header('auth',userToken).json(userToken);


}catch(err) {

      res.status(400).json(err) ;
      
    }
});

const validUser =(req,res,next) => {
    var token =req.header('auth');
    req.token =token;
    next();
}
router.get('/getAll',validUser,async(req,res)=>{
    jwt.verify(req.token,'seckey',async(err,data)=>{
        if(err){
            res.sendStatus(403)
        }else{
            const data =await User.find().select(['-password']);
            res.json(data);
        }
    })
})

module.exports=router;