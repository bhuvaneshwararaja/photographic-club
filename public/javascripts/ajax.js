
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
    var response = getInp()
    if(response !=0 ){
        var xml = new XMLHttpRequest;
        xml.open('POST',"http://172.16.5.94:3000/voting")
        xml.setRequestHeader('Content-Type', 'application/json')
        xml.send(JSON.stringify(response));
        xml.onload = function(){
            if(this.responseText == "0") document.querySelector('.exist').innerHTML = "User Already Exist"
            else{
                document.querySelector('.regno').value = ""
                document.querySelector('.vote').value = ""
                document.querySelector('.th').innerHTML = "Thankyou for Voting"
            }
           
        }
        
    }
    
}