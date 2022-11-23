function focusOfChip(chip){

    if(!chip.classList.contains('chip_target')) {
       
        if (focusChip.id !== 0){
            unFocusOfChip();
        }

        chip.classList.add('chip_target');
        focusChip.id = chip.id;
        focusChip.row = chip.parentNode.parentNode.rowIndex;
        focusChip.cell = chip.parentNode.cellIndex;
        focusChip.color = chip.classList.contains("chip_color_red") ? "red" : "white";
        focusChip.isDamka = chip.classList.contains("damka");
        focusChip.distantOfBeatChip= 0;

        focusChip.orederTo_upR= true;
        focusChip.orederTo_upL= true; 
        focusChip.orederTo_dnR= true; 
        focusChip.orederTo_dnL= true;
        
        //варианты хода
        addOptionMove(focusChip.color)
       
    }else{
        removeOptionMove('all')
        chip.classList.remove('chip_target')    
        unFocusOfChip()
    } 
}

function unFocusOfChip(){
    if(focusChip.id != 0){
        document.querySelector("#" + focusChip.id).classList.remove('chip_target');
        removeOptionMove("all");
    }
    
}

function addClassOfOptionMove(deltRow, deltCell){
    if (!table.rows[focusChip.row+deltRow].classList.contains("word"))
        if(table.rows[focusChip.row +deltRow ].cells[focusChip.cell +deltCell ].children[0] !== undefined){// проверка на пустую ячейку
            if(!table.rows[focusChip.row +deltRow ].cells[focusChip.cell +deltCell ].children[0].classList.contains(`chip_color_${focusChip.color}`)){ 
                //проверка шашки на битость
                if(table.rows[focusChip.row +(deltRow*2 )].cells[focusChip.cell+ (deltCell*2)] !== undefined && 
                    !table.rows[focusChip.row +(deltRow*2 )].classList.contains("word")){
                //проверка на границу поля и на пустату x2 клетки 
                    if(!table.rows[focusChip.row +(deltRow*2) ].cells[focusChip.cell +(deltCell*2)].childNodes.length){
                        //проверка на не свою шашку за битой
                        table.rows[focusChip.row +(deltRow*2 )].cells[focusChip.cell +(deltCell*2 )].classList.add("move_option_beat");
                        focusChip.distantOfBeatChip=1;
                    }
                }
            }   
        }else table.rows[focusChip.row+deltRow].cells[focusChip.cell+deltCell].classList.add("move_option");

    // бить назад
    if (!table.rows[focusChip.row+deltRow].classList.contains("word"))
        if(table.rows[focusChip.row -deltRow ].cells[focusChip.cell +deltCell] !== undefined && 
                table.rows[focusChip.row -deltRow ].cells[focusChip.cell +deltCell ].children[0] !== undefined){
            if(!table.rows[focusChip.row -deltRow ].cells[focusChip.cell +deltCell ].children[0].classList.contains(`chip_color_${focusChip.color}`)){
                if(table.rows[focusChip.row -(deltRow*2 )].cells[focusChip.cell +(deltCell*2 )] !== undefined &&
                    !table.rows[focusChip.row -(deltRow*2 )].classList.contains("word")){
                        if(!table.rows[focusChip.row -(deltRow*2) ].cells[focusChip.cell +(deltCell*2) ].childNodes.length){
                            table.rows[focusChip.row -(deltRow*2 )].cells[focusChip.cell+ (deltCell*2 )].classList.add("move_option_beat");
                            focusChip.distantOfBeatChip = 1;
                        }
                            
                }
            }   
        }

    if(focusChip.isDamka){
        for(let i=1; i<8; i++){
            if (focusChip.row + i<9){
                //(1;1)
                focusChip.orederTo_upR = addOptionForDamka(i, i, focusChip.orederTo_upR);
                //(1;-1)
                focusChip.orederTo_upL = addOptionForDamka(i,-i, focusChip.orederTo_upL)
            }
            if (focusChip.row-i>0 ){
                //(-1;1)
                focusChip.orederTo_dnR = addOptionForDamka(-i, i, focusChip.orederTo_dnR);
                //(-1;-1)
                focusChip.orederTo_dnL = addOptionForDamka(-i,-i, focusChip.orederTo_dnL)
            }
        }
    }
}

function addOptionForDamka(deltRow, deltCell, orederTo){
    let i=1;
    if(table.rows[focusChip.row +deltRow ].cells[focusChip.cell +deltCell] && orederTo){
        if(table.rows[focusChip.row +deltRow ].cells[focusChip.cell +deltCell].children[0] !== undefined){
        // проверка на пустую ячейку
            if(!table.rows[focusChip.row +deltRow ].cells[focusChip.cell +deltCell ].children[0].classList.contains(`chip_color_${focusChip.color}`)){ 
            //проверка шашки на битость
                while(table.rows[focusChip.row +Math.sign(deltRow)*(Math.abs(deltRow)+i)].cells[focusChip.cell +Math.sign(deltCell)*(Math.abs(deltCell)+i)] !== undefined && 
                !table.rows[focusChip.row + Math.sign(deltRow)*(Math.abs(deltRow)+i)].classList.contains("word")){
                //проверка на границу поля и на пустату x2 клетки 
                    if(!table.rows[focusChip.row + Math.sign(deltRow)*(Math.abs(deltRow) +i)].cells[focusChip.cell +Math.sign(deltCell)*(Math.abs(deltCell)+i)].childNodes.length){
                        //проверка на не свою шашку за битой
                        table.rows[focusChip.row +Math.sign(deltRow)*(Math.abs(deltRow)+i )]
                        .cells[focusChip.cell +Math.sign(deltCell)*(Math.abs(deltCell)+i)].classList.add("move_option_beat");
// Добовлять пока не будет шашка или край
                        focusChip.distantOfBeatChip = Math.abs(deltCell);
                    }else break;
                    i++;
                }
            }else  return false;
        }else {
            table.rows[focusChip.row+deltRow].cells[focusChip.cell+deltCell].classList.add("move_option");
            return true
        }
    }
}

