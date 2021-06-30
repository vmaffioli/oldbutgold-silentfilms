
const push = require('./push');
const pull = require('./pull');
const config = {
    pull: 'pull',
    push: 'push'
};

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '../../.env' })
}

async function DBDistribute(dbpath, operation, data) {
    let result;
    switch (operation) {
        case config.push:
                result = await push(dbpath, data)
                console.log(result.msg)
            break;
        case config.pull:
                result = await pull(dbpath)
                console.log(result.msg)
                result = result.data
            break;
        default:
            console.log('DBDistribute')
    }
    return result;
}

module.exports = DBDistribute;