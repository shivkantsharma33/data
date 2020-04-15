
zingchart.MODULESDIR ='https://cdn.zingchart.com/modules/';

      //zingchart function
      zingchart.loadModules("maps,maps-usa", function(){

      
        //sending GET request to json file....
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://deepak2607.github.io/blackcoffer_jsondata.json", true);
        xhttp.send();

        
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200){
            
            //response of request is stored in 'items'
            //response is parsed and stored in 'items2'
            let items= this.responseText;
            let items2 = JSON.parse(items);
            console.log(items2);
            
            //sectors of all items are fetched from 'items2' and stored in 'sectors' (by using map function)
            //now 'sectors' is an array containing all sector as its elements
            let sectors = items2.map(myFunction1)
            function myFunction1(item){
              return item.sector;
            }
            console.log(sectors);

            
            //all sectors of 'sectors' array are reduced to a single paragraph and stored into 'para' (by using reduce function)
            //total number of words in 'para' = 873 (except '&', I ignored '&')
            //total number of words counted from chart is also 873 
            //1+4+19+2+14+38+17+1+2+9+19+49+525+56+15+15+9+9+39+18+2+3+5+2= 873
            let para = sectors.reduce(myFunction2);
            function myFunction2(para, sector, index, array) {
                return para+" "+sector;
            }
            console.log(para);



            let chartConfig = {
              type: 'wordcloud',
              options: {
                //'para' is used as text here
                text: para,
                aspect: 'spiral',
                colorType: 'random',
                ignore: ['establish', 'this', '&'],
                maxItems: 12000,
                minLength: '4px',
                palette: ['#D32F2F', '#1976D2', '#9E9E9E', '#E53935', '#1E88E5', '#7E57C2', '#F44336', '#2196F3', '#A1887F'],
                rotate: true,
                style: {
                  tooltip: {
                    text: 'Frequency: %hits',
                    padding: '5px',
                    alpha: 0.9,
                    backgroundColor: '#D32F2F',
                    borderColor: 'none',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontColor: 'white',
                    fontFamily: 'Calibri',
                    textAlpha: 1,
                    visible: true,
                    width: '130px',
                    wrapText: true
                  },
                  cursor:"pointer",
                  fontFamily: 'Calibri',
                  paddingLeft:'3px',
                  paddingRight:'3px',
                  hoverState: {
                    backgroundColor: '#1976D2',
                    borderColor: 'none',
                    borderRadius: '5px',
                    fontColor: 'white',
                  }
                }
              }
            };


            zingchart.render({ 
              id: 'myChart',
              data: chartConfig
            });

          }

        };

    });