const express = require('express');
const {insertPgMonitoringlogs,getPgMonitoringLogs,salesAggregate} = require('../controllers/'); 
const { salesAggregateOverall } = require('../services/');
const {validateSaleData} = require('../Middlewares/index')
const router = express.Router();

router.get('/saleData',getPgMonitoringLogs);

router.post('/saleData',validateSaleData,insertPgMonitoringlogs);

router.get('/saleData/aggregate',salesAggregate);

router.get('/saleData/overall',salesAggregateOverall);

module.exports = router;