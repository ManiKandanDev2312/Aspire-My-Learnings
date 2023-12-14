const favorite=document.getElementById('fav');
const vegetarian=document.getElementById('veg');
const heart=document.getElementById('heart');
const dish=document.getElementById('dish');
const dishName=document.getElementById('dishName');
const dishCost=document.getElementById('dishCost');
const dishTotal=document.getElementById('dishTotal');

const Table=document.getElementById('tab');  

function erase(){
    dish.value="";
}
     var arrayName=[];
     var i=0;
    //  var m=1;
function dishValue(x){
        right.style.display='none';
        rightCart.style.display='block';
        addRow(x);
     }
     var DishCost=0;
     function addRow(x){ 
        var hotel=x.value;
        var Array=hotel.split(","); 
        console.log(DishCost);
        var countbox=' <h5 id="count" style="cursor: text;color: green; margin-top:3px;font-size: 0.5cm;font-weight: bold;">1</h5>';
        if(arrayName.includes(Array[0])){
            alert("you already add this item to cart");
        }
        else{
             var tab=Table.insertRow();
            tab.onclick=(function row(){
                var ind=tab.rowIndex;
                  c4.onclick=(function inc(){
                var c=Table.rows[ind].cells;
                 var c1=c[2].innerText;
                 c[2].innerHTML=++c1;
                 DishCost=DishCost+(1*Math.round(Array[1]));
                 dishTotal.innerText="₹ "+DishCost;
                 });
                  c2.onclick=(function dec(){
                var c=Table.rows[ind].cells;
                 var c1=c[2].innerText;
                 c[2].innerHTML=--c1;
                 DishCost=DishCost-(1*Math.round(Array[1]));
                 dishTotal.innerText="₹ "+DishCost;
                 var val=c[2].innerHTML;
         if(val<=0){ 
             deleteRow(ind);
         }
                 });
            });
            var c1=tab.insertCell(0);
            var c2=tab.insertCell(1);
            var c3=tab.insertCell(2);
            var c4=tab.insertCell(3);
            var c5=tab.insertCell(4);
            c3.style="color:green;font-size:0.5cm;";
            c1.innerHTML=Array[0];
            c2.innerHTML= '<button id="dec" style="width: 30px; height: 30px;cursor: pointer;background-color: white;color: green;font-size:0.5cm; font-weight: bold;">--</button>';
            c3.innerHTML= 1;
            c4.innerHTML= '<button  id="dec" style="width: 30px; height: 30px;cursor: pointer;background-color: white;color: green;font-size:0.5cm; font-weight: bold;">+</button>';
            c5.innerHTML="₹ "+Array[1];
            DishCost=DishCost+parseInt(Array[1]);
            dishTotal.innerText="₹ "+DishCost;
            arrayName[i++]=Array[0];
                }
     }
     function deleteRow(z){
        var row=Table.rows.length;
        var tab=Table.deleteRow(z);
       Name=arrayName.splice(z,1);
        i--;
        console.log(row);
        if(row<=1){
                 right.style.display='block';
                 rightCart.style.display='none';
         }
         else{
             
             c[2].innerHTML=val;
         }
     }
     var count=1;
function veg(){
    
    if(check.checked==true){
        check.checked=false;
        vegetarian.classList.toggle("vegetarian");
    }else{
        check.checked=true;
        vegetarian.classList.toggle("vegetarian");
    }
    
}

function vege(){
    vegetarian.classList.toggle("vegetarian");
}

function fav(){
    
    heart.classList.toggle("hearted");
    favorite.classList.toggle("favorite");
    if(favorite.innerText=="Favorites"){
        favorite.innerText="Favorited";
    }
    else{
        favorite.innerText="Favorites"; 
    }

    
}
 export function add(){
  return  jee=Table;
}
// module.exports={add};