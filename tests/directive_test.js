var compiler = require('../lib/compiler.js');

exports.test_label = function (test) {
    var tokens = compiler.lexical('label:');
    test.equal(1, tokens.length);
    test.equal('T_LABEL', tokens[0].type);
    //var ast = compiler.syntax(tokens);
    //#test.equal(1 , ast.length);
    test.done();
};

exports.test_inesprg = function (test) {
    var tokens = compiler.lexical('.inesprg 1');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_DECIMAL_ARGUMENT', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast, true);
    test.equal(code[4], 1);
    test.done();
};

exports.test_ineschr = function (test) {
    var tokens = compiler.lexical('.ineschr 1');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_DECIMAL_ARGUMENT', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast, true);
    test.equal(code[5], 1);
    test.done();
};

exports.test_inesmap = function (test) {
    var tokens = compiler.lexical('.inesmap 1');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_DECIMAL_ARGUMENT', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast, true);
    //#test.equal(1, get_var('inesmap'));
    test.deepEqual(code[6], 1);
    test.done();
};

exports.test_inesmir = function (test) {
    var tokens = compiler.lexical('.inesmir 1');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_DECIMAL_ARGUMENT', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast, true);
    //test.equal(1, get_var('inesmir'));
    test.deepEqual(code[7], 1);
    test.done();
};

exports.test_bank_0 = function (test) {
    var tokens = compiler.lexical('.bank 0 ');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_DECIMAL_ARGUMENT', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    //TODO: var code = compiler.semantic(ast);
    test.done();
};

exports.test_org_0000 = function (test) {
    var tokens = compiler.lexical('.org $0000');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    //var ast = compiler.syntax(tokens);
    //test.equal(1 , ast.length);
    //test.equal('S_DIRECTIVE', ast[0].type);
    //var code = compiler.semantic(ast);
    //#test.equal(0x0000, get_pc());
    test.done();
};

exports.test_org_c000 = function (test) {
    var tokens = compiler.lexical('.org $C000');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    //var ast = compiler.syntax(tokens);
    //test.equal(1 , ast.length);
    //test.equal('S_DIRECTIVE', ast[0].type);
    //var code = compiler.semantic(ast);
    //#test.equal(0xc000, get_pc());
    test.done();
};