function addOptionMove(color){
    
    if(color == 'red'){
            if(focusChip.cell != 7) addClassOfOptionMove(1,1);
            if(focusChip.cell != 0) addClassOfOptionMove(1,-1);
    }

    if(color=="white"){
            if(focusChip.cell != 7) addClassOfOptionMove(-1,1)
            if(focusChip.cell != 0) addClassOfOptionMove(-1,-1)
    }
    
    if(document.querySelectorAll('.move_option_beat').length){
        removeOptionMove('');
        chipsIDMustBeat.push(focusChip.id);
    }
    
}

function removeOptionMove(all){
    document.querySelectorAll('.move_option').forEach((el)=>{
        el.classList.remove("move_option");
    })
    if(all == 'all')
    document.querySelectorAll('.move_option_beat').forEach((el)=>{
        el.classList.remove("move_option_beat");
    })
}

function beatOfChip(cellClick){
    table.rows[focusChip.row + (focusChip.distantOfBeatChip* Math.sign(cellClick.parentNode.rowIndex - focusChip.row))]
        .cells[focusChip.cell + (focusChip.distantOfBeatChip * Math.sign(cellClick.cellIndex - focusChip.cell))].innerHTML = '' ;

    focusChip.distantOfBeatChip=0;

    unFocusOfChip()

}

function start(){
    for (let x = 1; x <= 8; x++){
        if(x%2==0){
            for (let y = 0; y <= 7; y = y+2){
                if (x<=3) table.rows[x].cells[y].innerHTML = `<div class= "chip chip_color_red" id="r${x}x${y}"></div>`;
                if(x>5) table.rows[x].cells[y].innerHTML = `<div class= "chip chip_color_white" id="w${x}x${y}"></div>` ;
            }
        }else if(x%2==1){
            for (let y = 1; y <= 7; y = y+2){
                if(x<=3) table.rows[x].cells[y].innerHTML = `<div class= "chip chip_color_red" id="r${x}x${y}"></div>`;
                if(x>5) table.rows[x].cells[y].innerHTML = `<div class= "chip chip_color_white" id="w${x}x${y}"></div>`;
            }
        }
    
    }
}

function checkOfDamka(el){

    if(table.rows[focusChip.row].cells[focusChip.cell].children[0].classList.contains("chip_color_red") 
                && el.parentNode.rowIndex == 8){
                    table.rows[focusChip.row].cells[focusChip.cell].children[0].classList.add('damka');
                }
    else if(table.rows[focusChip.row].cells[focusChip.cell].children[0].classList.contains("chip_color_white") 
        && el.parentNode.rowIndex == 1){
            table.rows[focusChip.row].cells[focusChip.cell].children[0].classList.add('damka');
        }
}

function checkingTheBetness(){

    Array.from(document.querySelectorAll("."+stepOfColorChip)).map(item => {
                
       focusOfChip(item)
        
    })
    unFocusOfChip()
    if(chipsIDMustBeat.length){
        chipsIDMustBeat.forEach(id => {
            console.log(chipsIDMustBeat);
            document.querySelector("#"+id).classList.add('chip_must_beat');
        })
    }
}

function checkClickOnBeatsChip(el){
    if(document.querySelectorAll('.chip_must_beat').length != 0){
        console.log("sd",el.target.classList.contains(".chip_must_beat"));
        if(el.target.classList.contains("chip_must_beat") || el.target.classList.contains("move_option_beat")){
            return true;
        } return false;
    }return true;
        
   
}

const table = document.querySelector(".checkers-field"); 
let stepOfColorChip= "chip_color_white";
let wasBeat = false;
let chipsIDMustBeat = new Array();
let focusChip={id: 0,
            orederTo_upR: true,
            orederTo_upL: true, 
            orederTo_dnR: true, 
            orederTo_dnL: true
            }

start();
// checkingTheBetness();

table.addEventListener("click", (e) =>{
    console.log(checkClickOnBeatsChip(e));
    if(checkClickOnBeatsChip(e)){
        if(e.target.classList.contains('move_option_beat')){
            checkOfDamka(e.target);
            e.target.append(table.rows[focusChip.row].cells[focusChip.cell].children[0]);

            beatOfChip(e.target);
            focusOfChip(e.target.children[0]);

            // console.log("len",document.querySelectorAll(".move_option_beat").length);
            if(document.querySelectorAll(".move_option_beat").length === 0){

                Array.from(document.querySelectorAll('.chip_must_beat')).forEach(item => item.classList.remove('chip_must_beat'));
                unFocusOfChip()
                stepOfColorChip = (stepOfColorChip == "chip_color_white") ? "chip_color_red" : "chip_color_white";
                chipsIDMustBeat = new Array();

                checkingTheBetness();
                
            }
            
        }else{
            if(e.target.classList.contains('chip')) {
                if(e.target.classList.contains(stepOfColorChip))
                    focusOfChip(e.target)
            }

            if(e.target.classList.contains('move_option')){
                e.target.append(table.rows[focusChip.row].cells[focusChip.cell].children[0]);
                stepOfColorChip = (stepOfColorChip == "chip_color_white") ? "chip_color_red" : "chip_color_white";
                checkingTheBetness();
                checkOfDamka(e.target);
                unFocusOfChip();
                
            }
        }
    }
})


// e.target.parentNode.rowIndex, e.target.cellIndex