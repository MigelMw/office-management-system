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

            let fullname = document.getElementById("Fullname").value;
            let IDnumber = document.getElementById("IDnumber").value;
            let date = document.getElementById("date").value;
            let Contract = document.getElementById("Contract").value;
            let Shift = document.getElementById("Shift").value;
            let Department = document.getElementById("Department").value;
            let Salary = document.getElementById("Salary").value;

            firebase.firestore().collection("EmployeeCred").doc().set({

                fullname:fullname,
                IDnumber:IDnumber,
                date:date,
                Contract:Contract,
                Shift:Shift,
                Department:Department,
                Salary:Salary
            })
            
        }
       
        firebase.firestore().collection("EmployeeCred").get().then((employeeSnapshot)=>{
            
            let content = ''

            employeeSnapshot.forEach((doc)=>{

                let fullname = doc.data().fullname;
                let IDnumber = doc.data().IDnumber;
                let date = doc.data().date;
                let Contract = doc.data().Contract;
                let Shift = doc.data().Shift;
                let Department = doc.data().Department;
                let Salary = doc.data().Salary;

                content += '<tr>';
                    content += '<th scope = "row">'+ fullname +'</th>';
                    content += '<td>'+ IDnumber +'</td>';
                    content += '<td>'+ date +'</td>';
                    content += '<td>'+ Contract +'</td>';
                    content += '<td>'+ Shift +'</td>';
                    content += '<td>'+ Department +'</td>';
                    content += '<td>'+"Ksh " + Salary +'</td>';
                content += '</tr>'
            })
            $("#Rows").append(content)
        }).then(()=>{
            window.location.reload;
        })
    }
})

