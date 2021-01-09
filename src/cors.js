function AllowCrossDomain(){
    this.permisos = function (req, res, nex){
        res.header('Access-Control-Allow-Origin', `${process.env.CROSS_HOST}`);
        res.header('Access-Control-Allow-Header', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        next();

    }
}
module.exports = new AllowCrossDomain();