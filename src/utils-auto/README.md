全局频繁使用的工具可以存放在这里，该文件夹中的函数会自动导入，可以直接调用。

为了更好的管理，文件名和函数名需要一些关联，如文件名 `operator.ts`，函数名需要包含 `operator` 这个单词，如 `getOperator`、`findOperator`、`ensureOperatorName`。

此外，函数名最好和 `use**` 或 `use**Store` 这样的名称区分开，也就是不使用 `use` 开头。
