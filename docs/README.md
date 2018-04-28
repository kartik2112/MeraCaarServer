# Mera Caar API

This API can be used for getting details about car components. The details have been fetched from various sources and compiled into 1 interface.

# Usage of MeraCaar API

* **List All Car Component Names**

    **URL:** https://blooming-garden-90433.herokuapp.com/listAllCarComponentsNames

    **Description:** This provides an array of objects where each object has elemCode and elemName of all the components in the database.

    **HTTP Method:** GET

    **Query Parameters:** None

    **Example Output (in JSON):**
        ```
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
        ```

* **List All Unique Car Component Names**

    **URL:** https://blooming-garden-90433.herokuapp.com/listAllUniqueCarComponentsNames

    **Description:** This provides an array of unique objects where each object has elemCode and elemName of all the components in the database. As you can see for listAllCarComponentsNames, the array returned has 4 Stroke Engine returned twice in the array. This endpoint prevents this from happening as shown in example output.

    **HTTP Method:** GET

    **Query Parameters:** None

    **Example Output (in JSON):**
        ```
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
        ```
 