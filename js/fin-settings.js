firebase.auth().onAuthStateChanged((user)=>{
    
    if(user){

        let userId = user.uid;

        firebase.firestore().collection("users").doc(userId).get().then((doc)=>{
            let name = doc.data().name;
            let navUserType = doc.data().userType;

            document.getElementById("navUserName").innerText = name;
            document.getElementById("navUserType").innerText = navUserType;
            
        })

        document.getElementById("Save").onclick = function(){
            let Paymethod = document.getElementById("PaymentMethod").value;

            console.log(Paymethod)
            let PaymentMethod = firebase.firestore().collection("Paymethod").doc()
            PaymentMethod.set({
                Paymethod:Paymethod,
                docId:PaymentMethod.id

                
            }).then(()=>{
                
                window.location.reload();
            })
        }
        firebase.firestore().collection("Paymethod").get().then((querySnapshot)=>{
            let content = '';

            querySnapshot.forEach((doc)=>{

                let Paymethod = doc.data().Paymethod;

                content += '<tr>';
                    content += '<th scope = "row">'+ Paymethod +'</th>';
                    content += '<td><button class="btn btn-danger">Delete</button> </td>';
                content += '</tr>'
            })
            $("#Rows").append(content)
        })

    }else{

    }
})
