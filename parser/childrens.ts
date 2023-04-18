// deno-lint-ignore-file ban-ts-comment prefer-const
import { Enviroment } from "../enviroment/eval.ts";
import { Token, TokenType } from "../lexer/types.ts";
import { parseComponent } from "./component.ts";
import { IASTNode } from "./interfaces/IAstNode.ts";
import { Parser } from "./parser.ts";
import { parseColumn } from "./style/column.ts";
import { parseRow } from "./style/row.ts";
import { parseStyle } from "./style/style.ts";
import { parseImage } from "./tags/image.ts";
import { parseInput } from "./tags/input.ts";
import { parseText } from "./tags/text.ts";

function generateAST_Save(): IASTNode {
  let component = parseComponent();

  Enviroment.setIdentifier(component.value as string, component);
  return component;
}

function getIdentifier(): IASTNode {
  let identifier = Enviroment.getIdentifier(
    //@ts-ignore
    Parser.currentToken.value as string,
    Parser.currentToken as Token
  );
  Parser.advance();
  return identifier;
}

export function parseChildrens(): IASTNode[] {
  const children: IASTNode[] = [];
  while (Parser.currentToken && Parser.currentToken.value !== "}") {
    //@ts-ignore
    switch (Parser.currentToken.type) {
      case TokenType.Component:
        children.push(generateAST_Save());
        break;

      case TokenType.Column:
        children.push(parseColumn());
        break;

      case TokenType.Row:
        children.push(parseRow());
        break;

      case TokenType.Input:
        children.push(parseInput());
        break;

      case TokenType.Text:
        children.push(parseText());
        break;

      case TokenType.Image:
        children.push(parseImage());
        break;

      case TokenType.Style:
        parseStyle();
        break;

      case TokenType.Identifier:
        children.push(getIdentifier());
        break;

      default:
        console.log(
          `Error: Unexpected type: "${Parser.currentToken.type}" => ${Parser.currentToken.value} at ${Parser.currentToken.line}:${Parser.currentToken.column}, expected: "Page" or "}"`
        );
        Deno.exit(1);
    }
  }
  return children;
}