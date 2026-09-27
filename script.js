document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    const shoeThemes = [
        {image:"../Assets/images/shoe.png", accent:"#9CFF00"},
        {image:"../Assets/images/shoe2.png", accent:"#4B6FFF"},
        {image:"../Assets/images/shoe3.png", accent:"#D84A4A"},
        {image:"../Assets/images/shoe4.png", accent:"#E88928"}
    ];

    const shoeImage = document.getElementById("shoe-image");
    const shoeButtons = [...document.querySelectorAll(".shoe-select")];
    let currentShoe = 0;
    let sliderTimer;

    function applyShoeTheme(theme){
        root.style.setProperty("--theme-accent", theme.accent);
        root.style.setProperty("--theme-glow", hexToRgba(theme.accent,.35));
        root.style.setProperty("--theme-glow-soft", hexToRgba(theme.accent,.12));
    }

    function hexToRgba(hex, alpha){
        const n = hex.replace("#","");
        const r=parseInt(n.slice(0,2),16), g=parseInt(n.slice(2,4),16), b=parseInt(n.slice(4,6),16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    function showShoe(index, animate=true){
        currentShoe=(index+shoeThemes.length)%shoeThemes.length;
        const theme=shoeThemes[currentShoe];
        applyShoeTheme(theme);

        shoeButtons.forEach((btn,i)=>btn.classList.toggle("active",i===currentShoe));

        if(animate){
            shoeImage.classList.add("shoe-changing");
            setTimeout(()=>{
                shoeImage.src=theme.image;
                shoeImage.classList.remove("shoe-changing");
            },500);
        }else{
            shoeImage.src=theme.image;
        }
    }

    function resetSlider(){
        clearInterval(sliderTimer);
        sliderTimer=setInterval(()=>showShoe(currentShoe+1,true),7000);
    }

    shoeButtons.forEach(btn=>{
        btn.addEventListener("click",()=>{
            showShoe(Number(btn.dataset.index),true);
            resetSlider();
        });
    });

    showShoe(0,false);
    resetSlider();

    document.querySelectorAll("[data-scroll]").forEach(btn=>{
        btn.addEventListener("click",()=>{
            document.getElementById(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
        });
    });

    shoeImage?.addEventListener("click",()=>{
        document.getElementById("products")?.scrollIntoView({behavior:"smooth"});
    });

    const products = [
        {id:1,name:"Velocity Runner",category:"running",price:2999,image:"../Assets/images/shoe.png",description:"Lightweight everyday running footwear."},
        {id:2,name:"Urban Street",category:"sneakers",price:3499,image:"../Assets/images/shoe2.png",description:"Clean streetwear style for everyday use."},
        {id:3,name:"Shadow Sport",category:"sports",price:4299,image:"../Assets/images/shoe3.png",description:"Sport-focused design with a bold look."},
        {id:4,name:"Classic Motion",category:"casual",price:3799,image:"../Assets/images/shoe4.png",description:"Minimal casual footwear with a premium feel."}
    ];

    const grid=document.getElementById("products-grid");
    const search=document.getElementById("product-search");
    let activeCategory="all";

    function renderProducts(){
        const q=(search?.value||"").trim().toLowerCase();
        const filtered=products.filter(p=>
            (activeCategory==="all"||p.category===activeCategory) &&
            (!q||p.name.toLowerCase().includes(q)||p.category.includes(q))
        );

        grid.innerHTML=filtered.length ? filtered.map(p=>`
            <article class="product-card">
                <img src="${p.image}" alt="${p.name}">
                <div class="category">${p.category}</div>
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
                <button class="view-product" type="button" data-product-id="${p.id}">View</button>
            </article>
        `).join("") : `<p style="color:#999">No products found.</p>`;
    }

    document.querySelectorAll(".filter-btn").forEach(btn=>{
        btn.addEventListener("click",()=>{
            document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory=btn.dataset.category;
            renderProducts();
        });
    });

    search?.addEventListener("input",renderProducts);
    document.getElementById("search-button")?.addEventListener("click",renderProducts);
    renderProducts();

    const overlay=document.getElementById("auth-overlay");
    const modal=document.querySelector(".auth-modal");
    const account=document.getElementById("account-btn");
    const close=document.getElementById("auth-close");
    const create=document.getElementById("create-account-btn");
    const back=document.getElementById("back-to-signin");

    function openAuth(){
        modal.classList.remove("signup-mode");
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden","false");
        document.body.style.overflow="hidden";
    }
    function closeAuth(){
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden","true");
        document.body.style.overflow="";
    }

    account?.addEventListener("click",openAuth);
    close?.addEventListener("click",closeAuth);
    overlay?.addEventListener("click",e=>{if(e.target===overlay)closeAuth()});
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAuth()});

    create?.addEventListener("click",()=>modal.classList.add("signup-mode"));
    back?.addEventListener("click",()=>modal.classList.remove("signup-mode"));

    document.getElementById("password-toggle")?.addEventListener("click",e=>{
        const input=document.getElementById("signin-password");
        input.type=input.type==="password"?"text":"password";
        e.currentTarget.textContent=input.type==="password"?"Show":"Hide";
    });

    document.getElementById("sign-in-form")?.addEventListener("submit",e=>{
        e.preventDefault();
        alert("Demo sign-in: backend authentication will be connected later.");
    });

    document.getElementById("sign-up-form")?.addEventListener("submit",e=>{
        e.preventDefault();
        alert("Demo account creation: backend/database will be connected later.");
    });
});
