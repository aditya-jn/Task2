const dataMonitoringServices = require('../services/index')
const httpStatus = require('http-status')
const Sales = require('../model/saleDataModel')
const {validate} = require('../Middlewares/index')
const saleDataSchema = require('../validations/index')
const insertPgMonitoringlogs = async (req, res) => {
    
    const { error } = saleDataSchema.validate(req.body.saleData, { abortEarly: false });
    try {
        const body = req.body;
        await dataMonitoringServices.insertPgMonitoringlogs(body);
        res.httpStatus.status.OK.json({ msg: "Data inserted successfully" });
    } catch (err) {
        res.httpStatus.status.INTERNAL_SERVER_ERROR.json({ msg: "Error inserting data", error: err });
    }
};

const getPgMonitoringLogs = async (req, res) => {
    try {
        const data = await dataMonitoringServices.getrequestHandler();
        res.httpStatus.status.OK.json({
            msg: "Data fetched successfully",
            saleData: data
        });
    } catch (err) {
        res.httpStatus.status.INTERNAL_SERVER_ERROR.json({ msg: "Error fetching data", error: err });
    }
};

const salesAggregate = async(req,res) =>{
    try{
        const {start , end} = req.query;
        const data = await dataMonitoringServices.salesAggregate(start,end);
        res.json(data);
    }
    catch (err){
        console.log("Error occurred", err);
        throw err;
    }
}

const salesAggregateOverall = async(req,res) =>{
    try {
        const data = await dataMonitoringServices.salesAggregateOverall();
        res.json(data);
    }
    catch(err){
        console.log("Error occurred",err);
        throw err;
    }
}

module.exports = {
    insertPgMonitoringlogs,
    getPgMonitoringLogs,
    salesAggregate
}

