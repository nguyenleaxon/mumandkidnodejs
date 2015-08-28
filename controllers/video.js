var Video = require("../models/video.js");
var ObjectId = require('mongoose').Types.ObjectId;
var unorm = require('unorm');
module.exports = {
    registerRoutes: function (app) {

        app.post("/getAllVideoByCategory", this.getAllVideoByCategory);
        app.post("/getAllVideoFirstTime",this.getAllVideoFirstTime);
        app.post("/findAllVideoByName",this.findAllVideoByName);
    },



    getAllVideoByCategory: function (req, res, next) {
        var categoryID =  req.body.categoryID;
        var skipVideo = req.body.skip;
        var limitVideo = 5;
        console.dir(categoryID);
        console.dir(skipVideo);

            Video.find({"videoCategory.$id": ObjectId(categoryID)}, function(err, video) {
                if (err) return console .error (err);
                res.json (video.map ( function(returnVideo){
                    console.dir(returnVideo);
                    return {
                        id: returnVideo._id,
                        name : returnVideo.name,
                        image: returnVideo.image,
                        url: returnVideo.url
                    }
                }));
            }).sort("name").skip(skipVideo).limit(limitVideo);



    },

    getAllVideoFirstTime : function(req,res,next) {
        var categoryID =  req.body.categoryID;
        var skipVideo = req.body.skip;
        var limitVideo = 5;
        console.dir(categoryID);
        console.dir(skipVideo);
        Video.count({"videoCategory.$id": ObjectId(categoryID)}, function(err, count) {
            if (err) return console .error (err);
            Video.find({"videoCategory.$id": ObjectId(categoryID)}, function(err, video) {
                if (err) return console .error (err);
                console.dir(video);
                res.json (video.map ( function(returnVideo){
                    return {
                        id: returnVideo._id,
                        name : returnVideo.name,
                        image: returnVideo.image,
                        url: returnVideo.url,
                        total:count

                    }
                }));
            }).sort("name").skip(skipVideo).limit(limitVideo);

        });

    },

    findAllVideoByName : function(req,res,next) {
        var text =  req.body.videoName;
        var combining = /[\u0300-\u036F]/g;
        var data = unorm.nfkd(text).replace(combining, '');
        Video.find({'unicodeName': new RegExp(data,'i')},function(err, video){
            res.json (video.map ( function(returnVideo){
                return {
                    id: returnVideo._id,
                    name : returnVideo.name,
                    image: returnVideo.image,
                    url: returnVideo.url
                }
            }));
        }).sort("name").limit(20);
    }



};