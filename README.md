# 机器学习-图像分类
通过机器学习训练模型达到能够识别出`三角形`、`矩形`和`圆形`。  

用 `processing` 来随机生成三角形，圆形和矩形图片。之后通过 `ml5.js`来将数据集(也就是所有的图片)进行训练生成模型。  

通过生成的模型进行识别。

# processing
[processing下载地址](https://processing.org/download)  
processing运行`processing-project`文件夹中的`generate_dataset_shape_classifier.pde`文件，生成的图都会放在`test`文件夹中。

# ml5
在ml5文件夹中进行进行模型训练。  
processing生成的图片`test`里面的图片移动到`ml5文件夹`下的 `data文件夹`。  
`VS Code`通过插件`Live Server`的右键选择 `Open with Live Server`打开`ml5文件夹`中的`index.html`文件
```js
// count代表训练的张数，400代表三角形，圆形，矩形各400张，也就是1200张
for (let i = 0; i < count; i++) {
    let index = nf(i + 1, 4, 0);
    circles[i] = loadImage(`data/circle${index}.png`);
    squares[i] = loadImage(`data/square${index}.png`);
    triangles[i] = loadImage(`data/triangle${index}.png`);
}

// 50代表训练五十次
shapeClassifier.train({ epochs: 50 }, finishedTraining);
```

# 效果
效果查看的demo。  
在根目录中的`index.html`文件通过`VS Code`插件 `Open with Live Server`打开，按住鼠标绘图，之后点击识别按钮，即可看到结果。