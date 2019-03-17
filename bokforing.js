$( function() {
    $( "#tabs" ).tabs();
  } );


  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      document.getElementById("tabs-1").innerHTML = myObj.name;
    }
  };
  xmlhttp.open("GET", "https://skatteverket.entryscape.net/rowstore/dataset/c67b320b-ffee-4876-b073-dd9236cd2a99", true);
  xmlhttp.send();





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
