const database = require('../app');





  
   
database({ database: 'oldbutgold', collection: 'silentfilms' }, 'pull', '')
.then(x => {
    console.log(x)
})
  
        



