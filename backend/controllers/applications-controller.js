const Goods = require('../models/applicationsList');
const mongoose = require('mongoose');
const ApplicationList = mongoose.model('Applications');
const ObjectId = require('mongodb').ObjectID;

class ApplicationsController {
    constructor(){}
    getApplicationById = async (req, res) => {
        console.log('werteyyy')
        const id = req.query.id;
        console.log('id', id)
        const application = await ApplicationList.findById({_id: id})
        if(!application) {
            throw new Error('Unable application')
        }

        return application
    }
    getApplications = async (req, res) => {
        const {
            skip = 1,
            limit = 10,
            sort = 'fullname',
            status,
            search,
        } = req.query;
        const params = {};

        const data = await ApplicationList.paginate(params, {
            skip,
            limit,
            sort: { [sort]: -1},
        });

        if( req.query.hasOwnProperty('search')) {
            const searching = req.query.search;
            const data = await ApplicationList.paginate({$text: {$search: searching}},  {
                skip,
                limit,
                sort: { [sort]: -1},
            });
            return res.json(data)
        }

        if( req.query.hasOwnProperty('status')) {
            const status = req.query.status;
            params.status = { $in: status }
            const data = await ApplicationList.paginate(params,  {
                skip,
                limit,
                sort: { [sort]: -1},
            });
            return res.json(data)
        }

        return res.json(data)
    };
    newApplication = async (req, res) => {
        const item = new ApplicationList()
            item.fullName = req.body.fullName,
            item.phone = req.body.phone,
            item.amount = req.body.amount,
            item.status = req.body.state,
        await item.save()
        res.send(item)
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
