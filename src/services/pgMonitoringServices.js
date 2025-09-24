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
            const perServicesTotal = {};
            for(const sale of data){
                const saleDataObj = sale.saleData instanceof Map ? Object.fromEntries(sale.saleData) : sale.saleData;
                for(const key in saleDataObj){
                    const value = saleDataObj[key];
                    if(!perServicesTotal[key]){
                         perServicesTotal[key] = {
                            totalInitiated: 0,
                            totalCapturedCount: 0,
                            totalCapturedAmount: 0,
                            totalDeliveredCount: 0,
                            totalDeliveredAmount: 0,
                            totalRefundCount: 0,
                            totalRefundAmount: 0
                        };
                    }
                      // Add current sale's value to the service total
                    perServicesTotal[key].totalInitiated += value.totalInitiated || 0;
                    perServicesTotal[key].totalCapturedCount += value.totalCapturedCount || 0;
                    perServicesTotal[key].totalCapturedAmount += value.totalCapturedAmount || 0;
                    perServicesTotal[key].totalDeliveredCount += value.totalDeliveredCount || 0;
                    perServicesTotal[key].totalDeliveredAmount += value.totalDeliveredAmount || 0;
                    perServicesTotal[key].totalRefundCount += value.totalRefundCount || 0;
                    perServicesTotal[key].totalRefundAmount += value.totalRefundAmount || 0;
                }
            }
            return perServicesTotal;

        } 
        catch (err) {
        console.log("Error occurred", err);
        throw err;
    }
}

const salesAggregateOverall = async()=>{
    try {
        const matchState = {};
        if(start && end){
                matchState.createdAt = {
                    $gte : new Date(start),
                    $lte : new Date(end)
                }
            }
        const data = await Sales.find(matchState);
        const result = data.reduce(
                (acc,sale) =>{
                   for(const [key,value] of sale.saleData.entries()){
                    acc.totalInitiated += value.totalInitiated || 0;
                    acc.totalCapturedCount += value.totalCapturedCount || 0;
                    acc.totalCapturedAmount += value.totalCapturedAmount || 0;
                    acc.totalDeliveredCount += value.totalCapturedCount || 0;
                    acc.totalDeliveredAmount += value.totalDeliveredAmount || 0;
                    acc.totalRefundAmount += value.totalRefundAmount || 0;
                    acc.totalRefundCount += value.totalRefundCount || 0;
                }
                return acc;
                },{
                    totalInitiated: 0,
                    totalCapturedCount: 0,
                    totalCapturedAmount: 0,
                    totalDeliveredCount: 0,
                    totalDeliveredAmount: 0,
                    totalRefundCount: 0,
                    totalRefundAmount: 0
                }
            )

            return result;
    }
    catch(err){
        console.log("Error occurred", err);
        throw err;
    }
                
}
    

module.exports = {
    insertPgMonitoringlogs,
    getrequestHandler,
    salesAggregate,
    salesAggregateOverall
}