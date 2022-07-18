let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLead") )

if (leadsFromLocalStorage) {
    myLead = leadsFromLocalStorage
    render(myLead)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLead.push(tabs[0].url)
        localStorage.setItem("myLead", JSON.stringify(myLead) )
        render(myLead)
    })
})

function render(lead) {
    let listItems = ""
for (i = 0; i < lead.length; i ++) {
    // listItems += "<li><a target='_blank' href='" + myLead[i]  + "'>" + myLead[i] + "</a></li>"
    listItems += `<li>
        <a target='_blank' href= ${lead[i]}>
        ${lead[i]}</a>
    </li>`
    // const li = document.createElement("li")
    // li.textContent = myLead[i]
    // ulEl.append(li)  
}
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLead = []
    render(myLead)
})

inputBtn.addEventListener("click", function() {
    myLead.push(inputEl.value)
        inputEl.value = ''
        localStorage.setItem("myLead", JSON.stringify(myLead))
    render(myLead)

    console.log(localStorage.getItem("myLead"))
})


