const { port, env } = require('./config/vars.js');
const app = require('./config/express.js');
const mongoose = require('./config/mongoose.js');

mongoose.connect();

app.listen(port, () => {
    console.log(`server started on port ${port}`);
})

module.exports = app;