$(function() {
	load();//页面加载时也会显示
	$('#title').on('keydown', function(e) {
		if (e.keyCode === 13) { //当按下回车
//			alert(11);
			var local = getDate();
			console.log(local);
			//把local数组更新数据
			local.push({ title: $(this).val(), done: false });
			//把数组存储到本地存储
			saveDate(local);
			//本地存储数据渲染加载到页面
			load(); //加载内容
		}
		$(this).val(''); //文本框清空
	});
	//删除本地数据
	$('ol, ul').on('click', 'a', function(e) {
//		alert(1);
		//获取本地存储
		var data = getDate();
		//修改数据
		var index = $(this).attr('id'); //获取自定义属性id
		//保存到本地存储
		data.splice(index, 1);
		saveDate(data);
		//重新渲染页面
		load();
	});
	//正在进行的和已经完成的
	$('ol, ul').on('click', 'input', function() {
		//先获取本地存储
		var data = getDate();
		//修改数据
		var index = $(this).siblings('a').attr('id');
//		console.log(index);
		data[index].done = $(this).prop('checked');
		//保存到本地数据
		saveDate(data);
		//重新渲染页面
		load();
	});
	//读取本地存储
	function getDate() {
		var data = localStorage.getItem('todolist');
		if(data !== null) {
			return JSON.parse(data); //字符串转对象
		} else {
			return []; //没有数据，创建新的数组
		}
	}
	//保存本地存储数据
	function saveDate(data) {
		localStorage.setItem('todolist', JSON.stringify(data)); //对象转字符串
	}
	//渲染加载数据
	function load() {
		//读取本地数据
		var data = getDate();
		$('ol, ul').empty();//先清除ol、ul里面的数据
		var todoCount = 0; //未完成的个数
		var doneCount = 0; //已经完成的个数
		//遍历这个数据
		$.each(data, function(i, n) {
//			console.log(n);
			if (n.done) { //已经完成
				$('ul').prepend('<li><input type="checkbox" checked><p>' + n.title + '</p><a id=' + i + ' href="javascript:;"></a></li>');
				doneCount++; //统计已经完成的+1
			} else { //没有完成
				$('ol').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a id=' + i + ' href="javascript:;"></a></li>');
				todoCount++; //统计未完成的+1
			}
		});
		$('#todocount').text(todoCount); //赋值
		$('#donecount').text(doneCount); //赋值
	}
});