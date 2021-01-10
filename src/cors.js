function AllowCrossDomain(){
    this.permisos = function (req, res, nex){
        var whileList = [
            'https://sistemabiblioteca-vl.herokuapp.com',
            'http://localhost:4200/'

        ];
        var origen = req.headers.origin;
        if(whileList.indexOf(origen)>= -1){
            res.header('Access-Control-Allow-Origin', origen);

        }
        res.header('Access-Control-Allow-Header', 'Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        next();

    }
}
module.exports = new AllowCrossDomain;