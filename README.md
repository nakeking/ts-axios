# ts-axios
基于 TypeScript 实现 axios

# 打包错误
```
@types/estree/index"' has no exported member 'ChainExpression'.

451         ChainExpression?: ((node: ESTree.ChainExpression & NodeParentExtension) => void) | undefined;

@types/estree/index"' has no exported member 'ImportExpression'.

474         ImportExpression?: ((node: ESTree.ImportExpression & NodeParentExtension) => void) | undefined;
```

执行安装 @types/estree新版本
```
npm install @types/estree
```