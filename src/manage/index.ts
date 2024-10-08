import * as vscode from "vscode";
const pathManageDataKey = "PATH_MANAGE_DATA";

class ViewTreeProvider implements vscode.TreeDataProvider<PathNode> {
    private _onDidChangeTreeData: vscode.EventEmitter<PathNode | undefined | null | void> = new vscode.EventEmitter<PathNode | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<PathNode | undefined | null | void> = this._onDidChangeTreeData.event;
    private context: vscode.ExtensionContext;
    private _data: PathNode[] = [];

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this._data = context.workspaceState.get(pathManageDataKey) || [];
    }

    fireTreeDataChangeEvent() {
        this._onDidChangeTreeData.fire();
        this.context.workspaceState.update(pathManageDataKey, this._data);
    }

    getTreeItem(element: PathNode): vscode.TreeItem {
        const treeItem = new vscode.TreeItem(element.label);
        // 设置命令，当用户点击节点时触发
        treeItem.command = {
            command: "path-manage.openFile",
            title: "打开文件",
            arguments: [element.pathValue],
        };
        return treeItem;
    }

    getChildren(element?: PathNode | undefined): vscode.ProviderResult<PathNode[]> {
        return Promise.resolve(this._data);
    }

    addPathToTreeView(label: string, pathValue: string) {
        const newItem = new PathNode(label, pathValue);
        this._data.push(newItem);

        this.fireTreeDataChangeEvent();
    }
}

export class PathNode extends vscode.TreeItem {
    label: string;
    pathValue: string;

    constructor(label: string, pathValue: string) {
        super(label);
        this.label = label;
        this.pathValue = pathValue;
    }
}

export default ViewTreeProvider;
