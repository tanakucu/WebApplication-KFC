document.addEventListener("DOMContentLoaded", function () {
  const dialog = document.getElementById("myDialog");
  window.showDialog = function () {
    if (dialog) {
      dialog.show();
      document.getElementById("overlay").style.display = "block";
    } else {
      console.error("Dialog element not found");
    }
  };

  window.closeDialog = function () {
    if (dialog) {
      dialog.close();
      document.getElementById("overlay").style.display = "none";
    } else {
      console.error("Dialog element not found");
    }
  };
});

function showSidebar() {
  const sidebar = document.querySelector(".sidebar1");
  sidebar.style.display = "flex";
  console.log("nnn");
  const parent = document.getElementById("side2");

  const newli = document.createElement("li");
  newli.classList.add("toggle2");
  newli.addEventListener("click", hideSidebar);
  newli.innerHTML = ' <i class="fa-solid fa-x"></i>';
  const oldli = document.querySelector(".toggle");
  parent.removeChild(oldli);
  parent.appendChild(newli);
}
function hideSidebar() {
  const sidebar = (document.querySelector(".sidebar1").style.display = "none");
  console.log("nnnn");
  const parent = document.getElementById("side2");
  const newli = document.createElement("li");
  newli.classList.add("toggle");
  newli.addEventListener("click", showSidebar);
  newli.innerHTML = ' <i  class="fas fa-bars"></i>';
  const oldli = document.querySelector(".toggle2");
  parent.removeChild(oldli);
  parent.appendChild(newli);
}
