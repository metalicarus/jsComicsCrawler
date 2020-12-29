const app   =   require('../src/app');
const port  =   normalizePort(process.env.PORT || 3000);


function normalizePort(val){ 
    console.log('toaqui');
    const port = parseInt(val, 10);
    if(isNaN(port))return val;
    if(port >= 0)return port;
    return false;
}
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    const bind = typeof port === 'string'?'Pipe'+port:'Port'+port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind+' requires elevated privileges');
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
app.listen(port, function(){
    console.log(`app listen on port ${port}`);
});