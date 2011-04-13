(function() {


var kifu_obj;

module('Kifu.Csa', {
  setup: function() {
    kifu_obj = Kifu();
  }
});

test('parse version', 4, function() {
  var kifu  = kifu_obj
  var info  = kifu_obj.info;
  var info2 = Kifu().info;

  // version 2
  info2['version'] = '2';
  var line = 'V2';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // version 2.2
  info2['version'] = '2.2';
  var line = 'V2.2';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');
});

test('parse player', 4, function() {
  var kifu  = kifu_obj
  var info  = kifu_obj.info;
  var info2 = Kifu().info;

  // black player
  info2['player_black'] = '大山康晴';
  var line = 'N+大山康晴';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // white player
  info2['player_white'] = '升田幸三';
  var line = 'N-升田幸三';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');
});

test('parse info', 18, function() {
  var kifu  = kifu_obj
  var info  = kifu_obj.info;
  var info2 = Kifu().info;

  // EVENT
  info2['event'] = '名人戦';
  var line = '$EVENT:名人戦';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // SITE
  info2['site'] = '陣屋';
  var line = '$SITE:陣屋';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // START_TIME
  info2['start_time'] = new Date(2011, 3, 7, 9, 45, 10);
  var line = '$START_TIME:2011/04/07 09:45:10';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // START_TIME 2
  info2['start_time'] = new Date(2010, 9, 25);
  var line = '$START_TIME:2010/10/25';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // END_TIME
  info2['end_time'] = new Date(2011, 3, 8, 10, 20, 30);
  var line = '$END_TIME:2011/04/08 10:20:30';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // END_TIME 2
  info2['end_time'] = new Date(2010, 9, 26);
  var line = '$END_TIME:2010/10/26';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // TIME_LIMIT
  info2['time_limit'] = {allotted: 360, extra: 60};
  var line = '$TIME_LIMIT:06:00+60';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // TIME_LIMIT 2
  info2['time_limit'] = {allotted: 0, extra: 0};
  var line = '$TIME_LIMIT:00:00+00';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // OPENING
  info2['opening'] = '相矢倉';
  var line = '$OPENING:相矢倉';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');
});

test('parse initial board hirate', 4, function() {
  var kifu  = kifu_obj;
  var board = Kifu.Board().hirate();

  // hirate
  var line = 'PI';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // hirate komaochi
  kifu.board_init = Kifu.Board();
  board.cellRemove(8, 2, 'HI');
  board.cellRemove(2, 2, 'KA');
  var line = 'PI82HI22KA';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');
});

test('parse initial board all', 16, function() {
  var kifu  = kifu_obj;
  var board = Kifu.Board();

  // 1st line
  board.cellDeploy(9, 1, 'KY', false);
  board.cellDeploy(8, 1, 'KE', false);
  board.cellDeploy(7, 1, 'GI', false);
  board.cellDeploy(6, 1, 'KI', false);
  board.cellDeploy(5, 1, 'OU', false);
  board.cellDeploy(4, 1, 'KI', false);
  board.cellDeploy(3, 1, 'GI', false);
  board.cellDeploy(2, 1, 'KE', false);
  var line = 'P1-KY-KE-GI-KI-OU-KI-GI-KE * ';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // 2nd line
  board.cellDeploy(8, 2, 'HI', false);
  var line = 'P2 * -HI *  *  *  *  *  *  * ';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // 3rd line
  board.cellDeploy(9, 3, 'FU', false);
  board.cellDeploy(8, 3, 'FU', false);
  board.cellDeploy(7, 3, 'FU', false);
  board.cellDeploy(6, 3, 'FU', false);
  board.cellDeploy(5, 3, 'FU', false);
  board.cellDeploy(4, 3, 'FU', false);
  board.cellDeploy(3, 3, 'FU', false);
  board.cellDeploy(2, 3, 'FU', false);
  board.cellDeploy(1, 3, 'FU', false);
  var line = 'P3-FU-FU-FU-FU-FU-FU-FU-FU-FU';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // 4-6 line
  var line = 'P4 *  *  *  *  *  *  *  *  * ';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  var line = 'P5 *  *  *  *  *  *  *  *  * ';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  var line = 'P6 *  *  *  *  *  *  *  *  * ';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, '4-6 line board');

  // 7th line
  board.cellDeploy(9, 7, 'FU', true);
  board.cellDeploy(8, 7, 'FU', true);
  board.cellDeploy(7, 7, 'FU', true);
  board.cellDeploy(6, 7, 'FU', true);
  board.cellDeploy(5, 7, 'FU', true);
  board.cellDeploy(4, 7, 'FU', true);
  board.cellDeploy(3, 7, 'FU', true);
  board.cellDeploy(2, 7, 'FU', true);
  board.cellDeploy(1, 7, 'FU', true);
  var line = 'P7+FU+FU+FU+FU+FU+FU+FU+FU+FU';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // 8th line
  board.cellDeploy(8, 8, 'KA', true);
  board.cellDeploy(2, 8, 'HI', true);
  var line = 'P8 * +KA *  *  *  *  * +HI * ';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // 9th line
  board.cellDeploy(9, 9, 'KY', true);
  board.cellDeploy(8, 9, 'KE', true);
  board.cellDeploy(7, 9, 'GI', true);
  board.cellDeploy(6, 9, 'KI', true);
  board.cellDeploy(5, 9, 'OU', true);
  board.cellDeploy(4, 9, 'KI', true);
  board.cellDeploy(3, 9, 'GI', true);
  board.cellDeploy(2, 9, 'KE', true);
  board.cellDeploy(1, 9, 'KY', true);
  var line = 'P9+KY+KE+GI+KI+OU+KI+GI+KE+KY';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');
});

test('parse initial board each', 8, function() {
  var kifu  = kifu_obj;
  var board = Kifu.Board();

  // P+63RY00KI
  board.cellDeploy(6, 3, 'RY', true);
  board.standDeploy('KI', true);
  ok(Kifu.Csa.parseByLine('P+63RY00KI', kifu), 'P+63RY00KI');
  same(kifu.board_init, board, 'P+63RY00KI board');

  // P+00KI
  board.standDeploy('KI', true);
  ok(Kifu.Csa.parseByLine('P+00KI', kifu), 'P+00KI');
  same(kifu.board_init, board, 'P+00KI board');

  // P-42OU33GI22KI23FU
  board.cellDeploy(4, 2, 'OU', false);
  board.cellDeploy(3, 3, 'GI', false);
  board.cellDeploy(2, 2, 'KI', false);
  board.cellDeploy(2, 3, 'FU', false);
  var line = 'P-42OU33GI22KI23FU';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');

  // P-00AL
  board.standDeploy('AL', false);
  var line = 'P-00AL';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.board_init, board, line+' board');
});

