import * as vscode from "vscode";
import ViewTreeProvider from "./manage";
import path from "path";
import PathManageView from "./manage/view";

export function activate(context: vscode.ExtensionContext) {
    const provider = new ViewTreeProvider();

    const disposable = vscode.commands.registerCommand("path-manage.addToPathManage", function (resource) {
        // const folder = vscode.workspace.getWorkspaceFolder(resource.fsPath);
        const filePath = resource.fsPath;
        const fileName = path.basename(filePath);
        provider.addPathToTreeView(fileName, filePath);
    });

    new PathManageView(context, provider);
    context.subscriptions.push(disposable);
    context.subscriptions.push(vscode.window.registerTreeDataProvider("path-manage.pathManageView", provider));
}

export function deactivate() {}
