/*
 * kif.js
 *
 * Copyright 2011, Masato Bito
 * Licensed under the MIT license.
 *
 */
(function(Kifu) {
Kifu.Kif = (function(kifu) { return new Kifu.Kif.initialize(kifu); });
Kifu.Kif.extend = Kifu.Kif.prototype.extend = Kifu.extend;


var board_piece_map = {
  '歩': 'FU',
  '香': 'KY',
  '桂': 'KE',
  '銀': 'GI',
  '金': 'KI',
  '角': 'KA',
  '飛': 'HI',
  '王': 'OU',
  '玉': 'OU',
  'と': 'TO',
  '杏': 'NY',
  '圭': 'NK',
  '全': 'NG',
  '馬': 'UM',
  '龍': 'RY',
  '竜': 'RY'
};

var handicap_name_map = {
  '平手':     'Even',
  '香落ち':   'Lance',
  '右香落ち': 'Right_Lance',
  '角落ち':   'Bishop',
  '飛車落ち': 'Rook',
  '飛香落ち': 'Rook_and_Lance',
  '二枚落ち': 'Two_Drops',
  '四枚落ち': 'Four_Drops',
  '六枚落ち': 'Six_Drops',
  'その他':   'Other'
};

var info_map = {
  終了日時: 'end_time',
  棋戦:     'event',
  戦型:     'opening',
  先手:     'player_black',
  下手:     'player_black',
  後手:     'player_white',
  上手:     'player_white',
  場所:     'site',
  開始日時: 'start_time',
  表題:     'title'
};

var kanji_number_map = {
  '一':   1,
  '二':   2,
  '三':   3,
  '四':   4,
  '五':   5,
  '六':   6,
  '七':   7,
  '八':   8,
  '九':   9,
  '十':  10
};

var kifu_map = {
  '同':   0,
  '　':   0,
  '１':   1,
  '２':   2,
  '３':   3,
  '４':   4,
  '５':   5,
  '６':   6,
  '７':   7,
  '８':   8,
  '９':   9,
  '一':   1,
  '二':   2,
  '三':   3,
  '四':   4,
  '五':   5,
  '六':   6,
  '七':   7,
  '八':   8,
  '九':   9,
  '歩':   'FU',
  '香':   'KY',
  '桂':   'KE',
  '銀':   'GI',
  '金':   'KI',
  '角':   'KA',
  '飛':   'HI',
  '王':   'OU',
  '玉':   'OU',
  '歩成': 'TO',
  '香成': 'NY',
  '桂成': 'NK',
  '銀成': 'NG',
  '角成': 'UM',
  '飛成': 'RY',
  'と':   'TO',
  '成香': 'NY',
  '成桂': 'NK',
  '成銀': 'NG',
  '馬':   'UM',
  '龍':   'RY',
  '竜':   'RY'
};

Kifu.Kif.prototype.extend({
  handicapToKanji: function(handicap) {
    for (var name in handicap_name_map) {
      if (handicap_name_map[name] == handicap) {
        return name;
      }
    }
  },

  infoToKanji: function(info_key) {
    for (var name in info_map) {
      if (info_map[name] == info_key) {
        return name;
      }
    }
  },

  integerToKanji: function(num) {
    var str = '';

    if (10 <= num) {
      str += '十';
    }

    num = num % 10;
    for (var name in kanji_number_map) {
      if (kanji_number_map[name] == num) {
        str += name;
        break;
      }
    }

    return str;
  },

  kanjiToHandicap: function(kanji) {
    return handicap_name_map[kanji];
  },

  kanjiToInfo: function(kanji) {
    return info_map[kanji];
  },

  kanjiToInteger: function(kanji) {
    var num = 0;
    var l   = kanji.length;
    for (var i = 0; i < l; i++) {
      num += kanji_number_map[kanji.substr(i, 1)];
    }
    return num;
  },

  kanjiToPiece: function(kanji) {
    return board_piece_map[kanji];
  },

  output: function() {
    var kifu = this.kifu;
    if (kifu.info.format == 'kif') {
      // return kifu.info.source;
    }

    var result = "# --- generated by jsShogiKifu ---\n";
    result += this.outputInfo(kifu.info);
    result += this.outputSuite(kifu.suite_init, kifu.info);
    result += this.outputMoves(kifu.moves);
    return result;
  },

  outputBoard: function(board) {
    var result = "  ９ ８ ７ ６ ５ ４ ３ ２ １\n";
    result += "+---------------------------+\n";

    for (var y = 1; y <= 9; y++) {
      result += '|';

      for (var x = 9; 1 <= x; x--) {
        var cell = board[x][y];
        if (cell) {
          result += cell.is_black ? ' ' : 'v';
          result += this.pieceToKanji(cell.piece);
        } else {
          result += ' ・';
        }
      }

      result += '|' + this.integerToKanji(y) + "\n";
    }

    result += "+---------------------------+\n";
    return result;
  },

  outputDate: function(date) {
    var yy = date.getFullYear();
    var mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }
    var dd = date.getDate();
    if (dd < 10) {
      dd = '0' + dd;
    }
    var h  = date.getHours();
    if (h < 10) {
      h = '0' + h;
    }
    var m  = date.getMinutes();
    if (m < 10) {
      m = '0' + m;
    }
    var s  = date.getSeconds();
    if (s < 10) {
      s = '0' + s;
    }
    return yy + '/' + mm + '/' + dd + ' ' + h + ':' + m + ':' + s;
  },

  outputInfo: function(info) {
    var result = '';

    for (var key in info) {
      var value = info[key];
      switch (key) {
      case 'end_time':
      case 'start_time':
        result += this.infoToKanji(key) + '：' + this.outputDate(value) + "\n";
        break;

      case 'handicap':
        result += '手合割：' + this.handicapToKanji(value) + "\n";
        break;

      case 'kif':
        for (var k in value) {
          result += k + '：' + value[k] + "\n";
        }
        break;

      case 'player_start':
        if (value == 'black') {
          result += "先手番\n";
        } else {
          result += "後手番\n";
        }
        break;

      case 'time_consumed':
        result += '消費時間：' +
          '▲' + value.black +
          '△' + value.white + "\n";
        break;

      case 'time_limit':
        result += '持ち時間：各';
        var h = value.allotted / 60;
        if (h) {
          result += h + '時間';
        }
        var m = value.allotted % 60;
        if (m) {
          result += m + '分';
        }
        result += "\n";
        break;

      default:
        var info_key = this.infoToKanji(key);
        if (info_key) {
          result += info_key + '：' + value + "\n";
        }
        break;
      }
    }

    return result;
  },

  outputMoves: function(moves) {
    var result = "手数----指手---------消費時間--\n";

    var records = moves.records;
    var l       = records.length;
    for (var i = 0; i < l; i++) {
      var record = records[i];

      var num = i + '';
      var m   = 4 - num.length;
      for (j = 0; j < m; j++) {
        num = ' ' + num;
      }

      switch (record.type) {
      case 'move':
        var from = record.from;
        var to   = record.to;

        result += num + ' ' +
          record.str + '(' + from.x + from.y + ')' +
          "   ( 0:00/00:00:00)\n";
        break;

      case 'TORYO':
        result += num + " 投了         ( 0:00/00:00:00)\n";
        break;

      case 'TSUMI':
        result += num + " 詰み         ( 0:00/00:00:00)\n";
        break;

      default:
        break;
      }

      if (record.comment) {
        var lines = this.toLines(record.comment);
        var m     = lines.length;
        for (var j = 0; j < m; j++) {
          result += '*' + lines[j] + "\n";
        }
      }
    }

    return result;
  },

  outputStand: function(stand) {
    var result = '';

    for (var piece in stand) {
      var amount = stand[piece];
      if (amount < 1) {
        continue;
      }
      result += this.pieceToKanji(piece) + this.kanjiToInteger(amount) + '　';
    }

    if (!result) {
      result += 'なし';
    }

    result += "\n";
    return result;
  },

  outputSuite: function(suite, info) {
    if (info.handicap && info.handicap != 'Other') {
      return '';
    }

    var result = '';
    result += '後手の持ち駒：' + this.outputStand(suite.stand.white);
    result += this.outputBoard(suite.board);
    result += '先手の持ち駒：' + this.outputStand(suite.stand.black);
    return result;
  },

  parse: function() {
    var lines = this.toLines(this.kifu.info.source);
    var l = lines.length;
    for (var i = 0; i < l; i++) {
      var line = lines[i];
      this.parseByLine(line);
    }

    this.prepare();

    return this;
  },

  parseByLine: function(line) {
    if (this.parseByLineAsComment(line)) {
      return true;
    }

    if (this.parseByLineAsInfo(line)) {
      return true;
    }

    if (this.parseByLineAsInfo2(line)) {
      return true;
    }

    if (this.parseByLineAsBoard(line)) {
      return true;
    }

    if (this.parseByLineAsMove(line)) {
      return true;
    }

    return false;
  },

  parseByLineAsBoard: function(line) {
    if (!line.match(/^\|.+\|/)) {
      return false;
    }

    this._board_setup = true;

    var line = this.strip(line);
    var y    = this.kanjiToInteger(line.charAt(line.length-1));

    var suite_init = this.kifu.suite_init;
    for (var i = 0; i < 9; i++) {
      var piece = this.kanjiToPiece(line.substr(i*2+2, 1));
      if (!piece) {
        continue;
      }

      var is_black = !(line.substr(i*2+1, 1) == 'v');
      var x        = 9 - i;
      suite_init.cellDeploy(x, y, piece, is_black);
    }

    return true;
  },

  parseByLineAsComment: function(line) {
    switch (line.charAt(0)) {
    case '#':
      return true;
    case '*':
      // 変化は未実装
      if (this._henka) {
        return true;
      }
      if (line.length > 1) this.kifu.moves.addComment(line.substr(1));
      return true;
    }
    return false;
  },

  parseByLineAsInfo: function(line) {
    if (!line.match(/^(.+?)：(.+)/)) {
      return false;
    }

    var info  = this.kifu.info;
    var key   = RegExp.$1;
    var value = this.strip(RegExp.$2);

    switch (key) {
    case '開始日時':
    case '終了日時':
      var info_key   = this.kanjiToInfo(key);
      info[info_key] = this.toDate(value);
      return true;

    case '持ち時間':
      if (value.match(/([0-9]+)時間/)) {
        info.time_limit || (info.time_limit = {});
        info.time_limit.allotted = parseInt(RegExp.$1) * 60;
      }
      return true;

    case '消費時間':
      if (value.match(/[0-9]+▲([0-9]+)△([0-9]+)/)) {
        info.time_consumed = {
          black: parseInt(RegExp.$1),
          white: parseInt(RegExp.$2)
        };
      }
      return true;

    case '手合割':
      info.handicap = this.handicapToKanji(value);
      return true;

    case '先手の持駒':
    case '下手の持駒':
      return this.parseStand(value, true);

    case '後手の持駒':
    case '上手の持駒':
      return this.parseStand(value, false);

    case '変化':
      this._henka = true;
      return true;

    default:
      var info_key = this.kanjiToInfo(key);
      if (info_key) {
        info[info_key] = value;
      } else {
        info.kif || (info.kif = {});
        info.kif[key] = value;
      }
      return true;
    }

    return false;
  },

  parseByLineAsInfo2: function(line) {
    var info = this.kifu.info;

    switch (this.strip(line)) {
    case '先手番':
    case '下手番':
      info.player_start = 'black';
      return true;

    case '上手番':
    case '後手番':
      info.player_start = 'white';
      return true;
    }

    return false;
  },

  parseByLineAsMove: function(line) {
    if (!line.match(/^ *([0-9]+) ([^ ]+)/)) {
      return false;
    }

    // 変化は未実装
    if (this._henka) {
      return true;
    }

    var num    = parseInt(RegExp.$1);
    var move   = RegExp.$2;
    var moves  = this.kifu.moves;

    switch (this.strip(move)) {
    case '投了':
      moves.addSpecial('TORYO');
      return true;

    case '千日手':
      moves.addSpecial('SENNICHITE');
      return true;

    case '持将棋':
      moves.addSpecial('JISHOGI');
      return true;

    case '詰み':
      moves.addSpecial('TSUMI');
      return true;
    }

    var params = {}
    params.to = {x: kifu_map[move.charAt(0)], y: kifu_map[move.charAt(1)]};
    if (move.substr(2).match(/(.*)\(([1-9])([1-9])\)/)) {
      params.to.piece = kifu_map[RegExp.$1];
      params.from     = {x: parseInt(RegExp.$2), y: parseInt(RegExp.$3)};
      move.match(/(.*)\(/);
      params.str      = RegExp.$1;
    } else {
      params.to.piece = kifu_map[move.charAt(2)];
      params.from     = {x: 0, y: 0};
      params.str      = move;
    }
    moves.setMove(num, params);

    return true;
  },

  parseStand: function(str, is_black) {
    if (str == 'なし') {
      return true;
    }

    var suite_init = this.kifu.suite_init;
    var list = str.split(/[\s　]+/);
    for (var i in list) {
      var value = list[i];
      var piece = this.kanjiToPiece(value.substr(0, 1));
      if (!piece) {
        continue;
      }
      var num = this.kanjiToInteger(value.substr(1)) || 1;
      suite_init.standDeploy(piece, is_black, num);
    }

    return true;
  },

  pieceToKanji: function(piece) {
    for (var name in board_piece_map) {
      if (board_piece_map[name] == piece) {
        return name;
      }
    }
  },

  prepare: function() {
    var kifu = this.kifu;
    var info = kifu.info;

    if (this._board_setup) {
      delete info.handicap;
    } else {
      if (!info.handicap) {
        info.handicap = 'Even';
      }

      var handicap = info.handicap;
      kifu.suite_init.setup(handicap);
      if (handicap != 'Even') {
        info.player_start = 'white';
      }
    }
  },

  strip: function(str) {
    return str.replace(/^[\s　]+/, '').replace(/[\s　]+$/, '');
  },

  toDate: function(str) {
    var date = new Date();
    date.setTime(Date.parse(str));
    return date;
  },

  toLines: function(source) {
    var result = [];
    var lines = source.split(/\r?\n|\r/);
    var l = lines.length;
    for (var i = 0; i < l; i++) {
      var line = lines[i];
      if (line) {
        result.push(lines[i]);
      }
    }
    return result;
  }
});

Kifu.Kif.extend({
  initialize: function(kifu) {
    this.kifu = kifu;
  }
});


Kifu.Kif.initialize.prototype = Kifu.Kif.prototype;
})(Kifu);

// Local variables:
// indent-tabs-mode: nil
// js2-basic-offset: 2
// end:
// vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2:
