const bodyParser = require('body-parser')
const express = require('express') 
const app = express()

const path = require("path");
const port = 3001 // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require('cors')
const UserAdsModel = require("./models/UserAds.model")
const UserAssetsModel = require("./models/UserAssets.model")
const multer = require("multer")
const fs = require('fs')
const pinataSDK = require('@pinata/sdk');


let db=[];
const PINATA_API_KEY="0d11d3cf7d9cf1c20044"
const PINATA_API_SECRET="dd3cb8492cf4144f1e26738a6bedc9d6b9ae631424d57a356dde3799b9492ecd"
const PINATA_API_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5Y2QzNDNmZi1iZGI5LTQ0YmUtOTZjYS1lZDc3YTYyYzMwNzAiLCJlbWFpbCI6InJsYXdsZ2hrZDEyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwZDExZDNjZjdkOWNmMWMyMDA0NCIsInNjb3BlZEtleVNlY3JldCI6ImRkM2NiODQ5MmNmNDE0NGYxZTI2NzM4YTZiZWRjOWQ2YjlhZTYzMTQyNGQ1N2EzNTZkZGUzNzk5Yjk0OTJlY2QiLCJpYXQiOjE2Nzc0MjU2MDZ9.gZk_hjpVv7hMxMuWfM8FhPCvtli6AVchmBaJo2IBAbU"
const pinata = new pinataSDK({ pinataJWTKey: PINATA_API_JWT});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
const mongoose = require('mongoose');
const { chownSync } = require('fs');
const { default: axios } = require('axios');
const { serialize } = require('v8');
mongoose.connect(
    'mongodb+srv://hwang:wlghkd34kr!@yourd.pfzdjnl.mongodb.net/?retryWrites=true&w=majority',
    {}
).then(()=> console.log("MongoDB conected"))
.catch((err)=> {
    console.log(err);
});


//광고 세부 데이터
app.post("/upload", (req,res) => {
    console.log(req.body.Data);
    db.push(req.body.Data);
    UserAdsModel({
        User: req.body.Data.User,
        Title : req.body.Data.Title,
        Description: req.body.Data.Description,
        Category:req.body.Data.Category,
        DepositToken:req.body.Data.DepositToken,
        RpP:req.body.Data.RpP,
        Position:req.body.Data.Position,
        AdsCid: req.body.Data.AdsCid,
    }).save((err)=> {
        if(err) {
            console.err(err.masaage);
            return res.status(400).send("업로드 에러");
        } else {
            console.log("successfully");
            // res.redirect('/');
            return res.status(200).send("업로드 완료");
        }
    })
})

//광고 파일 업로드
const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function(req, file, cb) {
      cb(null, file.originalname );
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 90000000 }
});

app.post("/adsfile", upload.single("file"), async function(req,res) {
    try {
        const IpfsHash = await storeFileToIPFS(req.file.originalname,req.body.metadata.toString().split('"',)[3]);
        res.status(200).send(IpfsHash);
    }catch (err){
        console.log(err);
    }
})

const storeFileToIPFS = async (name,account) => {
    const src = path.join(__dirname,"./public/img/",name);
    const readableStreamForFile = fs.createReadStream(src);
    const options = {
        pinataMetadata: {
            name: name,
            keyvalues: {
                Account: account,
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    let IpfsHash;
    await pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //handle results here
        IpfsHash = result.IpfsHash;
    }).catch((err) => {
        //handle error here
        console.log(err);
        return;
    });
    return IpfsHash;
}

app.post('/getasset',async function(req,res) { 
    const account = req.body[0];
    console.log(account);
    const userAssets = await UserAssetsModel.findOne({User: account})
    if (!userAssets) {
        // 일치하는 document가 없으면 에러 응답
        UserAssetsModel({
            User: account,
            Asset: [],
        }).save((err)=> {
            if(err) {
                console.err(err.masaage);
                return res.status(400).send("업로드 에러");
            } else {
                console.log("Stard get Asset but not exist account");
                // res.redirect('/');
                return res.send([]);
            }
    }) 
    }
    else res.send(userAssets.Asset);
})

app.post('/ConeUpdate',async function(req,res ){
    const Cone = req.body.Asset;
    UserAssetsModel.updateOne({User:req.body.Account},{Asset:Cone}, function(err,docs){
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated Docs : ", docs);
        }}
        );
    res.status(200).send("seceess");
})

app.post('/loadAdsInfo', async function(req,res) {
    const account = req.body[0];
    console.log(account,"ㅁㄴㅇㄹ");
    const UserAds = await UserAdsModel.findOne({User: account})
    console.log(UserAds);
    if (!UserAds) {
        // 일치하는 document가 없으면 에러 응답
        return res.send([]);
    }
    else return res.status(200).send(UserAds.Position);
})




app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})