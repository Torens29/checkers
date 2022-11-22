function focusOfChip(chip){

    if(!chip.classList.contains('chip_target')) {
       
        if (focusEl.chip !== 0){
            unFocusOfChip();
        }

        chip.classList.add('chip_target');
        focusEl.chip = chip.id;
        focusEl.row = chip.parentNode.parentNode.rowIndex;
        focusEl.cell = chip.parentNode.cellIndex;
        focusEl.color = chip.classList.contains("chip_color_red") ? "red" : "white";
        focusEl.isDamka = chip.classList.contains("damka");
        focusEl.distantOfBeatChip= 0;

        focusEl.orederTo_upR= true;
        focusEl.orederTo_upL= true; 
        focusEl.orederTo_dnR= true; 
        focusEl.orederTo_dnL= true;
        
        //варианты хода
        addOptionMove(focusEl.color)
       
    }else{
        removeOptionMove('all')
        chip.classList.remove('chip_target')    
        unFocusOfChip()
    } 
        
}

function unFocusOfChip(){
    let unFocusEl = document.querySelector("#" + focusEl.chip);
    removeOptionMove("all");
    
    unFocusEl.classList.remove('chip_target');
}

function addClassOfOptionMove(deltRow, deltCell){
    if (!table.rows[focusEl.row+deltRow].classList.contains("word"))
        if(table.rows[focusEl.row +deltRow ].cells[focusEl.cell +deltCell ].children[0] !== undefined){// проверка на пустую ячейку
            if(!table.rows[focusEl.row +deltRow ].cells[focusEl.cell +deltCell ].children[0].classList.contains(`chip_color_${focusEl.color}`)){ 
                //проверка шашки на битость
                if(table.rows[focusEl.row +(deltRow*2 )].cells[focusEl.cell+ (deltCell*2)] !== undefined && 
                    !table.rows[focusEl.row +(deltRow*2 )].classList.contains("word")){
                //проверка на границу поля и на пустату x2 клетки 
                    if(!table.rows[focusEl.row +(deltRow*2) ].cells[focusEl.cell +(deltCell*2)].childNodes.length){
                        //проверка на не свою шашку за битой
                        table.rows[focusEl.row +(deltRow*2 )].cells[focusEl.cell +(deltCell*2 )].classList.add("move_option_beat");
                        focusEl.distantOfBeatChip=1;
                    }
                }
            }   
        }else table.rows[focusEl.row+deltRow].cells[focusEl.cell+deltCell].classList.add("move_option");

    // бить назад
    if (!table.rows[focusEl.row+deltRow].classList.contains("word"))
        if(table.rows[focusEl.row -deltRow ].cells[focusEl.cell +deltCell] !== undefined && 
                table.rows[focusEl.row -deltRow ].cells[focusEl.cell +deltCell ].children[0] !== undefined){
            if(!table.rows[focusEl.row -deltRow ].cells[focusEl.cell +deltCell ].children[0].classList.contains(`chip_color_${focusEl.color}`)){
                if(table.rows[focusEl.row -(deltRow*2 )].cells[focusEl.cell +(deltCell*2 )] !== undefined &&
                    !table.rows[focusEl.row -(deltRow*2 )].classList.contains("word")){
                        if(!table.rows[focusEl.row -(deltRow*2) ].cells[focusEl.cell +(deltCell*2) ].childNodes.length){
                            table.rows[focusEl.row -(deltRow*2 )].cells[focusEl.cell+ (deltCell*2 )].classList.add("move_option_beat");
                            focusEl.distantOfBeatChip = 1;
                        }
                            
                }
            }   
        }

    if(focusEl.isDamka){
        for(let i=1; i<8; i++){
            if (focusEl.row + i<9){
                //(1;1)
                focusEl.orederTo_upR = addOptionForDamka(i, i, focusEl.orederTo_upR);
                //(1;-1)
                focusEl.orederTo_upL = addOptionForDamka(i,-i, focusEl.orederTo_upL)
            }
            if (focusEl.row-i>0 ){
                //(-1;1)
                focusEl.orederTo_dnR = addOptionForDamka(-i, i, focusEl.orederTo_dnR);
                //(-1;-1)
                focusEl.orederTo_dnL = addOptionForDamka(-i,-i, focusEl.orederTo_dnL)
            }
        }
    }
}