exports.test_org_fffa = function (test) {
    var tokens = compiler.lexical('.org $FFFA');
    test.equal(2, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    //var ast = compiler.syntax(tokens);
    //test.equal(1 , ast.length);
    //test.equal('S_DIRECTIVE', ast[0].type);
    //var code = compiler.semantic(ast);
    //#test.equal(0xfffa, get_pc());
    test.done();
};

exports.test_db_1 = function (test) {
    var tokens = compiler.lexical('.db $0F,$01,$02,$03,$04,$05,$06,$07,$08,$09,$0A,$0B,$0C,$0D,$0E,$0F\n');
    test.equal(33, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    test.equal('T_SEPARATOR', tokens[2].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    test.equal(32, ast[0].children.length);
    var code = compiler.semantic(ast);
    var expected = [0x0f, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f];
    test.deepEqual(expected, code);
    test.done();
};

exports.test_db_2 = function (test) {
    var tokens = compiler.lexical('.db $0F,$30,$31,$32,$33,$35,$36,$37,$38,$39,$3A,$3B,$3C,$3D,$3E,$0F');
    test.equal(32, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast);
    var expected = [0x0f, 0x30, 0x31, 0x32, 0x33, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x0F];
    test.deepEqual(expected, code);
    test.done();
};

exports.test_db_3 = function (test) {
    var tokens = compiler.lexical('.db $80, $00, $03, $80');
    test.equal(8, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast);
    var expected = [0x80, 0x0, 0x03, 0x80];
    test.deepEqual(expected, code);
    test.done();
};

exports.test_db_4 = function (test) {
    var tokens = compiler.lexical(".db $80, $00, $03, $80\n.db $01, $02, $03, $04");
    test.equal(17, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(2, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast);
    var expected = [0x80, 0x0, 0x03, 0x80, 1, 2, 3, 4];
    test.deepEqual(expected, code);
    test.done();
};

exports.test_db_5 = function (test) {
    var source = ".db $80, $00, $03, $80\n.db $01, $02, $03, $04\n";
    var tokens = compiler.lexical(source);
    test.equal(18, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_ADDRESS', tokens[1].type);
    var ast = compiler.syntax(tokens);
    test.equal(2, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);
    var code = compiler.semantic(ast);
    var expected = [0x80, 0x0, 0x03, 0x80, 1, 2, 3, 4];
    test.deepEqual(expected, code);
    test.done();
};

exports.test_db_12_binary_number = function (test) {
    var source = ".db %00000001, %10101010";
    var tokens = compiler.lexical(source);

    test.equal(4, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_BINARY_NUMBER', tokens[1].type);

    var ast = compiler.syntax(tokens);

    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);

    var code = compiler.semantic(ast);


    var expected = [0x1, 0xAA];
    test.deepEqual(expected, code);

    test.done();
};

exports.test_db_list_binary_number = function (test) {
    var source = ".db %00000001, %00000010\n.db %00000011, %00000100";
    var tokens = compiler.lexical(source);

    test.equal(9, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_BINARY_NUMBER', tokens[1].type);

    var ast = compiler.syntax(tokens);

    test.equal(2, ast.length);
    test.equal('S_DIRECTIVE', ast[1].type);

    var code = compiler.semantic(ast);

    var expected = [0x1, 0x2, 0x3, 0x4];
    test.deepEqual(expected, code);

    test.done();
};

exports.test_db_list_with_decimal_argument = function (test) {
    var source = '.db 36,36,36,36';
    var tokens = compiler.lexical(source);

    test.equal(8, tokens.length);
    test.equal('T_DIRECTIVE', tokens[0].type);
    test.equal('T_DECIMAL_ARGUMENT', tokens[1].type);

    var ast = compiler.syntax(tokens);

    test.equal(1, ast.length);
    test.equal('S_DIRECTIVE', ast[0].type);

    var code = compiler.semantic(ast);

    var expected = [0x24, 0x24, 0x24, 0x24];
    test.deepEqual(expected, code);

    test.done();
};

exports.test_db_background_attribute = function (test) {
    var source = ".db %00000000, %00010000, %01010000, %00010000, %00000000, %00000000, %00000000, %00110000";

    var tokens = compiler.lexical(source);
    var ast = compiler.syntax(tokens);
    var code = compiler.semantic(ast);

    var expected = [ 0x00, 0x10, 0x50, 0x10, 0, 0, 0, 0x30];
    test.deepEqual(expected, code);

    test.done();

};

exports.test_db_background_row_1 = function (test) {
    var source = ".db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24  ;;row 1\n";
    source += ".db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24  ;;all sky";
    var tokens = compiler.lexical(source);

    var ast = compiler.syntax(tokens);

    test.equal(2, ast.length);
    test.equal('S_DIRECTIVE', ast[1].type);

    var code = compiler.semantic(ast);

    var expected = [
        0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24,
        0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24,
        0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24,
        0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24
    ];
    test.deepEqual(expected, code);

    test.done();
};

exports.test_db_background_row_3 = function (test) {
    var source = ".db $24,$24,$24,$24, $45,$45,$24,$24, $45,$45,$45,$45, $45,$45,$24,$24  ;;row 3\n";
    source += ".db $24,$24,$24,$24, $24,$24,$24,$24, $24,$24,$24,$24, $53,$54,$24,$24  ;;some brick tops";

    var tokens = compiler.lexical(source);

    var ast = compiler.syntax(tokens);

    test.equal(2, ast.length);
    test.equal('S_DIRECTIVE', ast[1].type);

    var code = compiler.semantic(ast);

    var expected = [
        0x24, 0x24, 0x24, 0x24, 0x45, 0x45, 0x24, 0x24,
        0x45, 0x45, 0x45, 0x45, 0x45, 0x45, 0x24, 0x24,
        0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24, 0x24,
        0x24, 0x24, 0x24, 0x24, 0x53, 0x54, 0x24, 0x24
    ];
    test.deepEqual(expected, code);

    test.done();
};

/*
background:
  .db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24  ;;row 1
  .db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24  ;;all sky

  .db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24  ;;row 2
  .db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24  ;;all sky

  .db $24,$24,$24,$24,$45,$45,$24,$24,$45,$45,$45,$45,$45,$45,$24,$24  ;;row 3
  .db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$53,$54,$24,$24  ;;some brick tops

  .db $24,$24,$24,$24,$47,$47,$24,$24,$47,$47,$47,$47,$47,$47,$24,$24  ;;row 4
  .db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$55,$56,$24,$24  ;;brick bottoms
  */
