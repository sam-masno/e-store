const mongoose = require('mongoose');
mongoose.connect(
    require('../config/keys').mongoURI, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('mongoose connected')
)