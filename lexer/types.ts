export enum TokenType {
Component="Component",
Identifier="Identifier",
OpenBrace="OpenBrace",
CloseBrace="CloseBrace",
Column="Column",
Export="Export",
EOF="EOF",
Number="Number",
OpenParen="OpenParen",
CloseParen="CloseParen",
StringLiteral="StringLiteral",
Colon="Colon",
Page="Page",
Container= "Container",
Row="Row",
Input="Input",
// HexColor="HexColor",
Dot="Dot",
Text="Text",
String="String",
Coma="Coma",
src="src",
Image="Image",

Table= "Table",
Thead="Thead",
Trow="Trow",
Tdata="Tdata",

Tab="Tab",
TabPage="TabPage",

Dialog="Dialog",
Button="Button"
// Style="Style",
// Color="Color",
// Border="Border",
// Background="Background",
// Font="Font",
// Width="width",
// Hight="Hight",
// Display="Display",
// Place="Place",
// Padding="Padding",
// FontColor="FontColor",

}

export type Token = {
    type: TokenType;
    // deno-lint-ignore no-explicit-any
    value?: any;
    line?: number;
    column?: number;
}