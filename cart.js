//products table
let products = 
[
  {
    "name": "Pink Jacket",
    "tag": "jacket0"
  },
  {
    "name": "Colored Jacket",
    "tag": "jaccket2"
  },
  {
    "name": "Brown Jacket",
    "tag": "jacket1"
  },
  {
    "name": "Leather Jacket",
    "tag": "jacket3"
  },
  {
    "name": "Jean Jacket",
    "tag": "jacket4"
  },
  {
    "name": "Colored Jacket",
    "tag": "jacket5"
  },
  {
    "name": "Sweatshirts",
    "tag": "pull0"
  },
  {
    "name": "Pink Sweatshirts",
    "tag": "pull1"
  },
  {
    "name": "Winter Sweatshirts",
    "tag": "pull2"
  },
  {
    "name": "Blue Sweatshirts",
    "tag": "pull4"
  },
  {
    "name": "sweatshirts",
    "tag": "pull5"
  },
  {
    "name": "Light Sweatshirts",
    "tag": "pull6"
  },
  {
    "name": "Autumn Sweatshirts",
    "tag": "pull7"
  },
  {
    "name": "Nike Sweatshirt",
    "tag": "pull8"
  },
  {
    "name": "Heart Sweatshirt",
    "tag": "pull3"
  },
  {
    "name": "OUTFIT1",
    "tag": "outfit4"
  },
  {
    "name": "OUTFIT2",
    "tag": "#016"
  },
  {
    "name": "Denim Jeans",
    "tag": "pants0"
  },
  {
    "name": "Tile Pants",
    "tag": "pants1"
  },
  {
    "name": "Black Casual Pants",
    "tag": "pants2"
  },
  {
    "name": "Tile Skirt",
    "tag": "skirt0"
  },
  {
    "name": "Tile Skirts",
    "tag": "skirt1"
  },
  {
    "name": "Tile skirt",
    "tag": "skirt2"
  },
  {
    "name": "Leather Skirts",
    "tag": "skirts1"
  },
  {
    "name": "Denim Jeans",
    "tag": "pants3"
  },
  {
    "name": "Wide Jeans",
    "tag": "pants4"
  },
  {
    "name": "Ripped Shorts",
    "tag": "pants5"
  },
  {
    "name": "Skirts",
    "tag": "jupes0"
  },
  {
    "name": "skirts",
    "tag": "jupes"
  },
  {
    "name": "OUTFIT3",
    "tag": "outfit3"
  },
  {
    "name": "Sun Glasses",
    "tag": "acc0"
  },
  {
    "name": "Bracelets",
    "tag": "acc1"
  },
  {
    "name": "Glasses, matching purse",
    "tag": "acc2"
  },
  {
    "name": "set of 4 rings",
    "tag": "acc3"
  },
  {
    "name": "Blue purse",
    "tag": "acc4"
  },
  {
    "name": "Blue Butterfly EARINGS",
    "tag": "acc5"
  },
  {
    "name": "Vintage Glasses",
    "tag": "acc10"
  },
  {
    "name": "Hair accessories",
    "tag": "acc7"
  },
  {
    "name": "PURRR-SES",
    "tag": "acc8"
  },
  {
    "name": "Sun GLASS-ES",
    "tag": "acc9"
  },
  {
    "name": "Hair ACCESSORIES",
    "tag": "acc12"
  },
  {
    "name": "Necklace",
    "tag": "#041"
  },
  {
    "name": "Black boots",
    "tag": "acc11"
  },
  {
    "name": "Black Boots",
    "tag": "shoe0"
  },
  {
    "name": "Brown Boots",
    "tag": "shoe2"
  },
  {
    "name": "Blue Boots",
    "tag": "shoe3"
  },
  {
    "name": "Black Shoes",
    "tag": "shoe4"
  },
  {
    "name": "Shoes",
    "tag": "shoe5"
  },
  {
    "name": "Colored Shoes",
    "tag": "shoe6"
  },
  {
    "name": "shoes",
    "tag": "shoe7"
  },
  {
    "name": "High Heels",
    "tag": "shoe8"
  },
  {
    "name": "Heels",
    "tag": "shoe9"
  },
  {
    "name": "BLACK Heels",
    "tag": "shoe10"
  },
  {
    "name": "BLACK boots",
    "tag": "shoe1"
  }
];

