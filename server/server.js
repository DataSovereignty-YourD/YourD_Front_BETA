const bodyParser = require('body-parser')
const express = require('express') 
const app = express()
const path = require("path");
const port = 3001 // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require('cors')
const UserAdsModel = require("./models/UserAds.model")
const multer = require("multer")

// let db=[];
const PINATA_API_KEY="0d11d3cf7d9cf1c20044"
const PINATA_API_SECRET="dd3cb8492cf4144f1e26738a6bedc9d6b9ae631424d57a356dde3799b9492ecd"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());


//광고 세부 데이터
app.post("/", (req,res) => {
    const {User,Title, Description, Category, DepositToken, RpP, Position,AdsCid} = req.body;
    UserAdsModel({
        User,
        Title,
        Description,
        Category,
        DepositToken,
        RpP,
        Position,
        AdsCid,
    }).save((err,db)=> {
        if(err) {
            console.err(err.masaage);
        } else {
            console.log(`successfully ${db}`);
            res.redirect('/');
        }
    })
    return res.status(200).send("업로드 완료");
})

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

app.post("/adsfile", upload.single("file"), function(req,res,next) {
    // storeFileToIPFS(file.originalname);
    res.status(200).send("광고파일 업로드 완료");
})

const storeFileToIPFS = async (name) => {
    const formData = new FormData();
    const src = `/img/${name}`;
    const file = fs.createReadStream(src)
    formData.append(name);
    try {
        const result = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            maxBodyLength: Infinity,
            headers: {
              Accept: "text/plain",
              "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_API_SECRET,
            },
          });
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}


const mongoose = require('mongoose');
const { chownSync } = require('fs');
const { default: axios } = require('axios');
mongoose.connect(
    'mongodb+srv://hwang:wlghkd34kr!@yourd.pfzdjnl.mongodb.net/?retryWrites=true&w=majority',
    {}
).then(()=> console.log("MongoDB conected"))
.catch((err)=> {
    console.log(err);
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`); // '가 아닌 좌측상단의 esc버튼 밑의 `다.
})