// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
// const path = require('path')
// const fs = require('fs')

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} ctx 插件上下文
 */
export function activate(ctx: vscode.ExtensionContext) {
  console.log('恭喜，您的扩展“vscode-plugin-gocomment”已被激活！');

  function reverse() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return vscode.window.showErrorMessage('There is no selected text');
    }

    const document = editor.document;
    const fileName = document.fileName;
    // const workDir = path.dirname(fileName);
    // const position = editor.selection.active;
    // var row = position.line;
    // var line = document.lineAt(position);
    // while (!line.text && (row < document.lineCount)) {
    //   row = row + 1;
    //   line = document.lineAt(row);
    // }

    // console.log('fileName: ' + fileName); // 当前文件完整路径
    // console.log('workDir: ' + workDir); // 当前文件所在目录
    // console.log('line: ' + line.text); // 当前光标所在行

    // 只处理.go文件
    if (/\.go$/.test(fileName)) {
      const comment = `"// %s",
      "// @Summary ",
      "// @Description ",
      "// @Param %s  %s "",
      "// @Retrun %s %s ""`;
      const s = document.getText();
      const r = /\n\nfunc (.*)\((.*)\)(.*){/g;
      while (true) {
        var m = r.exec(s);
        if (!m) {break;};
        console.log('#' + m.index + ':' + m[0]);
      }
    }

    // let selection = editor.selection;
    // // Get the word within the selection
    // let selectedText = document.getText(selection);
    // let reversed = selectedText.split('').reverse().join('');

    // editor.edit((editBuilder) => {
    //   editBuilder.replace(selection, reversed);
    // });
  }

  const registerCommand = (id: string, cb: (...args: any) => any) => ctx.subscriptions.push(vscode.commands.registerCommand(id, cb));

  // 注册命令
  registerCommand('gocomment.reverse', reverse);
}

/**
 * 插件被释放时触发
 */
export function deactivate() {
  console.log('您的扩展“vscode-plugin-gocomment”已被释放！');
}
