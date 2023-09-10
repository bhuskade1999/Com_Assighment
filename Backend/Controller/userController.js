const UserModel = require("../Models/user")

/* ------------------------------- Create User ----------------------------- */

exports.register = async (req, res) => {
  try {
    const { name, number, email, password,} = req.body

    //checking email already exist or not
    let user = await UserModel.findOne({ email: email })
    if (user) return res.status(400).json({ success: false, message: "User already Exists With This Email" })

      //checking number already exist or not
    let checkMobile = await UserModel.findOne({ number: number })
    if (checkMobile) return res.status(400).json({ success: false, message: "number already Exists" })

    user = await UserModel.create({ name,number, email, password,   })

    return res.status(201).json({success:true, user})

  } 
  catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
}



/* ------------------------------- Login User ----------------------------- */

exports.login = async (req, res) => {
    try {
  
      const { userid, password } = req.body

      const user = await UserModel.findOne({ $or: [{ email: userid }, { number: userid }], });

      if (!user) return res.status(400).json({ success: false, message: "User does not Exists" })
  
      const isMatch = await user.matchPassword(password)
  
      if (!isMatch) return res.status(400).json({ success: false, message: "Password is incorrect" })
  
      const token = await user.generateToken()
  
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true
      }
  
      res.status(200)
        .cookie("token", token, options)
        .json({ success: true, user, token })
  
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }



  /* ---------------------------------- LogOut User --------------------------------- */

exports.logout = async (req, res) => {
  try {
    res.status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Logged Out successfully" })

  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
}
  

  /* -------------------------------  Update User  ----------------------------- */
  
exports.updateProfile = async (req, res) => {
    try {
  
      const user = await UserModel.findById(req.user._id)
  
      const { name, email, number, password} = req.body
  
      if (name) {
        user.name = name
      }
  
      if (email) {
        user.email = email
      }

      if (number) {
        user.number = number
      }

      if (password) {
        user.password = password
      }

      if(Object.keys(req.body).length==0){
        return res.status(400).send({status:false,message:"Please provide details for updation"});
      } 

      await user.save()
      return res.status(200).json({ success: true, message: "profile updated successfully" })
  
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  
  }
  

 

 
  

  


  