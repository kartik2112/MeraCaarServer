var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require("fs");
var crypto = require("crypto");
var mysql = require('sync-mysql');  //mysql package uses all asynchronous calls which is good for handling multiple requests but the code becomes complex.
                            //Hence, shifted to sync-mysql. Reference: https://www.npmjs.com/package/sync-mysql
var escape = require('escape-html');  //Reference: https://www.npmjs.com/package/escape-html
var decode = require('unescape');     //Reference: https://www.npmjs.com/package/unescape
var md5sum = crypto.createHash('md5');

const PORT = process.env.PORT || 8081
// const PORT = 8081


//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//support parsing of application/json type post data
app.use(bodyParser.json());

// app.use(express.bodyParser());

// app.use(express.static(path.join(__dirname, 'www')));
// console.log(path.join(__dirname, 'www'));

app.use('/sounds',express.static(path.join(__dirname, 'sounds')));

app.use(function (req, res, next) {
  
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });

app.get('/testServer', function (req, res) {
  res.send('Server is responding')
})


app.post('/testPOSTServer', function (req, res) {
  console.log(req);
  res.json(req.body);
})

app.get('/listAllCarComponentsDetails',function(req,res){
  
  var connection = new mysql({
    host     : 'db4free.net',
    user     : 'meracaar_root',
    password : 'kkksss333',
    database : 'meracaar'
  });
  
  // connection.connect();

  var results = connection.query('SELECT * FROM carData');
  // , function (error, results, fields) {
    // if (error) throw error;
  results = JSON.parse(JSON.stringify(results));
  console.log('No of car elements fetched: ', results.length);
  // console.log(results);
  for(var i=0;i<results.length;i++){
    var results1 = connection.query(`SELECT referenceLink FROM carDataReferences WHERE elemCode='${results[i].elemCode}' ORDER BY elemName`);
    // , function (error1, results1, fields1){
      // if (error1) throw error1;
    results1 = JSON.parse(JSON.stringify(results1));
    // console.log(i,"   ",results[i]);
    results[i]['references'] = [];
    for(var j=0;j<results1.length;j++){
      results[i]['references'].push(results1[j].referenceLink);
    }
    // console.log('No of references fetched: ', results1.length);
      
   
  }
  
  res.json(results);
  // connection.end();
  

  // fs.readFile( __dirname + "/" + "carData.json", 'utf8', function (err, data) {
  //     res.setHeader('Content-Type', 'application/json');
  //     // console.log( data );
  //     data = JSON.parse(data);
  //     console.log("Fetching entire JSON file");
  //     res.json( data['carData'] );
  // });
});


app.get('/listAllCarComponentsNames',function(req,res){
  
  // var connection = new mysql({
  //   host     : 'db-kartik.cmkhwhg1ygzk.us-west-2.rds.amazonaws.com',
  //   user     : 'root',
  //   password : 'kkksss333',
  //   database : 'MeraCaar'
  // });

  var connection = new mysql({
    host     : 'db4free.net',
    user     : 'meracaar_root',
    password : 'kkksss333',
    database : 'meracaar'
  });
  
  // connection.connect();

  var results = connection.query('SELECT elemCode,elemName FROM carData ORDER BY elemName');
  // , function (error, results, fields) {
    // if (error) throw error;
  results = JSON.parse(JSON.stringify(results));
  console.log('No of car elements fetched: ', results.length);
  // console.log(results);
  
  
  res.json(results);
  // connection.end();
  

  // fs.readFile( __dirname + "/" + "carData.json", 'utf8', function (err, data) {
  //     res.setHeader('Content-Type', 'application/json');
  //     // console.log( data );
  //     data = JSON.parse(data);
  //     console.log("Fetching entire JSON file");
  //     res.json( data['carData'] );
  // });
});

app.get('/listAllUniqueCarComponentsNames',function(req,res){
  
  var connection = new mysql({
    host     : 'db4free.net',
    user     : 'meracaar_root',
    password : 'kkksss333',
    database : 'meracaar'
  });
  
  // connection.connect();

  var results = connection.query('SELECT elemCode,elemName FROM carData WHERE anchorDisplay=\'true\' ORDER BY elemName');
  // , function (error, results, fields) {
    // if (error) throw error;
  results = JSON.parse(JSON.stringify(results));
  console.log('No of car elements fetched: ', results.length);
  // console.log(results);
  
  
  res.json(results);
  // connection.end();
  

  // fs.readFile( __dirname + "/" + "carData.json", 'utf8', function (err, data) {
  //     res.setHeader('Content-Type', 'application/json');
  //     // console.log( data );
  //     data = JSON.parse(data);
  //     console.log("Fetching entire JSON file");
  //     res.json( data['carData'] );
  // });
});


