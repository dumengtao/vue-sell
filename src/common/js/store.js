// 本地存储数据
export function saveToLocal(id,key,value) {
	let seller = window.localStorage.__seller__     /* 双下划线表示私有的 */
	if (!seller) {
		seller = {}
		seller[id] = {}
	}else{
		// 解析字符串变成对象
		seller = JSON.parse(seller)
		if (!seller[id]) {
			seller[id] = {}
		}
	}
	seller[id][key] = value
	// 解析对象变成字符串
	window.localStorage.__seller__ = JSON.stringify(seller)
}

// 本地读取数据
export function loadFromLocal(id,key,def) {
	let seller = window.localStorage.__seller__
	if (!seller) {
		return def
	}
	seller = JSON.parse(seller)[id]
	if (!seller) {
		return def
	}
	let ret = seller[key]
	return ret || def
}
