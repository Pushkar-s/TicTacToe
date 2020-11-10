
    

    var player = 'x', opponent = 'o'; 
    var bestMoverow = -1,bestMovecol = -1; 
    // This function returns true if there are moves 
    // remaining on the board. It returns false if 
    // there are no moves left to play. 
    var board = [['x','o','x'],['o','o','x'],['_','_','_']];
    function isMovesLeft() 
    { 
        for (var i = 0; i<3; i++) 
            for (var j = 0; j<3; j++) 
                if (board[i][j]=='_') 
                    return true; 
        return false; 
    } 

    function evaluate() 
    { 
        // Checking for Rows for X or O victory. 
        
        for (var row = 0; row<3; row++) 
        { 
            if (board[row][0]==board[row][1] && 
                board[row][1]==board[row][2] && board[row][2] != '_')
            { 
                // alert("holy shit game over");
                if (board[row][0]==player) 
                    return +10; 
                else if (board[row][0]==opponent) 
                    return -10; 
            } 
        } 

        // Checking for Columns for X or O victory. 
        for (var col = 0; col<3; col++) 
        { 
            if (board[0][col]==board[1][col] && 
                board[1][col]==board[2][col] && board[2][col] != '_') 
            { 
                // alert("holy shit game over");
                if (board[0][col]==player) 
                    return +10; 

                else if (board[0][col]==opponent) 
                    return -10; 
            } 
        } 

        // Checking for Diagonals for X or O victory. 
        if (board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[2][2] != '_') 
        { 
            // alert("holy shit game over");
            if (board[0][0]==player) 
                return +10; 
            else if (board[0][0]==opponent) 
                return -10; 
        } 

        if (board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[2][0] != '_') 
        { 
            // alert("holy shit game over");
            if (board[0][2]==player) 
                return +10; 
            else if (board[0][2]==opponent) 
                return -10; 
        } 

        // Else if none of them have won then return 0 
        return 0; 
    } 

    // This is the minimax function. It considers all 
    // the possible ways the game can go and returns 
    // the value of the board 

    function minimax( depth,isMax) 
    { 
        var score = evaluate(); 

        // If Maximizer has won the game return his/her 
        // evaluated score 
        if (score == 10) 
            return score; 

        // If Minimizer has won the game return his/her 
        // evaluated score 
        if (score == -10) 
            return score; 

        // If there are no more moves and no winner then 
        // it is a tie 
        if (isMovesLeft()==false) 
            return 0; 

        // If this maximizer's move 
        if (isMax) 
        { 
            var best = -1000; 

            // Traverse all cells 
            for (var i = 0; i<3; i++) 
            { 
                for (var j = 0; j<3; j++) 
                { 
                    // Check if cell is empty 
                    if (board[i][j]=='_') 
                    { 
                        // Make the move 
                        board[i][j] = player; 

                        // Call minimax recursively and choose 
                        // the maximum value 
                        best = Math.max( best, 
                            minimax(depth+1, !isMax) ); 

                        // Undo the move 
                        board[i][j] = '_'; 
                    } 
                } 
            } 
            return best; 
        } 

        // If this minimizer's move 
        else
        { 
            var best = 1000; 

            // Traverse all cells 
            for (var i = 0; i<3; i++) 
            { 
                for (var j = 0; j<3; j++) 
                { 
                    // Check if cell is empty 
                    if (board[i][j]=='_') 
                    { 
                        // Make the move 
                        board[i][j] = opponent; 

                        // Call minimax recursively and choose 
                        // the minimum value 
                        best = Math.min(best, 
                            minimax(depth+1, !isMax)); 

                        // Undo the move 
                        board[i][j] = '_'; 
                    } 
                } 
            } 
            return best; 
        } 
    } 

    // This will return the best possible move for the player 
    function findBestMove() 
    { 
        var bestVal = -1000; 
        bestMoverow = -1; 
        bestMovecol = -1; 

        // Traverse all cells, evaluate minimax function for 
        // all empty cells. And return the cell with optimal 
        // value. 
        for (var i = 0; i<3; i++) 
        { 
            for (var j = 0; j<3; j++) 
            { 
                // Check if cell is empty 
                if (board[i][j]=='_') 
                { 
                    // Make the move 
                    board[i][j] = player; 

                    // compute evaluation function for this 
                    // move. 
                    var moveVal = minimax(0, false); 

                    // Undo the move 
                    board[i][j] = '_'; 

                    // If the value of the current move is  
                    // more than the best value, then update 
                    // best/ 
                    if (moveVal > bestVal) 
                    { 
                        bestMoverow = i; 
                        bestMovecol = j; 
                        bestVal = moveVal; 
                    } 
                } 
            } 
        } 

        // printf("The value of the best Move is : %d\n\n", bestVal); 

        // return bestMoverow; 
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
    // var sg = document.getElementsByTagName('svg');
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

            blucircl[0].style.visibility = "visible";
            board[0][0] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
    mtgrd[1].onclick = function() {
        
            blucircl[1].style.visibility = "visible";
            board[0][1] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
    mtgrd[2].onclick = function() {
        
            blucircl[2].style.visibility = "visible";
            board[0][2] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }


    mtgrd[4].onclick = function() {
        
            blucircl[3].style.visibility = "visible";
            board[1][0] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
    mtgrd[5].onclick = function() {
        
            blucircl[4].style.visibility = "visible";
            board[1][1] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
    mtgrd[6].onclick = function() {
        
            blucircl[5].style.visibility = "visible";
            board[1][2] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }


    mtgrd[8].onclick = function() {
        
            blucircl[6].style.visibility = "visible";
            board[2][0] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
    mtgrd[9].onclick = function() {
        
            blucircl[7].style.visibility = "visible";
            board[2][1] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
    mtgrd[10].onclick = function() {
        
            blucircl[8].style.visibility = "visible";
            board[2][2] = 'o';
            tellmove();
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
    }