app.get('/listAllCarComponentsCodes',function(req,res){
  
  var connection = new mysql({
    host     : 'db4free.net',
    user     : 'meracaar_root',
    password : 'kkksss333',
    database : 'meracaar'
  });
  
  // connection.connect();

  var results = connection.query('SELECT elemCode FROM carData ORDER BY elemName');
  // , function (error, results, fields) {
    // if (error) throw error;
  results = JSON.parse(JSON.stringify(results));
  console.log('No of car elements fetched: ', results.length);
  // console.log(results);
  
  var tempResults = [];
  for(var j=0;j<results.length;j++){
    tempResults.push(results[j].elemCode.toLowerCase());
  }
  res.json(tempResults);
  // connection.end();
  

  // fs.readFile( __dirname + "/" + "carData.json", 'utf8', function (err, data) {
  //     res.setHeader('Content-Type', 'application/json');
  //     // console.log( data );
  //     data = JSON.parse(data);
  //     console.log("Fetching entire JSON file");
  //     res.json( data['carData'] );
  // });
});



app.post('/getCarComponentsDetails',function(req,res){
  
  var connection = new mysql({
    host     : 'db4free.net',
    user     : 'meracaar_root',
    password : 'kkksss333',
    database : 'meracaar'
  });
  
  // connection.connect();

  var results = connection.query(`SELECT * FROM carData WHERE elemCode='${req.body.elemCode}'`);
  // , function (error, results, fields) {
    // if (error) throw error;
    console.log(results);
  results = JSON.parse(JSON.stringify(results));
  console.log('No of car elements fetched: ', results.length);
  for(var i=0;i<results.length;i++){
    var results1 = connection.query(`SELECT referenceLink FROM carDataReferences WHERE elemCode='${req.body.elemCode}'`);
    // , function (error1, results1, fields1){
      // if (error1) throw error1;
    results1 = JSON.parse(JSON.stringify(results1));
    // console.log(i,"   ",results[i]);
    results[i]['references'] = [];
    for(var j=0;j<results1.length;j++){
      results[i]['references'].push(results1[j].referenceLink);
    }
    // console.log('No of references fetched: ', results1.length);
      
   
  }

  results[0].explanation = decode(results[0].explanation);
  
  res.json(results[0]);
  // connection.end();
  

  // fs.readFile( __dirname + "/" + "carData.json", 'utf8', function (err, data) {
  //     res.setHeader('Content-Type', 'application/json');
  //     // console.log( data );
  //     data = JSON.parse(data);
  //     console.log("Fetching entire JSON file");
  //     res.json( data['carData'] );
  // });
});




app.post('/addComponentData',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  // console.log(req.body);
  let keyHash = crypto.createHash('md5').update(req.body.modificationKey).digest("hex");

  
  
  var newData = req.body.carData;
  // var newDataReferences = req.body.carDataReferences;
  
  var data = fs.readFileSync( __dirname + "/" + "carData.json", 'utf8');
  data = JSON.parse(data);
  console.log(data);
  if(data['dataModificationKey'] === keyHash){

    var connection = new mysql({
      host     : 'db4free.net',
      user     : 'meracaar_root',
      password : 'kkksss333',
      database : 'meracaar'
    });
  
    var results = connection.query(`INSERT INTO carData(elemCode,elemName,parentGrpName,anchorDisplay,youTubeUrl,sampleImageUrl,explanation,arrow_tail_path_d,arrow_head_path_d,soundUrl) values('${newData.elemCode}','${newData.elemName}','${newData.parentGrpName}','${newData.anchorDisplay}','${"https://www.youtube.com/embed/"+newData.youTubeUrl }','${newData.sampleImageUrl}','${escape(newData.explanation)}','${newData.arrow_tail_path_d}','${newData.arrow_head_path_d}','${newData.soundUrl}')`);
    
    console.log('Data added: ',newData,'\nResult:', results);
    res.json(results);
    
    for(var j=0;j<newData.references.length;j++){
      var results1 = connection.query(`INSERT INTO carDataReferences(elemCode,referenceLink) values('${newData.elemCode}','${newData.references[j]}')`);
      console.log('Data added: ',newData.references[j],'\nResult:', results1);
    }
    
    
    res.json(results);
    
  }
  else{
    res.end("Incorrect key specified");
    console.log("Attempting to add using incorrect key!!!");
  }
});


