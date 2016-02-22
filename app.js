var http = require("http");
var express = require("express");

var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Firebase = require("firebase");
//var connection = mongoose.connect("mongodb://localhost/data");
var connection = mongoose.connect("mongodb://tahir:pak123@ds013918.mongolab.com:13918/tahir");
var q = require("q");
var cors = require("cors");

var app = express();
app.use(cors());

var staticFolder = path.join(__dirname, "static");
var myData = path.join(staticFolder, "./myapp/www/")
app.use(express.static(myData));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var adminPortal = new mongoose.Schema({
    companyName: {type: String},
    companyAddress: {type: String},
    Products: {type: Array},
    firebaseToken: {type: String}

});

var userSchema = new mongoose.Schema({

    name: {type: String, required: true},
    fname: {type: String, required: true},
    email: {type: String, required: true},
    pass: {type: String, required: true},
    age: {type: Number, required: true},
    createdOn: {type: Date, default: Date.now()},
    firebaseToken: {type: String, required: true}

});

var salesmanSchema = new mongoose.Schema({
    userName: {type: String},
    userLastName: {type: String},
    userPass: {type: String},
    firebaseToken: {type: String}
});

var productSchema = mongoose.Schema({
    productName: {type: String},
    productWeight: {type: Number},
    productPrice: {type: Number},
    firebaseToken: {type: String}

});
var salemanOrder = mongoose.Schema({
    firebaseToken: {type: String},
    productName: {type: String},
    productWeight: {type: Number},
    productPrice: {type: Number},
    lat: {type: Number},
    long: {type: Number}
});

var userModel = mongoose.model("users", userSchema);
var companyModel = mongoose.model("companies", adminPortal);
var salesmanModel = mongoose.model("salesman", salesmanSchema);
var productModel = mongoose.model("products", productSchema)
var orderModel = mongoose.model("orders", salemanOrder);
app.get("/", function (req, res) {
    res.sendfile(myData);
});


app.post("/addOrders", function (req, res) {
    var order = new orderModel(req.body);
    order.save(function (err, success) {
            res.send(err || success)
        }
    );
});
app.get("/getOrders/:token", function (req, res) {
    orderModel.find({firebaseToken: req.params.token}, function (err, success) {
        res.send(err || success)
    });
});

app.post("/salemanLogin", function (req, res) {
    salesmanModel.findOne({userName: req.body.userName, userPass: req.body.password}, function (err, data) {
        res.send(err || data)
    })
});

app.post("/login", function (req, res) {


    userModel.findOne({email: req.body.email, pass: req.body.pass}, function (err, data) {
        console.log(data)
        if (err) {
            console.log("errorr" + err);
            res.json({success: false, "message": "Internal error"})

        } else {
            if (!data) {
                console.log("record not found");
                res.json({success: false, "message": "user not found", data: data});

            }
            else {
                console.log("data posted successfully");
                console.log(data);
                res.json({success: true, "message": "data Success", data: data})

            }
        }

    })
    console.log(req.body)

});


app.post("/signUp", function (req, res) {


    var ref = new Firebase("https://abc12345.firebaseio.com/usersData");
    ref.createUser({
        email: req.body.email,
        password: req.body.pass
    }, function (error, userData) {
        if (error) {
            console.log("Error creating user:", error);
        } else {
            req.body.firebaseToken = userData.uid;
            var user = new userModel(req.body)
            user.save(function (err, success) {
                console.log(err || success)
                if (err) {
                    res.send(err)
                }
                else {
                    res.send("inserted successfully");
                }

            });

            console.log(req.body);
            console.log("Successfully created user account with uid:", userData.uid);
        }
    });


})


app.post("/createCompany", function (req, res) {

    var createCompany = new companyModel(req.body);
    console.log('Data sending to Data base', req.body)
    createCompany.save(function (err, datas) {

        if (err) {
            console.log('eer', err)
            res.send(err);
        }
        else {
            res.send(datas)
            console.log('Data receiving form Database', datas)

            //  res.send("company data insterted successfully",data);
            // console.log("Create Company ", createCompany);
        }
        //     companyModel.findOne({
        //     // companyName    : req.body.companyName,
        //     // companyAddress : req.body.companyAddress,
        //     // Products       : req.body.Products,
        //     token          : req.body.token
        //     },
        //     function(err,data){
        //         if(err){
        //             console.log(err);
        //  }
        //         else{
        //             console.log("your data is " + data);
        //             res.json({success: true, data: data})
        //            // res.send(data);
        //         }
        //     }
        //     )
        //     }
    })


});


app.get("/getCompany/:fToken", function (req, res) {
    console.log("Token : ", req.params.fToken)


    companyModel.findOne({firebaseToken: req.params.fToken}, function (err, data) {



            // console.log("get data ", data);
            if (err) {
                // res.json({success: false, "msg": "reciving error",err:err})
                // res.send(err)
                console.log("Error ", err);
                res.send("No data exist");
            }
            else {
                //console.log('your fucking data is ', data);
                res.send(data);
                //res.json({success:true,"msg": "reciveing Data",data:data})
                //res.send(data);

            }
        }
    )
})

app.post("/salesman", function (req, res) {
    console.log("saleman dataa ! ", req.body);
    var salesman = new salesmanModel(req.body);
    salesman.save(function (err, success) {
        if (err) {
            console.log(err);
            res.send(err);

        }
        else {
            console.log(success);
            res.send(success);
        }
    })


});

app.get("/getSalesman/:token", function (req, res) {

    console.log("now getting data");

    salesmanModel.find({firebaseToken: req.params.token}, function (err, data) {
        console.log(req.body)
        if (err) {
            res.send("Error ! ", err)
        }
        else {
            // res.status("salesman data is getting ! ").send(data)
            // res.send("salesman data is getting ! " , data)
            res.send(data);
            console.log("get data ", data)
        }
    })
});

app.post("/product", function (req, res) {
    console.log("product data !", req.body);
    var products = new productModel(req.body);
    products.save(function (err, data) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log("product data is saving ! ", data);
            res.send(data)
        }
    })
});

app.get("/getproduct/:token", function (req, res) {
    console.log("now getting products");
    productModel.find({firebaseToken: req.params.token}, function (err, data) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log("get product data ! ", data)
            res.send(data)
        }
    })

});


app.listen(3000, function () {
    console.log("app started!");
});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    