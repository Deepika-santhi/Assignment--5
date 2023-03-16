const whereAmI=function(lat,longi)
{
fetch(`https://geocode.xyz/${lat},${longi}?geoit=JSON&auth=10727328001576e15970639x34980 `)

.then(function (response)
{
    return response.json();
})
.then (function(data)
{
    console.log(data);
    if(data.city != null && data.country !=null)
    {
        console.log(data.city)
       console.log(data.country)
       console.log(`You are in ${data.city},${data.country}`);
       console.log(data.osmtags.source)
      return data.country
     
    }

    else
    {
        console.log(data.error);
        create("Invalid Input")
        throw new Error("Invalid Input");
       
    }
    
})
.then(
    function(resp)
    {
        
        fetch(`https://restcountries.com/v3.1/name/${resp}`)
        .then(
            function(repeat)
            {
                return repeat.json();
            }
        )
        .then(
            function(dat)
            {
                if(dat !=null && dat!=undefined)
                {
                console.log(dat[0]);
                let capi=dat[0].capital;
                
                console.log(capi[0])
               
                let currency=dat[0].currencies;
               
                let valu=Object.values(currency);
              
                let value=Object.values(valu[0])
                
                console.log(`currency name : ${value[0]}`);
                console.log(`currency value : ${value[1]}`);
                // console.log(valu[0]);
                let conti=dat[0].continents
                console.log(conti[0]);

                let lang=Object.values(dat[0].languages);
                 let langua="";
                // console.log(langua);
                for (const datas of lang.values()) {
                   
                    langua+=datas+",";
                    console.log(datas);
                   
                  }
                  langua=langua.slice(0,langua.length-1)
                  console.log(langua)
               
                 
                  let bor="";
                  for (const border of dat[0].borders) {
                    
                   
                    bor+=border+","
                    console.log(border);
                  }
                  bor=bor.slice(0,bor.length-1)
                  console.log(bor);
                console.log(dat[0].population);
                console.log(dat[0].flag);

                  createHtml(resp,capi[0],value[0],value[1],conti,langua,bor,dat[0].population,dat[0].flag)

                }

                else{
                    console.log(dat.error);
                    throw new Error("Invalid Input");
                  
                }
            }
        )

    }
)

.catch((err)=>{
    console.log(err);
   
})
.finally(
    ()=>{
        console.log("Your request is finished");
    }
)


}
whereAmI(-33.933, 18.474 );

function createHtml(head,Capital,cname,csym,continent,language,bord,population,fla)
{
    document.getElementById("root").innerHTML=
    `<div id="main">
    <h1> ${head}</h1>
    <ul>
    <li>Capital: ${Capital}</li>
    <li>Currency Name: ${cname}</li>
    <li>Currency symbol : ${csym}</li>
    <li> Continents : ${continent}</li>
    <li> Languages : ${language}</li>
    <li> Borders : ${bord}</li>
    <li> Population : ${population}</li>
    <li> Flag : ${fla}</li>
    
    </ul>

    </div>`
}
function create(a)
{document.getElementById("root").innerHTML=
    `<div id="main">
    
    <ul>
    <li>Error: ${a}</li>
    </ul>`
}