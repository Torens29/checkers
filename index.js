
const table = document.querySelector(".checkers-field"); 
let focusEl={
    chip: 'c0'
}


table.addEventListener("click", (e) =>{
    
    if(e.target.classList.contains('chip')) {
        focusOfChip(e.target)
    }

})

// e.target.parentNode.rowIndex, e.target.parentNode.cellIndex

function focusOfChip(chip){
    if(!chip.classList.contains('chip_target')) {

        document.querySelector("#" + focusEl.chip).classList.remove('chip_target')

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