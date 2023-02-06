let ul = document.querySelector(".item");
let ulparent = document.querySelector(".shopping-cart-list");
let basket = JSON.parse(localStorage.getItem("basket"));

ul.innerHTML = " ";
basket.forEach((shoes) => {
  let task = `
<li class ="d-flex mb-3">
<div class="image">
    <img src="${shoes.src}" alt="">
</div>
<div class="info">
   <h2>${shoes.title}</h2>
   <span>${shoes.count}</span>
   <span>x</span>
    <span>${shoes.price}AZN</span>
</div>
<div class="xbtn">
    <b>X</b>
</div>
</li>
`;
  ul.innerHTML += task;
});

let delbtn = document.querySelectorAll(".xbtn");

delbtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let li = this.parentElement;
    let src = li.querySelector(".image img").src;
    basket = basket.filter((device) => device.src != src);
    li.remove();
    localStorage.setItem("basket", JSON.stringify(basket));
    ShowTotalPrice(basket);
    ShowCount(basket);
  
  });
});