function addOptionForDamka(deltRow, deltCell, orederTo){
    let i=1;
    if(table.rows[focusEl.row +deltRow ].cells[focusEl.cell +deltCell] && orederTo){
        if(table.rows[focusEl.row +deltRow ].cells[focusEl.cell +deltCell].children[0] !== undefined){
        // проверка на пустую ячейку
            if(!table.rows[focusEl.row +deltRow ].cells[focusEl.cell +deltCell ].children[0].classList.contains(`chip_color_${focusEl.color}`)){ 
            //проверка шашки на битость
                while(table.rows[focusEl.row +Math.sign(deltRow)*(Math.abs(deltRow)+i)].cells[focusEl.cell +Math.sign(deltCell)*(Math.abs(deltCell)+i)] !== undefined && 
                !table.rows[focusEl.row + Math.sign(deltRow)*(Math.abs(deltRow)+i)].classList.contains("word")){
                // if(table.rows[focusEl.row +Math.sign(deltRow)*(Math.abs(deltRow)+1)].cells[focusEl.cell +Math.sign(deltCell)*(Math.abs(deltCell)+1)] !== undefined && 
                    // !table.rows[focusEl.row + Math.sign(deltRow)*(Math.abs(deltRow)+1)].classList.contains("word")){

                //проверка на границу поля и на пустату x2 клетки 
                    if(!table.rows[focusEl.row + Math.sign(deltRow)*(Math.abs(deltRow) +i)].cells[focusEl.cell +Math.sign(deltCell)*(Math.abs(deltCell)+i)].childNodes.length){
                        //проверка на не свою шашку за битой
                        table.rows[focusEl.row +Math.sign(deltRow)*(Math.abs(deltRow)+i )]
                        .cells[focusEl.cell +Math.sign(deltCell)*(Math.abs(deltCell)+i)].classList.add("move_option_beat");
// Добовлять пока не будет шашка или край
                        focusEl.distantOfBeatChip = Math.abs(deltCell);
                    }
                    i++;
                }
            }else  return false;
        }else {
            table.rows[focusEl.row+deltRow].cells[focusEl.cell+deltCell].classList.add("move_option");
            return true
        }
    }
}

function addOptionMove(color){
    
    if(color == 'red'){
            if(focusEl.cell != 7) addClassOfOptionMove(1,1);
            if(focusEl.cell != 0) addClassOfOptionMove(1,-1);
    }

    if(color=="white"){
            if(focusEl.cell != 7) addClassOfOptionMove(-1,1)
            if(focusEl.cell != 0) addClassOfOptionMove(-1,-1)
    }
    
    console.log(document.querySelectorAll('.move_option_beat').length);
    if(document.querySelectorAll('.move_option_beat').length){
        removeOptionMove('');
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
    table.rows[focusEl.row + (focusEl.distantOfBeatChip* Math.sign(cellClick.parentNode.rowIndex - focusEl.row))]
        .cells[focusEl.cell + (focusEl.distantOfBeatChip * Math.sign(cellClick.cellIndex - focusEl.cell))].innerHTML = '' ;

    focusEl.distantOfBeatChip=0;
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


const table = document.querySelector(".checkers-field"); 
let focusEl={chip: 0,
            orederTo_upR: true,
            orederTo_upL: true, 
            orederTo_dnR: true, 
            orederTo_dnL: true
            }

    start()

table.addEventListener("click", (e) =>{
    
    if(e.target.classList.contains('chip')) {
        focusOfChip(e.target)
        console.log(focusEl.chip);
    }


    if(e.target.classList.contains('move_option') || e.target.classList.contains('move_option_beat')){
        
        if(focusEl.distantOfBeatChip>0){
           beatOfChip(e.target)
        }
        
        //дамка
        if(table.rows[focusEl.row].cells[focusEl.cell].children[0].classList.contains("chip_color_red") 
            && e.target.parentNode.rowIndex == 8){
                table.rows[focusEl.row].cells[focusEl.cell].children[0].classList.add('damka');
            }
        else if(table.rows[focusEl.row].cells[focusEl.cell].children[0].classList.contains("chip_color_white") 
            && e.target.parentNode.rowIndex == 1){
                table.rows[focusEl.row].cells[focusEl.cell].children[0].classList.add('damka');
            }
        
        e.target.append(table.rows[focusEl.row].cells[focusEl.cell].children[0]);
        unFocusOfChip();

    }else{
        // if(focusEl.chip!=0)
        // unFocusOfChip(); 
        // console.log(e.target);
    }
})


// e.target.parentNode.rowIndex, e.target.cellIndex