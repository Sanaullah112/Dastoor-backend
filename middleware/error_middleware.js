const error_middleware = (err,req,res) =>{
    const status = err.status || 500;
    const message = err.message || "Backend Error";
    const extraDetails = err.extraDetails || "Error From Backend";

return res.status(status).json({message,extraDetails});					// this
};


export default error_middleware;
