(function () {
  // Create the connector object
  var myConnector = tableau.makeConnector();

  // Define the schema
  myConnector.getSchema = function (schemaCallback) {
    var cols = [
      {
        id: "identity",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "vote_identity",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "image",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "ip_latitude",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "ip_longitude",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "ip_city",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "ip_country",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "ip_asn",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "ip_org",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "stake_weight",
        dataType: tableau.dataTypeEnum.float,
      },
      {
        id: "epoch_credits",
        dataType: tableau.dataTypeEnum.int,
      },
    ];

    var tableSchema = {
      id: "validators",
      alias: "Solana Validators",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  // Download the data
  myConnector.getData = function (table, doneCallback) {
    $.getJSON("https://api.stakewiz.com/validators", function (resp) {

      var feat = resp,
        tableData = [];

      // Iterate over the JSON object
      for (var i = 0, len = feat.length; i < len; i++) {
        tableData.push({
          identity: feat[i].identity,
          vote_identity: feat[i].vote_identity,
          name: feat[i].name,
          image: feat[i].image,
          ip_latitude: feat[i].ip_latitude,
          ip_longitude: feat[i].ip_longitude,
          ip_city: feat[i].ip_city,
          ip_country: feat[i].ip_country,
          ip_asn: feat[i].ip_asn,
          ip_org: feat[i].ip_org,
          stake_weight: feat[i].stake_weight,
          epoch_credits: feat[i].epoch_credits,
        });
      }

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  // Create event listeners for when the user submits the form
  $(document).ready(function () {
    $("#submitButton").click(function () {
      tableau.connectionName = "Solana Validators"; // This will be the data source name in Tableau
      tableau.submit(); // This sends the connector object to Tableau
    });
  });
})();
