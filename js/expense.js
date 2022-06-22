firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        let userId = user.uid;

        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{
            let name = doc.data().name;
            let userType = doc.data().userType;

            document.getElementById("navUserName").innerText = name;
            document.getElementById("navUserType").innerText = userType;
        })
        document.getElementById("Save").onclick = function(){
            let Amount = document.getElementById("Amount").value;
            let Expaccount = document.getElementById("Expaccount").value;
            let Paymethod = document.getElementById("Paymethod").value;
            let Employee = document.getElementById("Employee").value;
            let date = document.getElementById("date").value;
            let Expensedesc = document.getElementById("Expensedesc").value;

            firebase.firestore().collection("Expense").doc().set({
                Amount:Amount,
                Expaccount:Expaccount,
                Paymethod:Paymethod,
                Employee:Employee,
                Date:date,
                Expensedesc:Expensedesc
            })
        }

        firebase.firestore().collection("Expense").get().then((expenseSnapshot)=>{
            let content = ''

            expenseSnapshot.forEach((doc)=>{

                let Amount = doc.data().Amount;
                let Expaccount = doc.data().Expaccount;
                let Paymethod = doc.data().Paymethod;
                let Employee = doc.data().Employee;
                let Date = doc.data().Date;
                let Expensedesc = doc.data().Expensedesc;

                let Amountint = parseInt(Amount)
                let grossExp = Amountint + Amountint;
                let Bills = Amountint + 250;

                if(Expaccount == "General expense"){
                    content += '<tr>';
                        content += '<th scope = "row">'+" Ksh " + grossExp +'</th>';
                        content += '<td>'+ Expaccount +'</td>';
                        content += '<td>'+ Paymethod +'</td>';
                        content += '<td>'+ Employee +'</td>';
                        content += '<td>'+ Date +'</td>';
                        content += '<td>'+ Expensedesc +'</td>';
                    content += '</tr>'
                }else if(Expaccount == "Petty cash"){
                    content += '<tr>';
                        content += '<th scope = "row">'+" Ksh " + Amount +'</th>';
                        content += '<td>'+ Expaccount +'</td>';
                        content += '<td>'+ Paymethod +'</td>';
                        content += '<td>'+ Employee +'</td>';
                        content += '<td>'+ Date +'</td>';
                        content += '<td>'+ Expensedesc +'</td>';
                    content += '</tr>'
                }else if(Expaccount == "Bills"){
                    content += '<tr>';
                        content += '<th scope = "row">'+" Ksh " + Bills+'</th>';
                        content += '<td>'+ Expaccount +'</td>';
                        content += '<td>'+ Paymethod +'</td>';
                        content += '<td>'+ Employee +'</td>';
                        content += '<td>'+ Date +'</td>';
                        content += '<td>'+ Expensedesc +'</td>';
                    content += '</tr>'
                }


            })
            console.log(content)
            $("#Rows").append(content)
        })
    }else{
        window.location.href = "login.html";
    }
})