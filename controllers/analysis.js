var analysisModel = require('../models/analysis')

exports.dashboard = function (req, res, next) {
    if (req.params.fromDate && req.params.toDate) {
        analysisModel.dashboard(req.body.tokenIsAdmin, req.body.tokenUserId, req.params.fromDate, req.params.toDate, function(err, result) {
            if (err)
                res.status(400).json({message:err, data: null})
            else {
                res.status(200).json({message: null, data: result})
            }
        })
    } else {
        res.status(400).json({message:'Wrong params.'})
    }
}
