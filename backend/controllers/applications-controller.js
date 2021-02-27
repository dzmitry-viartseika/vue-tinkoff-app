const Goods = require('../models/applicationsList');
const mongoose = require('mongoose');
const ApplicationList = mongoose.model('Applications');
const ObjectId = require('mongodb').ObjectID;

class ApplicationsController {
    constructor(){}
    getApplications = async (req, res) => {
        ApplicationList.find((err, docs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(docs);
            }
        })
    };
    newApplication = async (req, res) => {
        const item = new ApplicationList()
            item.fullName = req.body.fullName,
            item.phone = req.body.phone,
            item.amount = req.body.amount,
            item.status = req.body.status,
        item.save()
    };
    deleteApplication = async (req, res) => {
        const id = req.query.id;
        const o_id = new ObjectId(id);
        ApplicationList.deleteOne({ _id: o_id }, function(err, result) {
            if (err) {
                res.send('err');
            } else {
                res.send('result');
            }
        });
    };
}

module.exports = ApplicationsController;
