define(function(require, exports, module) {
	var format = 'jpg JPG png PNG gif GIF';

	return function(opt) {
		//格式检测
		if (opt.inputEle.files && opt.inputEle.files[0]) {
			var fileName = opt.inputEle.files[0].name,
				fileSuffix = fileName.substring(fileName.indexOf('.') + 1).toLocaleLowerCase();


			if (format.indexOf(fileSuffix) == -1) {
				opt.callback(false, '文件格式不符，请上传jpg、JPG、png、PNG、gif、GIF格式');
				return false;
			}
		}

		//像素检测
		try {
			if (window.FileReader) {
				var fr = new FileReader;

				fr.onload = function() {
					var img = new Image;
					img.onload = function() {
						if (img.width < opt.width || img.height < opt.height) {
							opt.callback(false, '图片尺寸过小');
						}
					}
					img.src = fr.result;
				}

				fr.readAsDataURL(opt.inputEle.files[0]);
			}
		} catch (ex) {};

		//判断上传图片大小
		var fileSize = 0;
		if (!opt.inputEle.files) {
			var filePath = opt.inputEle.value;
			var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
			var file = fileSystem.GetFile(filePath);
			fileSize = file.Size;
		} else {
			fileSize = opt.inputEle.files[0].size;
		}
		var size = fileSize / 1024 / 1000;
		if (size > opt.size) {
			opt.callback(false, '图片过大');
			return false;
		}
		return true;
	};
});