const CART = {
    KEY: 'cart',
    contents: [],
    init() {
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } else {
            CART.contents = [];
            CART.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(tag) {
        //find an item in the cart by it's id
        let match = CART.contents.filter(item => {
            if (item.tag == tag)
                return true;
        });
        if (match && match[0])
            return match[0];

        else
            return false;
    },
    total_qty() {
        let sum = 0;
        CART.contents.forEach(item => {
            sum += item.qty;
        });

        return sum;
    },
    total_price() {
        let sum = 0;
        CART.contents.forEach(item => {
            sum += item.qty * item.prix;
        });

        return sum.toFixed(2);
    },
    get_qty(id) {
        //find an item and return its qty
        return CART.find(id).qty;
    },
    add(nom, img, prix) {

        //get product tag by name
        var product = $.grep(products, function(obj){return obj.name === nom;})[0];
        var tag = product["tag"];
        /* console.log(tag); */
        
        //get product tag from tableau
        CART.init();
        //add a new item to the cart
        //check that it is not in the cart already
        if (CART.find(tag)) {
                CART.increase(tag, 1);
                return true;
            }
        else {
            let obj = {
                tag: tag,
                nom: nom,
                img: img,
                qty: 1,
                prix: prix
            };
            CART.contents.push(obj);
            //update localStorage
            CART.sync();
            return true;
        }
    },
    increase(tag, qty = 1) {
        //increase the quantity of an item in the cart
        CART.contents = CART.contents.map(item => {
            if (item.tag == tag)
                item.qty += qty;
            return item;
        });
        //update localStorage
        CART.sync()
    },
    reduce(tag, qty = 1) {
        //reduce the quantity of an item in the cart
        CART.contents = CART.contents.map(item => {
            if (item.tag == tag)
                item.qty -= qty;
            return item;
        });
        //update localStorage
        CART.sync()
    },
    remove(tag) {
        //remove an item entirely from CART.contents based on its id
        CART.contents = CART.contents.filter(item => {
            if (item.tag !== tag)
                return true;
        });
        //update localStorage
        CART.sync()
    },
    empty() {
        //empty whole cart
        CART.contents = [];
        //update localStorage
        CART.sync()
    },
    displayProds() {
        let data = CART.contents;
        let list = "";

        //cart is empty
        if (data.length == 0) {
          $('.shopping-cart').empty();
          $('.shopping-cart').append('<div class="title">Empty cart!</div>');
        } else {
            data.forEach(i => {
                let element = item(i.nom, i.img, i.prix, i.qty, i.tag);
                list += element;
            })

            list += '<div class="total_bottom">Total : <span id="total">'+CART.total_price()+'</span> DT <div style="padding-top:10px;"><button id="checkout">Checkout</button></div></div>';
            $(".shopping-cart").append(list);
        }
    },
    logContents(prefix) {
        console.log(prefix, CART.contents)
    },
};

function item(nom, img, price, qty, tag) { 
return "<div class='item'><span class='tag' style='display:none'>"+tag+"</span><div class='buttons'><span class='delete-btn'></span><span class='like-btn'></span></div><div class='image'><img src='"+img+"' alt='' height='80' /></div><div class='description'><span>"+nom+"</span></div><div class='quantity'><button class='plus-btn' type='button' name='button'><img src='img/plus.svg' alt='' /></button><input type='text' value='"+qty+"' disabled><button class='minus-btn' type='button' name='button'><img src='img/minus.svg' alt='' /></button></div><div class='total-price'>"+price+" DT</div></div>";
}

