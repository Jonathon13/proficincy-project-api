const cors = require('micro-cors')()
const { send, json } = require('micro')
const { router, get , post, put, del} = require('microrouter')
// database connectors
const db = require('monk')('mongodb://jon1113:Asdfdsa11@personal-shard-00-00-ce9co.mongodb.net:27017,personal-shard-00-01-ce9co.mongodb.net:27017,personal-shard-00-02-ce9co.mongodb.net:27017/favorites?ssl=true&replicaSet=Personal-shard-0&authSource=admin&retryWrites=true')
const Shows = db.get('shows')

// This is how you see all of the shows at once // this works now
const getShows = async(req, res) => {
    const results = await Shows.find({});
    await Shows.find({})
    return send ( res, 200, results)
}
//this is how you see a single show // just decided to work randomly
const getShow = async(req, res) => { 
    const Show = await Shows.find({_id:req.params.id})
    return send (res, 200, Show)
}
//This is what makes it so you can edit the shows // just decided to work randomly
const updateShow = async(req, res) => { 
    const data = await json(req)
    console.log(data) // Validation might go here
    const results = await Shows.update({ _id: req.params.id }, data);
    return send(res, 200, results)
}
// This is how you delete shows // this doesn't work yet
const deleteShow = async (req,res) => {
    const results = await Shows.remove({ _id: req.params.id});
    return send(res, 200, results)
}
// this is the show creator // this works great
const addShow = async (req, res) =>{ 
    const body = await json(req)
    await Shows.insert(body)
    console.log(body)
    return send (res, 201, body )
}
// this works flawlessly
const notfound = (req, res) => send(
    res, 404, 'Not found route')
// these are the routes
module.exports =  cors(
        router(
            get('/Shows', getShows), // this works
            get('/Shows/:id', getShow), // this works
            post('/Shows', addShow), //this works 
            put('/Shows/:id', updateShow),  // this works
            del('Shows/:id', deleteShow), // this doesn't work
            get('/*', notfound) // flawless
        )
)



