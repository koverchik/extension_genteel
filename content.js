function stateDoc() {
  if (document.readyState === "complete") {
    const idElem = document.getElementById("header");
    const blockExtension = document.createElement("div");
    blockExtension.setAttribute("id", "blockExtension");
    idElem.lastChild.before(blockExtension);

    function createBlock(blockArray) {
      const fragment = new DocumentFragment();
      blockArray.forEach((item, i) => {
        let li = document.createElement("li");
        li.innerHTML = item;
        li.addEventListener("click", () => {
          let textareaMSG =
            document.getElementsByClassName("msg-input__button");
          textareaMSG[0].nextElementSibling.classList.remove(
            "msg-input__button_disabled"
          );
          textareaMSG[0].nextElementSibling.removeAttribute("disabled");
          let p = document.createElement("p");
          p.setAttribute("id", "plaseholder");
          p.style.marginTop = "50px";
          p.innerHTML = "Введите любой сивол для подтверждения ввода";
          let textarea = document.getElementById("messaging-widget-textarea");
          textarea.value += item;
          textarea.focus();
          textarea.before(p);
          textarea.addEventListener("keydown", (event) => {
            let plaseholder = document.getElementById("plaseholder");
            if (plaseholder !== null) {
              plaseholder.remove();
            }
          });
        });
        fragment.append(li);
      });
      let ol = document.createElement("ol");
      ol.setAttribute("class", "list-genteel");
      let buttonList = document.createElement("button");
      ol.appendChild(fragment);
      buttonList.innerHTML = "&#8615";
      ol.appendChild(buttonList);
      blockExtension.append(ol);
    }

    createBlock(salutation);
    createBlock(material);
    createBlock(contract);
    createBlock(other);
    createBlock(delivery);
    createBlock(apologies);
    createBlock(elaboration);

    let elemButton = document.querySelectorAll(".list-genteel > button");
    function viewBlock(elem) {
      this.classList.toggle("activ");

      if (this.classList.contains("activ")) {
        let a = 0;
        while (a < elemButton.length) {
          if (elemButton[a] == this) {
            this.style.transform = "rotate(180deg)";
            let listForLap = this.parentNode.childNodes;
            listForLap.forEach((item) => {
              item.style.display = "block";
            });
          } else {
            elemButton[a].parentNode.style.display = "none";
          }
          a++;
        }
      } else {
        this.style.transform = "rotate(0deg)";
        let nodeList = document.querySelectorAll(".list-genteel");

        nodeList.forEach((item, i, arr) => {
          arr[i].style.display = "block";
          item.childNodes.forEach((item, liList, arr) => {
            if (liList < 3) {
              arr[liList].style.display = "block";
            } else {
              arr[liList].style.display = "none";
              let buttonlastChild = arr.length - 1;
              arr[buttonlastChild].style.display = "block";
            }
          });
        });
      }
    }

    elemButton.forEach((item, elem, arr) => {
      item.addEventListener("click", viewBlock);
    });
  }
}

document.addEventListener("readystatechange", stateDoc);
