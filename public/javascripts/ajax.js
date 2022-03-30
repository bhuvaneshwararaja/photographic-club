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
        console.log(res)
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
// function ClubResult(){
//     var arr = []

//     console.log("true")
//     for(let i=0;i<15;i++) arr.push(0)
//     // arr.fill(0)
//     console.log(arr)
//     xml.open('GET',"/result/view")
//     xml.send()
//     xml.onload = function() {
//             const result = JSON.parse(this.responseText)
//             var len = result.length
//             for(let i=0;i<len;i++){
//                 arr[parseInt(result[i].vote)-1]+=1
//             }

//             console.log(Math.max(arr))
//             let max = arr.reduce(function(a,b) {
//                 return Math.max(a,b)
//             })
//             console.log()
//             const ctx = document.getElementById('myChart').getContext('2d');
//     const myChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
//             datasets: [{
//                 label: `Votes`,
//                 data: arr,
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(153, 102, 255, 1)',

//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 2
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });

//     }
// }

