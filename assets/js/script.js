let text = document.querySelectorAll(".text");

document.addEventListener("DOMContentLoaded", function () {
  let basketStr = localStorage.getItem("basket");
  let basket = JSON.parse(basketStr);
  if (!basket || !basket.length) {
    localStorage.setItem("basket", JSON.stringify([]));
  } else {
    ShowCount(basket);
    ShowTotalPrice(basket);
  }
});
text.forEach((element) => {
  element.setAttribute("data-Fulltext", element.innerText);
  if (element.innerText.length > 15) {
    element.innerText = element.innerText.substring(0, 15) + "...";
  }
});

let cart = document.querySelectorAll(".carts");

cart.forEach((car) => {
  car.addEventListener("click", function () {
    ulparent.classList.remove("active");
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      localStorage.setItem("basket", JSON.stringify([]));
      basket = JSON.parse(localStorage.getItem("basket"));
    }
    let product = GetProductsData(this);
    let existedProduct = basket.find((pro) => {
      return pro.id == product.id;
    });
    if (!existedProduct) {
      basket.push(product);
    } else {
      existedProduct.count++;
    }
    ShowCount(basket);
    ShowTotalPrice(basket);
    let basketStr = JSON.stringify(basket);
    localStorage.setItem("basket", basketStr);
    console.log(basket);
  });
});

function GetProductsData(product) {
  let parent = product.parentElement.parentElement.parentElement;
  let id = parent.getAttribute("data-id");
  let price = parent.querySelector(".price").innerText;
  let title = parent.querySelector(".title").innerText;
  let text = parent.querySelector(".text").getAttribute("data-Fulltext");
  let src = parent.querySelector("img").src;
  let result = { id, price, title, text, src, count: 1 };
  return result;
}

function ShowCount(basket) {
  let basketCount = document.querySelector(".basket-count");
  basketCount.innerText = basket.reduce((total, product) => {
    return (total += product.count);
  }, 0);
}

function ShowTotalPrice(basket) {
  let totalPrice = document.querySelector(".total-price");
  totalPrice.innerText = basket.reduce((total, product) => {
    return (total += parseInt(product.price * product.count));
  }, 0);
}

let basketShow = document.getElementById("basket-show");
let ulparent = document.querySelector(".shopping-cart-list");
let itemul = document.querySelector(".item");

basketShow.addEventListener("click", function () {
  ulparent.classList.toggle("active");
  let basket = JSON.parse(localStorage.getItem("basket"));

  itemul.innerHTML = " ";

  basket.forEach((item) => {
    let html = `
    <li class ="d-flex mb-3">
   <div class="image">
     <img src="${item.src}" alt="">
   </div>
   <div class="info">
    <h6>
    ${item.title}
    </h6>
    <span>
    ${item.price}
    </span>
    $
    </div>
    <div class="xbtn">
    <b>
    X
    </b>
    </div>
    
    </li>
    `;
    itemul.innerHTML += html;
  });

  let delbutton = document.querySelectorAll(".xbtn");
  delbutton.forEach((del) => {
    del.addEventListener("click", function () {
      let li = this.parentElement;
      let src = li.querySelector(".image img").src;
      basket = basket.filter((shoes) => shoes.src != src);
      li.remove();
      ShowTotalPrice(basket);
      ShowCount(basket);
      localStorage.setItem("basket", JSON.stringify(basket));
    });
  });
});
