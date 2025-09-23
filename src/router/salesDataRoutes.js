const express = require('express');
const {insertPgMonitoringlogs,getPgMonitoringLogs,salesAggregate} = require('../controllers/saleDataHandlers') 
const router = express.Router();

router.get('/saleData',getPgMonitoringLogs);

router.post('/saleData',insertPgMonitoringlogs);

router.get('/saleData/aggregate',salesAggregate);

module.exports = router;