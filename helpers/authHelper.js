const bcrypt = require('bcryptjs')

const hashPassword = (password) =>{
    try{
      const salt =  bcrypt.genSaltSync(10) 
      const hashPassword = bcrypt.hashSync(password,salt)
      return hashPassword
    }catch(e){
        console.log(e);
    }
}

const passwordCheck = (password,hashedPassword) => {
    try{
        const passOk = bcrypt.compareSync(password,hashedPassword)
        return passOk;
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    hashPassword,
    passwordCheck
}