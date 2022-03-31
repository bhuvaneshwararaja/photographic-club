
var xml = new XMLHttpRequest;



function getInp(){
    const regNo = document.querySelector('.regno').value
    const voteNo = document.querySelector('.vote').value
    const regErr = document.querySelector('.reg-err')
    const  voteErr = document.querySelector('.vote-err')
    document.querySelector(".exist").innerHTML = ""
    document.querySelector('.th').innerHTML = ""

    const errReg = (regNo.length >= 5 || regNo === "") ? regErr.innerHTML="" : regErr.innerHTML ="Enter valid RegNo"
    const errVote = (parseInt(voteNo) <= 15 || voteNo === "") ? voteErr.innerHTML="" : voteErr.innerHTML ="Please provide value between 1 to 15"
    return (errReg !== "" || errVote !== "" ) ? 0 : {registrationNo:regNo, votingNo:voteNo}
}

function onSubmit(){
    var respon = getInp()
    fetch("/voting",{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(respon)
    }).then((res) => {return res.json()})
    .then((res) => { 
        if(res.status === false){
            document.querySelector('.exist').innerHTML = "User Already Exist"
        }
        else{
            document.querySelector('.regno').value = ""
            document.querySelector('.vote').value = ""
            document.querySelector('.th').innerHTML = "Thankyou for Voting"
        }
    })
    .catch(error => console.error(error))
    
}


function CalcThreeWinner(){
    
    const AllPhotoVote = document.querySelectorAll('.vote--count')
    const ResultText = document.querySelectorAll('.result--text')
    const temp = []
    for(let i = 0; i < AllPhotoVote.length; i++){
        temp.push(AllPhotoVote[i].getAttribute('data-vote'))
    }
    temp.sort((a,b) => a-b)
    let search = temp[temp.length-1]
    AllPhotoVote.forEach((curr,index) => {
        if(curr.getAttribute('data-vote') == search){
            document.querySelector('.winner').innerHTML = `Pixie Event Winner PhotoNo ${index+1}`
        }
    })

    let count = 1
    var itr = 0
    while(itr !=15){
        if(count < 4){
            if(AllPhotoVote[itr].getAttribute('data-vote') == search){

                count == 1 ? ResultText[itr].style.background ="greenyellow" :(count == 2 ? ResultText[itr].style.background ="indianred":ResultText[itr].style.background ="sandybrown")
                count == 1 || count == 2 || count == 3 ?ResultText[itr].style.boxShadow =' rgb(255 255 255 / 64%) 0px 3px 14px 7px' :""
                count++
                search = temp[temp.length-count]
                itr = 0
            }
        } 
        else{
            break
        }
        itr++
    }
    
}

function CreateChartResult(arr){
    const bgArray = Array(arr.length).fill('rgba(54, 162, 235, 1)')
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            datasets: [{
                label: `Votes`,
                data: arr,
                backgroundColor:bgArray,
                borderColor:bgArray,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function CreateNodeAndAppendResult(arr){
    var len = arr.length
    for(var i=0;i<len;i++){
        const ptag = document.createElement('p')
        const textNode1 = document.createTextNode(`photo No: ${i+1}  `)
        ptag.appendChild(textNode1)
        ptag.setAttribute('class','result--text')
        const spantag = document.createElement('span')
        const textNode2 = document.createTextNode(`Votes: ${arr[i]}`)
        spantag.appendChild(textNode2)
        spantag.setAttribute('class','vote--count')
        spantag.setAttribute('data-vote',arr[i])

        ptag.appendChild(spantag)
        document.querySelector('.chart--results').appendChild(ptag)
    }

}



function ClubResult(){
    var arr = Array(15).fill(0)
    // for(let i=0;i<15;i++) arr.push(0)
    xml.open('GET',"/result/view")
    xml.send()
    xml.onload = function() {
            const result = JSON.parse(this.responseText)
            var len = result.length

            for(let i=0;i<len;i++){
                arr[parseInt(result[i].vote)-1]+=1
            }
           
            CreateNodeAndAppendResult(arr)
            CalcThreeWinner()
            CreateChartResult(arr)
   

    }
}

