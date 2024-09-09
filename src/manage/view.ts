import * as vscode from "vscode";
import { PathNode } from ".";
class PathManageView {
    constructor(context: vscode.ExtensionContext, provider: vscode.TreeDataProvider<PathNode>) {
        const view = vscode.window.createTreeView("path-manage.pathManageView", { treeDataProvider: provider });
        context.subscriptions.push(view);
        vscode.commands.registerCommand("path-manage.openFile", async (path: string) => {
            const uri = vscode.Uri.file(path);
            vscode.window.showTextDocument(uri);
        });
    }
}

export default PathManageView;
