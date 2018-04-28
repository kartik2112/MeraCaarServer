# Mera Caar API

This API can be used for getting details about car components. The details have been fetched from various sources and compiled into 1 interface.

**For live demonstration of this API usage, check out [Mera Caar](https://mera-caar.firebaseapp.com/home) whose repository can be found here: [Mera Caar - Github](https://github.com/kartik2112/MeraCaar)**

# Usage of MeraCaar API

## List All Car Component Names

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/listAllCarComponentsNames](https://blooming-garden-90433.herokuapp.com/listAllCarComponentsNames)

**Description:** This provides an array of objects where each object has ```elemCode``` and ```elemName``` of all the components in the database.

**HTTP Method:** GET

**Query Parameters:** None

**Example Output (in JSON):**
    
        
        [    
            {
                "elemCode": "engineRWD",
                "elemName": "4 Stroke Engine"
            },
            {
                "elemCode": "engineFWD",
                "elemName": "4 Stroke Engine"
            },
            {
                "elemCode": "carburetor",
                "elemName": "Carburetor"
            },
            {
                "elemCode": "differential",
                "elemName": "Differential System"
            }
        ]
        

## List All Unique Car Component Names

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/listAllUniqueCarComponentsNames](https://blooming-garden-90433.herokuapp.com/listAllUniqueCarComponentsNames)

**Description:** This provides an array of unique objects where each object has ```elemCode``` and ```elemName``` of all the components in the database. As you can see for ```listAllCarComponentsNames```, the array returned has 4 Stroke Engine returned twice in the array. This endpoint prevents this from happening as shown in example output.

**HTTP Method:** GET

**Query Parameters:** None

**Example Output (in JSON):**
    
        
        [    
            {
                "elemCode": "engineFWD",
                "elemName": "4 Stroke Engine"
            },
            {
                "elemCode": "carburetor",
                "elemName": "Carburetor"
            },
            {
                "elemCode": "differential",
                "elemName": "Differential System"
            }
        ]
        

## List All Car Component Codes

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/listAllCarComponentsCodes](https://blooming-garden-90433.herokuapp.com/listAllCarComponentsCodes)

**Description:** This provides an array of ```elemCode```s of all the components in the database.

**HTTP Method:** GET

**Query Parameters:** None

**Example Output (in JSON):**
    
        
        [
             "enginerwd",
             "enginefwd",
             "carburetor",
             "differential",
             "discbrake",
             "drumbrake"
         ]
        

## Get Car Component Details

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/getCarComponentsDetails](https://blooming-garden-90433.herokuapp.com/getCarComponentsDetails)

**Description:** This provides an object containing the details of the car component whose ```elemCode``` is provided through POST. This car component object is as described [here](#meracaar-object-structure).

**HTTP Method:** POST

**Query Parameters:** 
    JSON Object containing ```elemCode``` should be sent through POST to this endpoint. (Direct support present for Angular Requests, otherwise set ```content-type: text/json```)
    
    ```{"elemCode":"engineFWD"}```

**Example Output (in JSON):**
    
        
        {
             "elemCode": "engineFWD",
             "elemName": "4 Stroke Engine",
             "parentGrpName": "FWD",
             "anchorDisplay": "true",
             "youTubeUrl": "https://www.youtube.com/embed/OGj8OneMjek",
             "sampleImageUrl": "https://i2.wp.com/mechstuff.com/wp-content/uploads/2015/10/4StrokeEngine_Ortho_3D_Small.gif?resize=225%2C300",
             "explanation": "<h5>Step 1: Intake Stroke</h5> ... compression strokes.",
             "arrow_tail_path_d": "M244,339 C163,473 351,475 582,487",
             "arrow_head_path_d": "M551,511 C636,481 588,522 576,460",
             "soundUrl": "engine-rev.mp3",
             "references": [
                 "http://www.animatedengines.com/otto.html",
                 "https://www.briggsandstratton.com/na/en_us/support/videos/browse/4-cycle-theory.html",
                 "https://www.linkedin.com/pulse/20140717090644-133229807-principles-and-working-of-four-stroke-gasoline-engine"
             ]
         }
        
 
## Add Car Component

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/addComponentData](https://blooming-garden-90433.herokuapp.com/addComponentData)

**Description:** This is used for adding a new component to the database. Only the admin is allowed to do this. This involves passing a ```carData``` (defined [here](#meracaar-object-structure)) and ```modificationKey``` which is verified for its correctness before the new component data is added into the database.

**HTTP Method:** POST

**Query Parameters:** 
    JSON Object containing ```carData``` defined [here](#meracaar-object-structure) and ```modificationKey``` should be sent through POST to this endpoint. (Direct support present for Angular Requests, otherwise set ```content-type: text/json```)
    Example,
    
      {
           "carData":
                {
                   "elemCode": "engineFWD",
                   "elemName": "4 Stroke Engine",
                   "parentGrpName": "FWD",
                   "anchorDisplay": "true",
                   "youTubeUrl": "https://www.youtube.com/embed/OGj8OneMjek",
                   "sampleImageUrl": "https://i2.wp.com/mechstuff.com/wp-content/uploads/2015/10/4StrokeEngine_Ortho_3D_Small.gif?resize=225%2C300",
                   "explanation": "<h5>Step 1: Intake Stroke</h5> ... compression strokes.",
                   "arrow_tail_path_d": "M244,339 C163,473 351,475 582,487",
                   "arrow_head_path_d": "M551,511 C636,481 588,522 576,460",
                   "soundUrl": "engine-rev.mp3",
                   "references": [
                                      "http://www.animatedengines.com/otto.html",
                                      "https://www.briggsandstratton.com/na/en_us/support/videos/browse/4-cycle-theory.html",
                                      "https://www.linkedin.com/pulse/20140717090644-133229807-principles-and-working-of-four-stroke-gasoline-engine"
                                  ]
                },
            "modificationKey" : "*****"
       }

**Example Output (in JSON):**
     Output can contain ```Incorrect Key Specified``` or 
     
     ```{"fieldCount":0, "affectedRows":1, "insertId":0, "serverStatus":2, "warningCount":0, "message":"", "protocol41":true, "changedRows":0}```
        
        
## Update Car Component

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/updateComponentData](https://blooming-garden-90433.herokuapp.com/updateComponentData)

**Description:** This is used for udpating an existing component in the database. Only the admin is allowed to do this. This involves passing a ```carData``` (defined [here](#meracaar-object-structure)) and ```modificationKey``` which is verified for its correctness before the updated component data is reflected in the database. **Note that in the component ```elemCode``` cannot be changed. If you want to change ```elemCode``` of a component, you need to first delete the existing component and then add a new component with this ```elemCode```.**

**HTTP Method:** POST

**Query Parameters:** 
    JSON Object containing ```carData``` defined [here](#meracaar-object-structure) and ```modificationKey``` should be sent through POST to this endpoint. (Direct support present for Angular Requests, otherwise set ```content-type: text/json```)
    Example,
    
      {
           "carData":
                {
                   "elemCode": "engineFWD",
                   "elemName": "2 Stroke Engine",
                   "parentGrpName": "FWD",
                   "anchorDisplay": "true",
                   "youTubeUrl": "https://www.youtube.com/embed/OGj8OneMk",
                   "sampleImageUrl": "https://i2.wp.com/mechstuff.com/wp-content/uploads/2015/10/4StrokeEngine_Ortho_3D_Small.gif?resize=225%2C300",
                   "explanation": "<h5>Step 1: Intake Stroke</h5> ... compression strokes.",
                   "arrow_tail_path_d": "M244,339 C163,473 351,475 582,487",
                   "arrow_head_path_d": "M551,511 C636,481 588,522 576,460",
                   "soundUrl": "engine-rev.mp3",
                   "references": [
                                      "http://www.animatedengines.com/otto.html"
                                  ]
                },
            "modificationKey" : "*****"
       }

**Example Output (in JSON):**
     Output can contain ```Incorrect Key Specified``` or 
     
     ```{"fieldCount":0, "affectedRows":1, "insertId":0, "serverStatus":2, "warningCount":0, "message":"", "protocol41":true, "changedRows":0}```
        


## Delete Car Component

**URL Endpoint:** [https://blooming-garden-90433.herokuapp.com/deleteComponent](https://blooming-garden-90433.herokuapp.com/deleteComponent)

**Description:** This is used for deleting an existing component from the database. Only the admin is allowed to do this. This involves passing the component's ```elemCode``` and ```modificationKey``` which is verified for its correctness before the component data is deleted from the database.

**HTTP Method:** POST

**Query Parameters:** 
    JSON Object containing ```elemCode``` and ```modificationKey``` should be sent through POST to this endpoint. (Direct support present for Angular Requests, otherwise set ```content-type: text/json```)
    Example,
    
      {"elemCode":"test2", "modificationKey":"*****"}

**Example Output (in JSON):**
     Output can contain ```Incorrect Key Specified``` or 
     
      {"fieldCount":0, "affectedRows":1, "insertId":0, "serverStatus":2, "warningCount":0, "message":"", "protocol41":true, "changedRows":0}
        
      
        
        
        
# MeraCaar Object Structure
 
 The attributes of the object used by MeraCaar Server API are:
 
* **elemCode:** This is the element code of the component. This uniquely identifies each component. Components like engine are duplicated since there are 2 views (Front and Rear Wheel Drive at [Mera Caar](https://mera-caar.firebaseapp.com)). Thus, multiple components might have same ```description```, ```youTubeUrl```, ```sampleImageUrl``` but might have different ```arrow_tail_path_d``` for different views. This may be done to indicate engine in Front Wheel and Rear Wheel Drive views. Hence, they need to be identified using different ```elemCode```s.
* **elemName:** This is the name of the component.
* **parentGrpName:** This is the view in which the component will be pointed out. This is specifically useful to [Mera Caar](https://mera-caar.firebaseapp.com) where different views have different components indicated in them. Values currently supported: ```Sys | CoolSys | SuspBreakSys | FWD | RWD```
* **anchorDisplay:** As mentioned in ```elemCode```, multiple components in database can have same content for different views. This may be done to indicate engine in Front Wheel and Rear Wheel Drive views. This is used for filtering the components in the database for finding out only unique components. Thus, in this case, only one of such duplicate components will be having ```anchorDisplay``` value true.
 Possible Values: ```true | false```
* **youTubeUrl:** This is the URL of the YouTube video most relevant to the component preselected by the admin of this API. This is of the format: [https://www.youtube.com/embed/XXXXXX](https://www.youtube.com/embed/XXXXXX). Here, XXXXXX is the YouTube video code that can be found in the URL of that video. This format is necessary for embedding the YouTube video IFrame in the page.
* **sampleImageUrl:** This is the URL of the image most relevant to the component preselected by the admin of this API.
* **explanation:** This is the explanation most relevant to the component preselected by the admin of this API. This explanation is written using HTML tags, so that it can be directly displayed along with formatting.
* **arrow_tail_path_d:** This holds the coordinates of the arrow tail that points to the component in the view. **Ignore This since it is specific to [Mera Caar](https://mera-caar.firebaseapp.com)**.
* **arrow_head_path_d:** This holds the coordinates of the arrow head that points to the component in the view. **Ignore This since it is specific to [Mera Caar](https://mera-caar.firebaseapp.com)**.
* **soundUrl:** This holds the filename of the sound most relevant to the component preselected by the admin of this API. If the soundUrl is ```engine-rev.mp3```, then this sound can be found at the URL: [https://blooming-garden-90433.herokuapp.com/sounds/engine-rev.mp3](https://blooming-garden-90433.herokuapp.com/sounds/engine-rev.mp3)
* **references:** This is an array of URLs to references most relevant to the component preselected by the admin of this API.
 
 
