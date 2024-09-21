let myLeads = [];
let wrapper = document.querySelector(".wrapper");
let newUnorderedList = document.createElement("ul");

// localStorage.setItem("myLeads", "www.google.com");
// console.log(localStorage.getItem("myLeads"));
// localStorage.clear();

// let newArray = JSON.parse(myLeads);
// console.log(typeof newArray);
// newArray.push("www.github.com");
// console.log(newArray);
// let newString = JSON.stringify(newArray);
// console.log(typeof newString);

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

function saveURL() {
    let urlInput = document.getElementById("url_input");
    if (urlInput.value !== "") {
        myLeads.push(urlInput.value);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        urlInput.value = "";
        renderLeads(myLeads);
    }
}

function renderLeads(arr) {
    newUnorderedList.innerHTML = " ";
    for (let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement("li");
        let newArcorTag = document.createElement("a");
        newArcorTag.setAttribute("class", "ancor_item")
        newListItem.setAttribute("class", "list_item");
        newArcorTag.target = "_blank";
        newArcorTag.href = arr[i];
        newArcorTag.textContent = arr[i];
        newListItem.appendChild(newArcorTag);
        newUnorderedList.appendChild(newListItem);
        wrapper.appendChild(newUnorderedList);
    }
}


const saveBtn = document.getElementById("save_btn");
saveBtn.addEventListener("click", saveURL);

function deleteAllLeads() {
    myLeads = [];
    localStorage.clear();
    newUnorderedList.innerHTML = "";
}

const deleteBtn = document.getElementById("delete_btn");
deleteBtn.addEventListener("dblclick", deleteAllLeads);

function saveTabLeads() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads)
    });
}

const savetabBtn = document.getElementById("save_tab_btn");
savetabBtn.addEventListener("click", saveTabLeads);