test('parse start player', 5, function() {
  var kifu  = kifu_obj
  var info  = kifu_obj.info;
  var info2 = Kifu().info;

  // -
  info2['player_start'] = 'white';
  var line = '-';
  same(info['player_start'], 'black', 'first status');
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');

  // +
  info2['player_start'] = 'black';
  var line = '+';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(info, info2, line+' info');
});

test('parse moves', 20, function() {
  var kifu  = kifu_obj
  var moves = Kifu.Move();

  // '* comment1'
  moves.addComment('comment1');
  var line = "'* comment1";
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // '* comment2'
  moves.addComment('comment2');
  var line = "'* comment2";
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // '+2726FU'
  moves.addMove([2, 7], [2, 6], 'FU', {black: true});
  var line = '+2726FU';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // 'T10'
  moves.addPeriod(10);
  var line = 'T10';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // '* comment3'
  moves.addComment('comment3');
  var line = "'* comment3";
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // '-0055KA'
  moves.addMove([0, 0], [5, 5], 'KA', {black: false});
  var line = '-0055KA';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // 'T30'
  moves.addPeriod(30);
  var line = 'T30';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // %TORYO
  moves.addSpecial('TORYO');
  var line = '%TORYO';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // %+ILLEGAL_ACTION
  moves.addSpecial('ILLEGAL_ACTION', {black: true});
  var line = '%+ILLEGAL_ACTION';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');

  // %-ILLEGAL_ACTION
  moves.addSpecial('ILLEGAL_ACTION', {black: false});
  var line = '%-ILLEGAL_ACTION';
  ok(Kifu.Csa.parseByLine(line, kifu), line);
  same(kifu.moves, moves, line+' move');
});

