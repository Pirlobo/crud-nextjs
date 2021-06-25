var mongoose = require('mongoose');
var {isEmail, isLength} = require('validator');
var userSchema = new mongoose.Schema({
   email:  {
      type: String,
      required: [true, 'Why no email?'],
      unique: true,
      lowercase: true,
      validate :  [
        { validator : isEmail, message: props => `${props.value} is not a valid email !`},
      ],
    },
   username:  {
      type: String,
      required: [true, 'Why no username?'],
      unique: true,
      minlength: [6, 'at least 6 characters'],
    },
   password: 
   {
      type: String,
      required: [true, 'Why no password?'],
      unique: true,
      minlength: [6, 'at least 6 characters'],
    },
   phone: {
      type: String,
      required: [true, 'Why no phone number?'],
      unique: true,
      validate: [
        {
          validator: function(v) {
            if (v.length == 10) {
              return true;
            }
            else {
              return false;
            }
          },
          message: props => `${props.value} is not a valid phone number!`
        },
      ]
    },
});
module.exports = mongoose.models.users || mongoose.model('users', userSchema);