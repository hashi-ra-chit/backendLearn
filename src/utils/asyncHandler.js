// iss file ke andar hum aisa code likhenge jisme hume baar baar
// try catch and async await ka use na krna pde functions pe 
//saare functions pe already hum yhan se wrap kar ke bhejenge 

// const asyncHandler = () =>{}
// const asyncHandler = (func) =>{}
// const asyncHandler = (func) => {async () => {}}
const asyncHandler = (fn) => async (req , res , next) => {
    try{
        await fn(req , res , next)
    }
    catch(error){
        res.status(err.code || 700).json({
           success : false,
           message : err.message 
        })
    }
}
export default asyncHandler;