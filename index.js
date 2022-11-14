
const table = document.querySelector(".checkers-field"); 
let focusEl={chip: 0}


table.addEventListener("click", (e) =>{
    
    if(e.target.classList.contains('chip')) {
        focusOfChip(e.target)
    }

    if(e.target.classList.contains('move_option')){
        let cellFocusedChip = table.rows[focusEl.row].cells[focusEl.cell];
        console.log(cellFocusedChip.children[0]);
        
        e.target.append(cellFocusedChip.children[0]);
        unFocusOfChip()

    }else{
        // if(focusEl.chip!=0)
        // unFocusOfChip(); 
        // console.log(e.target);
    }
    
   

})

// e.target.parentNode.rowIndex, e.target.parentNode.cellIndex

function focusOfChip(chip){

    if(!chip.classList.contains('chip_target')) {
        if (focusEl.chip != 0){
            unFocusOfChip();
        }

        chip.classList.add('chip_target');
        focusEl.chip = chip.id;
        focusEl.row = chip.parentNode.parentNode.rowIndex;
        focusEl.cell = chip.parentNode.cellIndex;
        
        //варианты хода
        
        if(chip.classList.contains("chip_color_red")){
            addOptionMove("red")
        }else addOptionMove("white")

    }else{
        if(chip.classList.contains("chip_color_red"))
            removeOptionMove("red")
        else removeOptionMove("white")

        chip.classList.remove('chip_target')    
    } 
        
}

function unFocusOfChip(){
    let unFocusEl = document.querySelector("#" + focusEl.chip);
    if(unFocusEl.classList.contains("chip_color_red")){
        removeOptionMove("red");
    }else removeOptionMove("white");
    
    unFocusEl.classList.remove('chip_target');
}

function addOptionMove(color){
    if(color == 'red'){
        if(focusEl.cell != 7)
            table.rows[focusEl.row+1].cells[focusEl.cell+1].classList.add("move_option")
        if(focusEl.cell != 0)
            table.rows[focusEl.row+1].cells[focusEl.cell-1].classList.add("move_option")
    }
    if(color=="white"){
        if(focusEl.cell != 7)
            table.rows[focusEl.row-1].cells[focusEl.cell+1].classList.add("move_option")
        if(focusEl.cell != 0)
            table.rows[focusEl.row-1].cells[focusEl.cell-1].classList.add("move_option")
    }
}

function removeOptionMove(color){
    if(color == "red"){
        if(focusEl.cell != 7)
            table.rows[focusEl.row+1].cells[focusEl.cell+1].classList.remove("move_option")
        if(focusEl.cell != 0)
            table.rows[focusEl.row+1].cells[focusEl.cell-1].classList.remove("move_option")
    }
    if(color=="white"){
        if(focusEl.cell != 7)
            table.rows[focusEl.row-1].cells[focusEl.cell+1].classList.remove("move_option")
        if(focusEl.cell != 0)
            table.rows[focusEl.row-1].cells[focusEl.cell-1].classList.remove("move_option")
    }
        
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