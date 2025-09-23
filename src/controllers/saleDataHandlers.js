const dataMonitoringServices = require('../services/pgMonitoringServices')
const Sales = require('../model/saleDataModel')

const insertPgMonitoringlogs = async (req, res) => {
    try {
        const body = req.body;
        await dataMonitoringServices.insertPgMonitoringlogs(body);
        res.status(200).json({ msg: "Data inserted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error inserting data", error: err });
    }
};

const getPgMonitoringLogs = async (req, res) => {
    try {
        const data = await dataMonitoringServices.getrequestHandler();
        res.status(200).json({
            msg: "Data fetched successfully",
            saleData: data
        });
    } catch (err) {
        res.status(500).json({ msg: "Error fetching data", error: err });
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

module.exports = {
    insertPgMonitoringlogs,
    getPgMonitoringLogs,
    salesAggregate
}

