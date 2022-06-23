firebase.auth().onAuthStateChanged((user)=>{
    if(user){

        let userId = user.uid;

        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{
            let name = doc.data().name;
            let navUserType = doc.data().userType;

            document.getElementById("navUserName").innerText = name;
            document.getElementById("navUserType").innerText = navUserType;
            console.log(name)
        })
        document.getElementById("Save").onclick = function(){
            let Amount = document.getElementById("Amount").value;
            let Person = document.getElementById("Person").value;
            let Incomedesc = document.getElementById("Incomedesc").value;
            let Paymethod = document.getElementById("Paymethod").value;
            let timestamp = new Date();
            
            console.log(Person);
            firebase.firestore().collection("Addincome").doc().set({
                Amount:Amount,
                Person:Person,
                Incomedesc:Incomedesc,
                timestamp:timestamp,
                Paymethod:Paymethod
            }).then(()=>{
                window.location.reload();
            })
        }
        firebase.firestore().collection("Paymethod").get().then((querySnapshot)=>{
            let content = ''

            querySnapshot.forEach((doc)=>{

                let Paymethod = doc.data().Paymethod;

                content += '<option value="'+ Paymethod+'">'+ Paymethod +'</option>'
            })
            $("#Paymethod").append(content)
        })
        firebase.firestore().collection("EmployeeCred").get().then((querySnapshot)=>{
            let content = ''

            querySnapshot.forEach((doc)=>{

                let fullname = doc.data().fullname;

                content += '<option value="'+fullname+'">'+ fullname +'</option>'
            })
            $("#Person").append(content)
        })


        firebase.firestore().collection("Addincome").get().then((querySnapshot)=>{

            let content = ''

            querySnapshot.forEach((doc)=>{
                
                let Person = doc.data().Person;
                let Amount = doc.data().Amount;
                let Incomedesc = doc.data().Incomedesc;
                let timestamp = doc.data().timestamp;
                let Paymethod = doc.data().Paymethod;

                let theDate = timestamp.toDate().toTimeString();

                content += '<tr>';
                    content += '<th scope = "row">'+ Amount +'</th>';
                    content += '<td>'+ timestamp +'</td>';
                    content += '<td>'+ Person +'</td>';
                    content += '<td>'+ Incomedesc +'</td>';
                    content += '<td>'+ Paymethod +'</td>';
                content += '</tr>'


            })
            console.log(content);
            $("#Rows").append(content);
        })
    }else{
        window.location.href = "login.html";
    }
})