test('toLines', 2, function() {
  var source = "foo\r\nbar\rbaz\nfoo2\nbar2\nbaz2\n";
  var lines  = ['foo', 'bar', 'baz', 'foo2', 'bar2', 'baz2'];
  same(Kifu.Csa.toLines(source), lines, source);

  var source = "foo,\r\nbar\rbaz,\nfoo2,\nbar2\nbaz2\n";
  var lines  = ['foobar', 'bazfoo2bar2', 'baz2'];
  same(Kifu.Csa.toLines(source), lines, source);
});

test('parse', 1, function() {
  var source = "'----------棋譜ファイルの例\"example.csa\"-----------------\n\
'バージョン\n\
V2.2\n\
'対局者名\n\
N+NAKAHARA\n\
N-YONENAGA\n\
'棋譜情報\n\
'棋戦名\n\
$EVENT:13th World Computer Shogi Championship\n\
'対局場所\n\
$SITE:KAZUSA ARC\n\
'開始日時\n\
$START_TIME:2003/05/03 10:30:00\n\
'終了日時\n\
$END_TIME:2003/05/03 11:11:05\n\
'持ち時間:25分、切れ負け\n\
$TIME_LIMIT:00:25+00\n\
'戦型:矢倉\n\
$OPENING:YAGURA\n\
'平手の局面\n\
P1-KY-KE-GI-KI-OU-KI-GI-KE-KY\n\
P2 * -HI *  *  *  *  * -KA * \n\
P3-FU-FU-FU-FU-FU-FU-FU-FU-FU\n\
P4 *  *  *  *  *  *  *  *  * \n\
P5 *  *  *  *  *  *  *  *  * \n\
P6 *  *  *  *  *  *  *  *  * \n\
P7+FU+FU+FU+FU+FU+FU+FU+FU+FU\n\
P8 * +KA *  *  *  *  * +HI * \n\
P9+KY+KE+GI+KI+OU+KI+GI+KE+KY\n\
'先手番\n\
+\n\
'指し手と消費時間\n\
+2726FU\n\
T12\n\
-3334FU\n\
T6\n\
%CHUDAN\n\
'---------------------------------------------------------\n\
";

  var kifu  = Kifu();
  var board = kifu.board_init;
  var info  = kifu.info;
  var moves = kifu.moves;
  info['source']       = source;
  info['version']      = '2.2';
  info['player_black'] = 'NAKAHARA';
  info['player_white'] = 'YONENAGA';
  info['event']        = '13th World Computer Shogi Championship';
  info['site']         = 'KAZUSA ARC';
  info['start_time']   = new Date(2003, 4, 3, 10, 30);
  info['end_time']     = new Date(2003, 4, 3, 11, 11, 5);
  info['time_limit']   = {allotted: 25, extra: 0};
  info['opening']      = 'YAGURA';
  info['player_start'] = 'black';
  board.hirate();
  moves.addMove([2, 7], [2, 6], 'FU', {black: true});
  moves.addPeriod(12);
  moves.addMove([3, 3], [3, 4], 'FU', {black: false});
  moves.addPeriod(6);
  moves.addSpecial('CHUDAN');

  kifu_obj.source(source);
  Kifu.Csa.parse(kifu_obj);
  same(kifu_obj, kifu, 'sample csa');
});


})();

/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */