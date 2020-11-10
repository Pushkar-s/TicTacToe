    var player = 'x', opponent = 'o'; 
    var bestMoverow = -1,bestMovecol = -1; 
    var board = [['x','o','x'],['o','o','x'],['_','_','_']];
    function isMovesLeft() 
    { 
        for (var i = 0; i<3; i++) 
            for (var j = 0; j<3; j++) 
                if (board[i][j]=='_') 
                    return true; 
        return false; 
    } 

    function eval() {
        var gameover = false;
        for (var row = 0; row < 3; row ++) {
            var ch = board[row][0],flag = true;
            if (ch == '_') break;
            for (var col = 0; col < 3; col ++) {
                if (board[row][col] != ch) flag = false;
            }
            gameover |= flag;
        }

        for (var col = 0; col < 3; col ++) {
            var ch = board[0][col],flag = true;
            if (ch == '_') break;
            for (var row = 0; row < 3; row ++) {
                if (board[row][col] != ch) flag = false;
            }
            gameover |= flag;
        }

        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '_') gameover |= true;
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '_') gameover |= true;

        // if (gameover) alert("holy shit game over");
        return gameover;
    }

    function evaluate() 
    { 
        
        for (var row = 0; row<3; row++) 
        { 
            if (board[row][0]==board[row][1] && 
                board[row][1]==board[row][2] && board[row][2] != '_')
            { 
                if (board[row][0]==player) 
                    return +10; 
                else if (board[row][0]==opponent) 
                    return -10; 
            } 
        } 
        for (var col = 0; col<3; col++) 
        { 
            if (board[0][col]==board[1][col] && 
                board[1][col]==board[2][col] && board[2][col] != '_') 
            { 
                if (board[0][col]==player) 
                    return +10; 
                else if (board[0][col]==opponent) 
                    return -10; 
            } 
        } 

        if (board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[2][2] != '_') 
        { 
            if (board[0][0]==player) 
                return +10; 
            else if (board[0][0]==opponent) 
                return -10; 
        } 

        if (board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[2][0] != '_') 
        { 
            if (board[0][2]==player) 
                return +10; 
            else if (board[0][2]==opponent) 
                return -10; 
        } 
        return 0; 
    } 

    function minimax( depth,isMax) 
    { 
        var score = evaluate(); 
        if (score == 10) 
            return score; 
        if (score == -10) 
            return score; 
        if (isMovesLeft()==false) 
            return 0; 
        if (isMax) 
        { 
            var best = -1000; 
            for (var i = 0; i<3; i++) 
            { 
                for (var j = 0; j<3; j++) 
                { 
                    if (board[i][j]=='_') 
                    { 
                        board[i][j] = player; 
                        best = Math.max( best, 
                            minimax(depth+1, !isMax) ); 
                        board[i][j] = '_'; 
                    } 
                } 
            } 
            return best; 
        } 
        else
        { 
            var best = 1000; 
            for (var i = 0; i<3; i++) 
            { 
                for (var j = 0; j<3; j++) 
                { 
                    if (board[i][j]=='_') 
                    { 
                        board[i][j] = opponent; 
                        best = Math.min(best, 
                            minimax(depth+1, !isMax)); 

                        board[i][j] = '_'; 
                    } 
                } 
            } 
            return best; 
        } 
    } 

    function findBestMove() 
    { 
        var bestVal = -1000; 
        bestMoverow = -1; 
        bestMovecol = -1; 

        for (var i = 0; i<3; i++) 
        { 
            for (var j = 0; j<3; j++) 
            { 
                if (board[i][j]=='_') 
                { 
                    board[i][j] = player; 
                    var moveVal = minimax(0, false); 
                    board[i][j] = '_'; 
                    if (moveVal > bestVal) 
                    { 
                        bestMoverow = i; 
                        bestMovecol = j; 
                        bestVal = moveVal; 
                    } 
                } 
            } 
        } 

    } 

    // Driver code 
    function tellmove() 
    { 
        
        // board = [ 
        //     ['_','_','_'],
        //     ['_','_','_'],
        //     ['_','_','_']
        // ];

        var ans = findBestMove(); 
        // alert(bestMovecol);
        // alert(bestMoverow);
        return 0; 
    } 

    // tellmove();

    var rst = document.getElementById("newGame");
    var crs = document.getElementsByClassName('cros'); // array
    var blucircl = document.getElementsByClassName('bluecircle');
    var mtgrd = document.getElementsByClassName('matrixgrid');
    
    rst.onclick = function() {
        for (var i=0; i<9; i++) {
            // reset all blocks
            crs[2*i].style.visibility = "hidden";
            crs[2*i + 1].style.visibility = "hidden";
            blucircl[i].style.visibility = "hidden";
        }
        board = [ 
            ['_','_','_'],
            ['_','_','_'],
            ['_','_','_']
        ];
    }

    var idx;

    mtgrd[0].onclick = function() {
        if (blucircl[0].style.visibility == "visible" || crs[2*0].style.visibility == "visible") return;
            blucircl[0].style.visibility = "visible";
            board[0][0] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
    mtgrd[1].onclick = function() {
        if (blucircl[1].style.visibility == "visible" || crs[2*1].style.visibility == "visible") return;
            blucircl[1].style.visibility = "visible";
            board[0][1] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
    mtgrd[2].onclick = function() {
        if (blucircl[2].style.visibility == "visible" || crs[2*2].style.visibility == "visible") return;
            blucircl[2].style.visibility = "visible";
            board[0][2] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }


    mtgrd[4].onclick = function() {
        if (blucircl[3].style.visibility == "visible" || crs[2*3].style.visibility == "visible") return;
            blucircl[3].style.visibility = "visible";
            board[1][0] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
    mtgrd[5].onclick = function() {
        if (blucircl[4].style.visibility == "visible" || crs[2*4].style.visibility == "visible") return;
            blucircl[4].style.visibility = "visible";
            board[1][1] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
    mtgrd[6].onclick = function() {
        if (blucircl[5].style.visibility == "visible" || crs[2*5].style.visibility == "visible") return;
            blucircl[5].style.visibility = "visible";
            board[1][2] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }


    mtgrd[8].onclick = function() {
        if (blucircl[6].style.visibility == "visible" || crs[2*6].style.visibility == "visible") return;
            blucircl[6].style.visibility = "visible";
            board[2][0] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
    mtgrd[9].onclick = function() {
        if (blucircl[7].style.visibility == "visible" || crs[2*7].style.visibility == "visible") return;
            blucircl[7].style.visibility = "visible";
            board[2][1] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
    mtgrd[10].onclick = function() {
        if (blucircl[8].style.visibility == "visible" || crs[2*8].style.visibility == "visible") return;
            blucircl[8].style.visibility = "visible";
            board[2][2] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval()) alert("holy shit game over- band baja di 🤣😎");
    }
