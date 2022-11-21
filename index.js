
const table = document.querySelector(".checkers-field"); 
let focusEl={chip: 0}
let distantOfBitChip;


table.addEventListener("click", (e) =>{
    
    if(e.target.classList.contains('chip')) {
        focusOfChip(e.target)
    }


    if(e.target.classList.contains('move_option')){
        if(Math.abs(e.target.parentNode.rowIndex - focusEl.row) >= 2){
            // взависимости менять +-1
            // можно ввести переменную
            if(e.target.parentNode.rowIndex - focusEl.row > 0){
                if(e.target.cellIndex - focusEl.cell > 0 ){
                    table.rows[focusEl.row + 1].cells[focusEl.cell + 1].innerHTML = '' ;                 
                }else table.rows[focusEl.row + 1].cells[focusEl.cell - 1].innerHTML = '' ;
                
            }else 
                if(e.target.parentNode.rowIndex - focusEl.row < 0){
                    if(e.target.cellIndex - focusEl.cell > 0 ){
                        table.rows[focusEl.row - 1].cells[focusEl.cell + 1].innerHTML = '' ;
                    }else table.rows[focusEl.row - 1].cells[focusEl.cell - 1].innerHTML = '' ;
                    
                }
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

function focusOfChip(chip){

    if(!chip.classList.contains('chip_target')) {
        if (focusEl.chip != 0){
            unFocusOfChip();
        }

        chip.classList.add('chip_target');
        focusEl.chip = chip.id;
        focusEl.row = chip.parentNode.parentNode.rowIndex;
        focusEl.cell = chip.parentNode.cellIndex;
        focusEl.color = chip.classList.contains("chip_color_red") ? "red" : "white";
        focusEl.isDamka = chip.classList.contains("damka");
        
        //варианты хода
        addOptionMove(focusEl.color)
       
    }else{
        removeOptionMove(focusEl.color)
        chip.classList.remove('chip_target')    
    } 
        
}

function unFocusOfChip(){
    let unFocusEl = document.querySelector("#" + focusEl.chip);
    removeOptionMove();
    
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
                    if(!table.rows[focusEl.row +(deltRow*2) ].cells[focusEl.cell +(deltCell*2) ].childNodes.length)
                        
                    //проверка на не свою шашку за битой
                        table.rows[focusEl.row +(deltRow*2 )].cells[focusEl.cell +(deltCell*2 )].classList.add("move_option");
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
                        if(!table.rows[focusEl.row -(deltRow*2) ].cells[focusEl.cell +(deltCell*2) ].childNodes.length)
                            table.rows[focusEl.row -(deltRow*2 )].cells[focusEl.cell+ (deltCell*2 )].classList.add("move_option");
                }
            }   
        }

    if(focusEl.isDamka){
        let orederTo_upR = true, orederTo_upL = true, orederTo_dnR = true, orederTo_dnL = true;
        for(let i=1; i<8; i++){
            if (focusEl.row + i<9){//!table.rows[focusEl.row+i] !== undefined && !table.rows[focusEl.row+i].classList.contains("word")
                //(1;1)
                if(table.rows[focusEl.row +i ].cells[focusEl.cell +i] && orederTo_upR){
                    if(table.rows[focusEl.row +i ].cells[focusEl.cell +i].children[0] !== undefined){//край
                        if(!table.rows[focusEl.row +i ].cells[focusEl.cell +i ].children[0].classList.contains(`chip_color_${focusEl.color}`)){ // проверка на пустую ячейку
                            //проверка шашки на битость
                            if(table.rows[focusEl.row +(i+1)].cells[focusEl.cell+ (i+1)] !== undefined && 
                                !table.rows[focusEl.row +(i+1)].classList.contains("word")){
                            //проверка на границу поля и на пустату x2 клетки 
                                if(!table.rows[focusEl.row +(i+1)].cells[focusEl.cell +(i+1)].childNodes.length)
                                    
                                //проверка на не свою шашку за битой
                                    table.rows[focusEl.row +(i+1 )].cells[focusEl.cell +(i+1)].classList.add("move_option");
                            }
                        }else     orederTo_upR=false
                    }else table.rows[focusEl.row+i].cells[focusEl.cell+i].classList.add("move_option");
                }
                //(1;-1)
                if (table.rows[focusEl.row +i ].cells[focusEl.cell -i] && orederTo_upL) {    
                    if(table.rows[focusEl.row +i ].cells[focusEl.cell -i] && table.rows[focusEl.row +i ].cells[focusEl.cell -i ].children[0] !== undefined){// проверка на пустую ячейку
                        if(!table.rows[focusEl.row +i ].cells[focusEl.cell -i ].children[0].classList.contains(`chip_color_${focusEl.color}`)){ 
                            //проверка шашки на битость
                            if(table.rows[focusEl.row +(i+1 )].cells[focusEl.cell -(i+1)] !== undefined && 
                                !table.rows[focusEl.row +(i+1 )].classList.contains("word")){
                            //проверка на границу поля и на пустату x2 клетки 
                                if(!table.rows[focusEl.row +(i+1) ].cells[focusEl.cell -(i+1) ].childNodes.length)
                                    
                                //проверка на не свою шашку за битой
                                    table.rows[focusEl.row +(i+1 )].cells[focusEl.cell -(i+1 )].classList.add("move_option");
                            }
                        }   else orederTo_upL=false;
                    }else table.rows[focusEl.row+i].cells[focusEl.cell-i].classList.add("move_option");   
                }            
            }

            //(-1;1)
            if (focusEl.row-i>0 ){
                if(table.rows[focusEl.row -i].cells[focusEl.cell +i ]  && orederTo_dnR){
                    if(table.rows[focusEl.row -i].cells[focusEl.cell +i ].children[0] !== undefined){// проверка на пустую ячейку
                        if(!table.rows[focusEl.row -i ].cells[focusEl.cell +i ].children[0].classList.contains(`chip_color_${focusEl.color}`)){ 
                            //проверка шашки на битость
                            if(table.rows[focusEl.row -(i+1 )].cells[focusEl.cell +(i+1)] !== undefined && 
                                !table.rows[focusEl.row -(i+1 )].classList.contains("word")){
                            //проверка на границу поля и на пустату x2 клетки 
                                if(!table.rows[focusEl.row -(i+1) ].cells[focusEl.cell +(i+1) ].childNodes.length)
                                    
                                //проверка на не свою шашку за битой
                                    table.rows[focusEl.row -(i+1 )].cells[focusEl.cell +(i+1 )].classList.add("move_option");

                            }
                        }  else orederTo_dnR = false;
                    }else table.rows[focusEl.row-i].cells[focusEl.cell+i].classList.add("move_option");
                }
            
                //(-1;-1)
                if(table.rows[focusEl.row -i ].cells[focusEl.cell -i ]  && orederTo_dnL){
                    if(table.rows[focusEl.row -i ].cells[focusEl.cell -i ].children[0] !== undefined){// проверка на пустую ячейку
                        if(!table.rows[focusEl.row -i ].cells[focusEl.cell -i ].children[0].classList.contains(`chip_color_${focusEl.color}`)){ 
                            //проверка шашки на битость
                            if(table.rows[focusEl.row -(i+1)].cells[focusEl.cell -(i+1)] !== undefined && 
                                !table.rows[focusEl.row -(i+1 )].classList.contains("word")){
                            //проверка на границу поля и на пустату x2 клетки 
                                if(!table.rows[focusEl.row -(i+1) ].cells[focusEl.cell -(i+1) ].childNodes.length)
                                    
                                //проверка на не свою шашку за битой
                                    table.rows[focusEl.row -(i+1 )].cells[focusEl.cell -(i+1 )].classList.add("move_option");
                            }
                        }else orederTo_dnL= false;   
                    }else table.rows[focusEl.row-i].cells[focusEl.cell-i].classList.add("move_option");
                }
            }
        }
    }
}

function addOptionMove(color){
    
    if(color == 'red'){
        // if(!table.rows[focusEl.row+1].classList.contains("word")){
            if(focusEl.cell != 7) addClassOfOptionMove(1,1);
            if(focusEl.cell != 0) addClassOfOptionMove(1,-1);
            // }
    }

    if(color=="white"){
        // if(!table.rows[focusEl.row-1].classList.contains("word")){
            if(focusEl.cell != 7) addClassOfOptionMove(-1,1)
            if(focusEl.cell != 0) addClassOfOptionMove(-1,-1)
        // }
    }
    
    
    
}

function removeOptionMove(){
    document.querySelectorAll('.move_option').forEach((el)=>{
        el.classList.remove("move_option");
    })
}


function start(){
    // for (let x = 1; x <= table.rows.length-2; x++){
    //  add ID!!!
    //     if(x%2==0){
    //         for (let y = 0; y <= 7; y = y+2){
    //             table.rows[x].cells[y].innerHTML = '<div class= "chip"></div>';
    //             console.log();
    //         }
    //     }else 
    //         for (let y = 1; y <= 7; y = y+2){
    //             table.rows[x].cells[y].innerHTML = '<div class= "chip"></div>';
    //             console.log();
    //         }
    
    // }
}