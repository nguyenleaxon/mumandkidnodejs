var Video = require("../models/video.js");
var Channel = require("../models/channel.js")

var ObjectId = require('mongoose').Types.ObjectId;
var unorm = require('unorm');
module.exports = {
    registerRoutes: function (app) {

        app.post("/getAllVideoByCategory", this.getAllVideoByCategory);
        app.post("/getAllVideoFirstTime",this.getAllVideoFirstTime);
        app.post("/findAllVideoByName",this.findAllVideoByName)

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
    },

    getAllVideoFirstTime : function(req,res,next) {
        var categoryID =  req.body.categoryID;
        var skipVideo = req.body.skip;
        var limitVideo = 5;
        console.dir(categoryID);
        Video.count(function(err, count){
            Channel.find({"category.$id": ObjectId(categoryID)},'ObjectId',function(error,result){
                console.dir("channel list" + result);
                var channelList = new Array();
                for(channelId in result){
                    channelList.push(result[channelId]._id);
                }
                Video.find({}).sort({'name':1}).skip(5).limit(5)
                    .where('channel.$id')
                    .in(channelList)
                    .exec(function(error,video){
                        res.json (video.map ( function(returnVideo){
                            return {
                                id: returnVideo._id,
                                name : returnVideo.name,
                                image: returnVideo.image,
                                url: returnVideo.url,
                                count:count
                            }
                        }));

                    });
            });
        });
    }



};