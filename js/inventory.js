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

            let itemName = document.getElementById("itemName").value;
            let itemDesc = document.getElementById("ItemDesc").value;
            let Code = create_random_string(5);
            // function create_random_string(string_length){
            //     let random_string =''
            //     let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
        
            //     for(var i,i = 0; i < string_length; i++){
            //         random_string +=characters.charAt(Math.floor(Math.random()*characters.length))
            //     }
            //     return random_string
            // }
            
            firebase.firestore().collection("Inventory").doc().set({
                itemName:itemName,
                itemDesc:itemDesc,
                Code:Code
            }).then(()=>{
                window.location.reload();
            })

        }
        firebase.firestore().collection("Inventory").get().then((querySnapshot)=>{

            let content = ''
            querySnapshot.forEach((doc)=>{

                let itemName = doc.data().itemName;
                let Code = doc.data().Code;
                let itemDesc = doc.data().itemDesc;

                content += '<tr>';
                    content += '<th scope = "row">'+ itemName +'</th>';
                    content += '<td>'+"INV-"+ Code +'</td>';
                    content += '<td>'+ itemDesc +'</td>';
                content += '</tr>'  
            })
            $("#Rows").append(content)
        })

        
    }else{

    }
})