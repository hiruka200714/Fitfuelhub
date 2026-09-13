const products=[
{name:"FitFuel Power Bar",cat:"Snacks",price:650,icon:"🍫",desc:"20g protein • under 5g sugar"},
{name:"FitFuel Clear Creatine",cat:"Supplements",price:4500,icon:"🥤",desc:"Water-soluble and unflavored"},
{name:"Whey Protein",cat:"Supplements",price:9500,icon:"💪",desc:"Protein support for active lifestyles"},
{name:"Protein Snack Pack",cat:"Snacks",price:1200,icon:"🥜",desc:"Convenient high-protein snacks"},
{name:"Banana Protein Shake",cat:"Drinks",price:1050,icon:"🍌",desc:"Banana, oats, milk and whey"},
{name:"Chocolate Protein Shake",cat:"Drinks",price:1100,icon:"🍫",desc:"Chocolate flavor with whey protein"},
{name:"Mango Smoothie",cat:"Drinks",price:950,icon:"🥭",desc:"Fresh mango and healthy ingredients"},
{name:"Daily Vitamins",cat:"Supplements",price:3200,icon:"💊",desc:"Everyday nutritional support"}
];
const meals=[
{name:"High-Protein Bowl",price:1250,icon:"🍗",desc:"Balanced protein-focused meal"},
{name:"Power Salad",price:1050,icon:"🥗",desc:"Fresh, balanced and wholesome"},
{name:"Protein Oats",price:850,icon:"🥣",desc:"Convenient protein-rich breakfast"},
{name:"Chicken Rice Meal",price:1350,icon:"🍚",desc:"Balanced meal for active lifestyles"}
];
let cart=JSON.parse(localStorage.getItem("ffhCart")||"[]"), currentCat="All";

function money(n){return "Rs. "+n.toLocaleString("en-LK")}
function renderFilters(){
 const cats=["All",...new Set(products.map(p=>p.cat))];
 document.getElementById("filters").innerHTML=cats.map(c=>`<button class="${c===currentCat?"active":""}" onclick="currentCat='${c}';renderFilters();renderProducts()">${c}</button>`).join("");
}
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const list=products.filter(p=>(currentCat==="All"||p.cat===currentCat)&&(p.name+" "+p.desc).toLowerCase().includes(q));
 document.getElementById("products").innerHTML=list.map(p=>card(p)).join("")||"<p>No products found.</p>";
}
function renderMeals(){document.getElementById("mealsGrid").innerHTML=meals.map(m=>card(m)).join("")}
function card(p){return `<article class="product"><div class="pic">${p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="add" onclick='add(${JSON.stringify(p)})'>Add to Cart</button></article>`}
function add(p){cart.push({...p,id:Date.now()+Math.random()});save();openCart()}
function save(){localStorage.setItem("ffhCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function openCart(){renderCart();document.getElementById("modal").classList.add("open")}
function closeCart(){document.getElementById("modal").classList.remove("open")}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML="<p>Your cart is empty.</p>";document.getElementById("total").textContent="";return}
 box.innerHTML=cart.map((p,i)=>`<div class="cartLine"><span>${p.icon} ${p.name}</span><span class="qty"><button onclick="removeItem(${i})">−</button> ${money(p.price)} <button onclick="removeItem(${i})">×</button></span></div>`).join("");
 document.getElementById("total").textContent="Total: "+money(cart.reduce((s,p)=>s+p.price,0));
}
function removeItem(i){cart.splice(i,1);save();renderCart()}
function checkout(){if(!cart.length)return alert("Your cart is empty.");alert("Demo checkout: connect this button to your payment gateway and backend.");}
function recommend(){
 const g=document.getElementById("goal").value,l=document.getElementById("life").value;
 let r=g==="Muscle building"?"Try high-protein meals, whey protein and protein snacks."
 :g==="Sports performance"?"Explore performance nutrition, hydration and a coaching consultation."
 :g==="Convenient healthy eating"?"Try meal prep, ready-to-drink smoothies and protein snacks."
 :"Start with balanced meals and personalized nutrition guidance.";
 document.getElementById("recommendation").textContent=r;
}
renderFilters();renderProducts();renderMeals();save();