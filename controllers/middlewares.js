const admin = true;
const isAdmin = (req,res, next) => {
    if(!admin){
        return res.status(401).json({error:401 `ruta ${req.originalUrl} metodo ${req.method} no aurotizado`})
    }else{
        return next();
    }
}

const errorHandler = (error, res) =>{
    console.log(error);
    return res.status(400).json({"error":400,"description": error.message});
}
const notFound = (req, res)=>{
    return res.status(404).json({"error":404, "description":`ruta ${req.url} metodo ${req.method} no implementados`});
}

module.exports = {isAdmin, errorHandler, notFound}