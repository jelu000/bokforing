$( function() {
    $( "#tabs" ).tabs();
  } );

var myButton = document.getElementById('myButton');
//myButton.onclick = tTest();

  function tTest(){
    console.log("test");
  }
//myButton.addEventListener("click", tTest());



//http://salongnobless.se/bokforing/KommunalaSkattesatser.csv
  var GlobalSkattetabell;

/**  -OBS: kund bara hämta max limit 100 poster!
//Read the taxTable from skatteverket.se onLoading site
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      GlobalSkattetabell = JSON.parse(this.responseText);
      document.getElementById("tabs-1").innerHTML = GlobalSkattetabell.results;
      console.log("Start");
      for (var i=0; i<GlobalSkattetabell.results.length; i++){
            console.log("inne: " + i);
            console.log(GlobalSkattetabell.results[i].kommun);

      }

    }
  };
  //https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99/json?_offset=100&_limit=100
  //https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99
  xmlhttp.open("GET", "https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99/json?_offset=100&_limit=1000", true);
  xmlhttp.send();
*/

      //start = now();
			//var results = Papa.parse("http://salongnobless.se/bokforing/KommunalaSkattesatser.csv", config);
			//console.log("Synchronous results:", results);

      var data;
    function getDatan(){

        $.ajax({
      	  type: "GET",
      	  url: "js-tutorials.com_sample_file.csv",
      	  dataType: "text",
      	  success: function(response)
      	  {
      		data = $.csv.toArrays(response);
          console.log(data);
          //generateHtmlTable(data);
      	  }
      	});

      }

  function writeVerTable(twoD_Array){

    var heading = new Array();
    heading[0] = "Konto"
    heading[1] = "Namn"
    heading[2] = "Debet"
    heading[3] = "Kredit"


    var table = document.createElement('TABLE')
    var tableJhaed = document.createElement('THEAD')
    var tableBody = document.createElement('TBODY')

    //TABLE COLUMNS
    table.border = '1';
    table.align = 'center';

    table.appendChild(tableJhaed);
    var tr = document.createElement('TR');
    tableJhaed.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH')

        if (i==1)
          th.width = '220';


        else
          th.width = '75';

        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);

    }

    table.appendChild(tableBody);
    //TABLE ROWS

    for (i = 0; i < stock.length; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        //console.log(i +": ");
        for (j = 0; j < stock[i].length; j++) {
            console.log(stock[i][j]);
            var td = document.createElement('TD')

            if (j==1)
              td.align = 'left';

            td.appendChild(document.createTextNode(stock[i][j]));
            tr.appendChild(td);
        }
        //table.appendChild(tr);
    }

  myTableDiv.appendChild(table)

}//end of function writeVerTable()
