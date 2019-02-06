

function calculateVer(){
    try{
        var income = document.querySelector('#income').value;
        var incomeFloat = parseFloat(income);

        var deposit = document.querySelector('#deposit').value;
        var depositFloat = parseFloat(deposit);

        var sails = document.querySelector('#sails').value;
        var sailsFloat = parseFloat(sails);

        var cashFloat = incomeFloat-depositFloat;
        var workIncFloat = incomeFloat - sailsFloat;

        var taxFloat = 0.2*incomeFloat;
        var sailsFloatExTax = sailsFloat*0.8;
        var workIncFloatExTax = workIncFloat*0.8;

        var myTableDiv = document.getElementById("utmatning")



                   var heading = new Array();
                   heading[0] = "Konto"
                   heading[1] = "Namn"
                   heading[2] = "Debet"
                   heading[3] = "Kredit"


                   var stock = new Array()

                    if (depositFloat==0)
                        stock.push(new Array("1910", "Kassa", cashFloat, "0"));
                    else if (incomeFloat==depositFloat)
                        stock.push(new Array("1930", "Företagskonto", depositFloat, "0"));
                    else {
                        stock.push(new Array("1910", "Kassa", cashFloat, "0"));
                        stock.push(new Array("1930", "Företagskonto", depositFloat, "0"));
                    }

                    stock.push(new Array("2611", "Utgående moms 25%", "0", taxFloat.toFixed(0)));

                    if (sailsFloat==0)
                      stock.push(new Array("3041", "Försäljning tjänst 25% moms", "0" , workIncFloatExTax.toFixed(0)));

                    else if (workIncFloat==0)
                      stock.push(new Array("3051", "Försäljning varor 25% moms", "0" , sailsFloatExTax.toFixed(0)));

                    else{
                      stock.push(new Array("3041", "Försäljning tjänst 25% moms", "0" , workIncFloatExTax.toFixed(0)));
                      stock.push(new Array("3051","Försäljning varor 25% moms", "0" , sailsFloatExTax.toFixed(0)));
                      //stock[3] = new Array("3041", "0" , workIncFloatExTax.toFixed(0))
                    }



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
    }
    catch(err){
        alert("Fel: " + err);
    }
}
