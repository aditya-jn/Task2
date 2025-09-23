
const Sales = require('../model/saleDataModel');

const insertPgMonitoringlogs = async(body) =>{
    try{
        if(!body || !body.dataArray){
            console.log("No data inserted");
            return ;
        }
        const dataArray = body.dataArray;
        console.log("Total Data ", dataArray.length);
        await Sales.insertMany(body.dataArray, { ordered: false });
    }
    catch(err){
        console.log("Error occured", err);
    }
}

const getrequestHandler = async () => {
    try {
        const allData = await Sales.find();
        return allData;
    } catch (err) {
        console.log("Error occurred", err);
        throw err;
    }
};


const salesAggregate = async(start,end) =>{
    try{
        const matchState = {};
        if(start && end){
                matchState.createdAt = {
                    $gte : new Date(start),
                    $lte : new Date(end)
                }
            }
            const data = await Sales.find(matchState);
            return data;
        } 
        catch (err) {
        console.log("Error occurred", err);
        throw err;
    }
}

// const getTotalCapturedCount = async(body)=>{
//     try{
//         const matchState = {};
        
//     }

// }
    

module.exports = {
    insertPgMonitoringlogs,
    getrequestHandler,
    salesAggregate
}