app.post('/updateComponentData',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  // console.log(req.body);
  let keyHash = crypto.createHash('md5').update(req.body.modificationKey).digest("hex");

  
  
  var newData = req.body.carData;
  // var newDataReferences = req.body.carDataReferences;
  
  var data = fs.readFileSync( __dirname + "/" + "carData.json", 'utf8');
  data = JSON.parse(data);
  console.log(data);
  if(data['dataModificationKey'] === keyHash){

    var connection = new mysql({
      host     : 'db4free.net',
      user     : 'meracaar_root',
      password : 'kkksss333',
      database : 'meracaar'
    });
  
    var results = connection.query(`UPDATE carData SET elemName='${newData.elemName}',parentGrpName='${newData.parentGrpName}',anchorDisplay='${newData.anchorDisplay}',youTubeUrl='${"https://www.youtube.com/embed/"+newData.youTubeUrl }',sampleImageUrl='${newData.sampleImageUrl}',explanation='${escape(newData.explanation)}',arrow_tail_path_d='${newData.arrow_tail_path_d}',arrow_head_path_d='${newData.arrow_head_path_d}',soundUrl='${newData.soundUrl}' WHERE elemCode='${newData.elemCode}'`);
    
    console.log('Data updated: ',newData,'\nResult:', results);
    res.json(results);
    
    var results1 = connection.query(`DELETE FROM carDataReferences WHERE elemCode='${newData.elemCode}'`);
    for(var j=0;j<newData.references.length;j++){
      results1 = connection.query(`INSERT INTO carDataReferences(elemCode,referenceLink) values('${newData.elemCode}','${newData.references[j]}')`);
      console.log('Data added: ',newData.references[j],'\nResult:', results1);
    }
    
    
    res.json(results);
    
  }
  else{
    res.end("Incorrect key specified");
    console.log("Attempting to add using incorrect key!!!");
  }
});


app.post('/deleteComponent',function(req,res){
  res.setHeader('Content-Type', 'application/json');
  // console.log(req.body);
  let keyHash = crypto.createHash('md5').update(req.body.modificationKey).digest("hex");

  
  
  // var newDataReferences = req.body.carDataReferences;
  
  var data = fs.readFileSync( __dirname + "/" + "carData.json", 'utf8');
  data = JSON.parse(data);
  console.log(data);
  if(data['dataModificationKey'] === keyHash){

    var connection = new mysql({
      host     : 'db4free.net',
      user     : 'meracaar_root',
      password : 'kkksss333',
      database : 'meracaar'
    });
  
    var results1 = connection.query(`DELETE FROM carDataReferences WHERE elemCode='${req.body.elemCode}'`);
    var results = connection.query(`DELETE FROM carData WHERE elemCode='${req.body.elemCode}'`);
    
    console.log('Data deleted of : ',req.body.elemCode,'\nResult:', results);
    res.json(results);
    
  }
  else{
    res.end("Incorrect key specified");
    console.log("Attempting to add using incorrect key!!!");
  }
});


var server = app.listen(PORT, function () {
  
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})


// Queries Ran
// //
// create table carData(elemCode varchar(40) PRIMARY KEY, 
//         elemName varchar(60),
//         parentGrpName varchar(40),
//         anchorDisplay varchar(5),
//         youTubeUrl varchar(50),
//         sampleImageUrl varchar(150),
//         explanation varchar(1000),
//         arrow_tail_path_d varchar(60),
//         arrow_head_path_d varchar(60),
//         soundUrl varchar(60));

// create table carDataReferences(elemCode varchar(40), 
//         referenceLink varchar(150),
//         primary key(elemCode, referenceLink),
//         foreign key(elemCode) references carData(elemCode));
