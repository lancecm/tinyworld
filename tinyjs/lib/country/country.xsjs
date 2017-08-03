    function saveCountry(country) {
    // Connnect to HANA service
    var conn = $.hdb.getConnection();
    // Parameters
    var output = JSON.stringify(country);
    // Load procedure
    var fnCreateCountry = conn.loadProcedure("tinyworld.tinydb::createCountry");
    // Execute procedure using parameters
    var result = fnCreateCountry({IM_COUNTRY: country.name, IM_CONTINENT: country.partof});
    // Commit SQL
    conn.commit();
    // Close connection
    conn.close();
    // Returen results
    if (result && result.EX_ERROR != null) {
          return {body : result, status: $.net.http.BAD_REQUEST};
    } else {
          return {body : output, status: $.net.http.CREATED};
    }
    }
    // Get request
    var body = $.request.body.asString();
    // Parse request
    var country = JSON.parse(body);
    // Validate the inputs here!
    // Insert data into database
    var output = saveCountry(country);
    // Set response type
    $.response.contentType = "application/json";
    // Set body
    $.response.setBody(output.body);
    // Set status
    $.response.status = output.status;