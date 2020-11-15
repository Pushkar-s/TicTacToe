    var player = 'x', opponent = 'o'; 
    var bestMoverow = -1,bestMovecol = -1; 
    var cnt1,cnt2;
    var INF = 1000;

    function isMovesLeft(board,minimaxtype) 
    { 
        for (var i = 0; i<3; i++) {
            for (var j = 0; j<3; j++) {
                if (minimaxtype) cnt1++;
                else cnt2++;
                if (board[i][j]=='_') 
                    return true; 
            }
        }
        return false; 
    } 

    function eval(board,minimaxtype) {
        var gameover = false;
        for (var row = 0; row < 3; row ++) {
            var ch = board[row][0],flag = true;
            if (ch == '_') break;
            for (var col = 0; col < 3; col ++) {
                if (minimaxtype) cnt1++; else cnt2++;
                if (board[row][col] != ch) flag = false;
            }
            gameover |= flag;
        }

        for (var col = 0; col < 3; col ++) {
            var ch = board[0][col],flag = true;
            if (ch == '_') break;
            for (var row = 0; row < 3; row ++) {
                if (minimaxtype) cnt1++; else cnt2++;
                if (board[row][col] != ch) flag = false;
            }
            gameover |= flag;
        }

        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '_') gameover |= true;
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '_') gameover |= true;

        return gameover;
    }

    function evaluate(board,minimaxtype) 
    { 
        
        for (var row = 0; row<3; row++) 
        { 
            if (board[row][0]==board[row][1] && 
                board[row][1]==board[row][2] && board[row][2] != '_')
            { 
                if (minimaxtype) cnt1++; else cnt2++;
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
                if (minimaxtype) cnt1++; else cnt2++;
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

    function minimax_optimized( board,depth,isMax,alpha,beta) 
    { 
        var score = evaluate(board,0); 
        if (score == 10) return score - depth; 
        if (score == -10) return score + depth; 
        if (isMovesLeft(board,0)==false) return 0; 

        if (isMax) 
        { 
            var best_score = -1000; 
            for (var i = 0; i<3; i++) 
            { 
                for (var j = 0; j<3; j++) 
                { 
                    if (board[i][j]=='_') 
                    { 
                        board[i][j] = player; 
                        cnt2++;
                        var cur_score = minimax_optimized(board,depth+1,!isMax,alpha,beta); 
                        board[i][j] = '_'; 
                        if (best_score < cur_score) {
                            best_score = cur_score - depth;
                            alpha = Math.max(alpha,best_score);
                            if (beta <= alpha) {
                                return best_score;
                            }
                        }
                    } 
                } 
            } 
            return best_score; 
        } 
        else
        { 
            var best_score = 1000; 
            for (var i = 0; i<3; i++) 
            { 
                for (var j = 0; j<3; j++) 
                { 
                    if (board[i][j]=='_') 
                    { 
                        board[i][j] = opponent; 
                        cnt2++;
                        var cur_score = minimax_optimized(board,depth+1, !isMax,alpha,beta); 
                        board[i][j] = '_'; 
                        if (best_score > cur_score) {
                            best_score = cur_score + depth;
                            beta = Math.min(beta,best_score);
                            if (beta <= alpha) {
                                return best_score;
                            }
                        }
                    } 
                } 
            } 
            return best_score; 
        } 
    } 

    function findBestMoveWithAlphaBetaPruning(board) 
    { 
        var bestVal = -1000; 
        bestMoverow = -1; 
        bestMovecol = -1; 
        var alpha = -1000,beta = 1000;
        for (var i = 0; i<3; i++) 
        { 
            for (var j = 0; j<3; j++) 
            { 
                if (board[i][j]=='_') 
                { 
                    board[i][j] = player; 
                    var moveVal = minimax_optimized(board,0,false,alpha,beta); 
                    board[i][j] = '_'; 
                    cnt2++;
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

    function minimax( board,depth,isMax) 
    { 
        var score = evaluate(board,1); 
        if (score == 10) return score - depth; 
        if (score == -10) return score + depth; 
        if (isMovesLeft(board,1)==false) return 0; 
    
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
                        cnt1++;
                        best = Math.max( best, 
                            minimax(board,depth+1, !isMax) ); 
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
                        cnt1++;
                        best = Math.min(best, 
                            minimax(board,depth+1, !isMax)); 
    
                        board[i][j] = '_'; 
                    } 
                } 
            } 
            return best; 
        } 
    }


    function findBestMoveWithoutAlphaBetaPruning(board) 
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
                    var moveVal = minimax(board,0, false); 
                    board[i][j] = '_'; 
                    cnt1++;
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
    function tellmove(board) 
    { 
        var ans = findBestMoveWithoutAlphaBetaPruning(board);
        ans = findBestMoveWithAlphaBetaPruning(board); 
        return ans; 
    } 

    // tellmove();

    var rst = document.getElementById("newGame");
    var crs = document.getElementsByClassName('cros'); // array
    var blucircl = document.getElementsByClassName('bluecircle');
    var mtgrd = document.getElementsByClassName('matrixgrid');
    var board = [ 
        ['_','_','_'],
        ['_','_','_'],
        ['_','_','_']
    ];
    rst.onclick = function() {
        for (var i=0; i<9; i++) {
            // reset all blocks
            crs[2*i].style.visibility = "hidden";
            crs[2*i + 1].style.visibility = "hidden";
            blucircl[i].style.visibility = "hidden";
        }
        document.getElementById("winStatusWithoutPruning").style.visibility = "hidden";
        board = [ 
            ['_','_','_'],
            ['_','_','_'],
            ['_','_','_']
        ];
        cnt2 = 0;
        cnt1 = 0;
    }

    var idx;
    function winstatus(idx) {
        if (crs[2*idx].style.visibility == "visible" && crs[2*idx + 1].style.visibility == "visible") {
            // do it with else
            // alert("OY Game over");alert(cnt);
            document.getElementById("winStatusWithoutPruning").style.visibility = "visible";
            document.getElementById("countWithPruning").innerText = cnt2;
            document.getElementById("countWithoutPruning").innerText = cnt1;
        }else {
            setTimeout(winstatus(idx), 300);
        }
    }

    mtgrd[0].onclick = function() {
        if (blucircl[0].style.visibility == "visible" || crs[2*0].style.visibility == "visible") return;
            blucircl[0].style.visibility = "visible";
            board[0][0] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }
    mtgrd[1].onclick = function() {
        if (blucircl[1].style.visibility == "visible" || crs[2*1].style.visibility == "visible") return;
            blucircl[1].style.visibility = "visible";
            board[0][1] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }
    mtgrd[2].onclick = function() {
        if (blucircl[2].style.visibility == "visible" || crs[2*2].style.visibility == "visible") return;
            blucircl[2].style.visibility = "visible";
            board[0][2] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }


    mtgrd[4].onclick = function() {
        if (blucircl[3].style.visibility == "visible" || crs[2*3].style.visibility == "visible") return;
            blucircl[3].style.visibility = "visible";
            board[1][0] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }
    mtgrd[5].onclick = function() {
        if (blucircl[4].style.visibility == "visible" || crs[2*4].style.visibility == "visible") return;
            blucircl[4].style.visibility = "visible";
            board[1][1] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }
    mtgrd[6].onclick = function() {
        if (blucircl[5].style.visibility == "visible" || crs[2*5].style.visibility == "visible") return;
            blucircl[5].style.visibility = "visible";
            board[1][2] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }


    mtgrd[8].onclick = function() {
        if (blucircl[6].style.visibility == "visible" || crs[2*6].style.visibility == "visible") return;
            blucircl[6].style.visibility = "visible";
            board[2][0] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }
    mtgrd[9].onclick = function() {
        if (blucircl[7].style.visibility == "visible" || crs[2*7].style.visibility == "visible") return;
            blucircl[7].style.visibility = "visible";
            board[2][1] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }
    mtgrd[10].onclick = function() {
        if (blucircl[8].style.visibility == "visible" || crs[2*8].style.visibility == "visible") return;
            blucircl[8].style.visibility = "visible";
            board[2][2] = 'o';
            tellmove(board);
            board[bestMoverow][bestMovecol] = 'x';
            idx = bestMoverow*3 + bestMovecol;
            crs[2*idx + 0].style.visibility = "visible";
            crs[2*idx + 1].style.visibility = "visible";
            if (eval(board)) winstatus(idx); 
    }


    // =====================================================

    var randomPlay = document.getElementById("GenrateRandom");

    function MovesLeft(board) 
    { 
        for (var i = 0; i<3; i++) {
            for (var j = 0; j<3; j++) {
                if (board[i][j]=='_') 
                    return true; 
            }
        }
        return false; 
    } 
    var randomMoverow = -1,randomMovecol = -1,draw = 0, win = 0, lose = 0; 
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
      

    function randomMove(board) {
        var moveDone = false;
        while (!moveDone) {
            var idx = getRandomInt(9);
            /*
                [0 1 2],
                [3 4 5],
                [6 7 8]
            */
           var i = Math.floor(idx/3);
           var j = idx%3;
           if (board[i][j] == '_') {
                randomMoverow = i;
                randomMovecol = j;
                break;
           }
        }
    }

    randomPlay.onclick = function() {
        var no_of_games = 100;
        for (var i=0; i<no_of_games; i++) {
            // alert(i);
            var board = [ 
                ['_','_','_'],
                ['_','_','_'],
                ['_','_','_']
            ];
            var curStatus = eval(board);
            var turn = 0;
            while (!curStatus) {
                if (MovesLeft(board) == false) {
                    draw++;
                    break;
                } 
                curStatus = eval(board);
                if (eval(board)) break;
                if (!turn) {
                    randomMove(board);
                    board[randomMoverow][randomMovecol] = 'o';
                    curStatus = eval(board);
                    if (curStatus) {
                        lose++;
                        alert(board[0][0] + board[0][1] + board[0][2] + board[1][0]+board[1][1]+board[1][2] +board[2][0]+board[2][1]+board[2][2]);
                        break;
                    }
                    turn = !turn;
                } else {
                    var ans = tellmove(board);
                    if (ans == 0) {
                        draw++;
                        break;
                    }
                    board[bestMoverow][bestMovecol] = 'x';
                    curStatus = eval(board);
                    if (curStatus) {
                        win++;
                        break;
                    }
                    turn = !turn;
                }
                curStatus = eval(board);
            }
        }
    }