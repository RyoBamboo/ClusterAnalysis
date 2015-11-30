/**
 * クラスター分析のアルゴリズムを扱うクラス
 */
 // var samples = [
 //	[165, 54],
 //	[164, 51],
 //	[165, 58],
 //	[162, 46],
 //	[174, 54],
 //	[167, 55],
 //	[170, 53],
 //	[159, 48],
 //	[165, 50],
 //	[165, 49],
 //	[162, 48]
 //	[168, 55],
 //	[166, 56],
 //	[163, 50],
 //	[164, 53],
 //	[166, 53],
 // ];

 var samples = [
 	// [1, 2],
 	// [3, 4],
 	// [5, 6],
 	// [7, 8]	
 	[165, 49],
 	[162, 48],
 	[168, 55],
 	[166, 56],
 	[163, 50],
 	[164, 53],
 	[166, 53]
 ];

 var result = {};

 var method = 1;

var sampleCnt  = samples.length; // サンプル数
var elementCnt = samples[0].length; // 要素数
var clusterSampleCnt = []; // あるクラスターに属するサンプル数を格納する
var cluster = []; // 所属するクラスター番号

data = [];

var originSampleCnt = samples.length;
var sampleCnt = samples.length;

// クラスタ分析の実行
function excute() {
	// データ間の距離を計算して配列に格納
	for (var i = 0; i < sampleCnt; i++) {
		clusterSampleCnt[i] = 1; // i番目のクラスターのサンプル数を初期化する
		cluster[i] = i; // i番目のクラスターにはi番目のサンプル番号を格納する
		data[i] = new Array();
		for (var j = i + 1; j < sampleCnt; j++) {
			data[i][j] = getDistanceOfData(i, j, elementCnt, samples);
		}
	}

	// for (var i = 0; i < sampleCnt; i++) {
	// 	for (var j = i + 1; j < sampleCnt; j++) {
	// 		data[j][i] = data[i][j];
	// 	}
	// }


	// 最小距離のクラスターを探す
	var min = -1;
	var ci;
	var cj;
	for (var i = 0; i < sampleCnt; i++) {
		for (var j = i + 1; j < sampleCnt; j++) {
			if (min < 0 || data[i][j] < min) {
				min = data[i][j];
				ci = i;
				cj = j;
			}
		}
	}

	// 最小距離の数値を持つクラスターのインデックスを集める
	var minNum = [];
	for (var i = 0; i < sampleCnt; i++) {
		for (var j = i + 1; j < sampleCnt; j++) {
			if (min == data[i][j]) {
				minNum.push([i, j]);
			}
		}
	}

	var ci;
	var cj;
	var minIndex; // ciとcjの小さいほうのインデックス
	var indexs = [];
	for (var key in minNum) {
		ci = minNum[key][0];
		cj = minNum[key][1];
		minIndex = Math.min(ci, cj);
		for (var i = 0; i < sampleCnt; i++) {
			for (var j = i + 1; j < sampleCnt; j++) {
				data[i][minIndex] = getDistanceOfCluster(1, data[i][ci], data[i][cj]);
			}
		}

		if (indexs.indexOf(cj)) {
			indexs.push(cj);
		}
		if (indexs.indexOf(ci)) {
			indexs.push(ci);
		}
	}

	var children = [];
	for (var key in indexs) {
		var child = { "name": indexs[key]};
		children.push(child);
	}

	result.children = children;

	// 不要な行と列を削除
	for (var i = 0; i < sampleCnt; i++) {
		for (var j = i + 1; j < sampleCnt; j++) {
			if (indexs.indexOf(j) != -1 && minIndex != j) {
				data[i].splice(j, 1);
			}
		}
	}

	// サンプル数の修正
	sampleCnt -= (indexs.length -1);

	for (var i = 0; i < sampleCnt; i++) {
		var str = new String();
		for (var j = i + 1; j < sampleCnt; j++) {
			str += "[" + j + "] " + data[i][j];
		}
		// console.log(str);
	}
}





/*---------------------------------------------------------------
 * 2つのデータ間の距離を取得する関数
 * @param sampleNum     int   サンプル番号
 * @param nextSampleNum int   次のサンプル番号
 * @param elementCnt    int   次のサンプル番号
 * @param data          array データ
 *
 * @return distance int ２つのデータ間の
 *------------------------------------------------------------*/
function getDistanceOfData(sampleNum, nextSampleNum, elementCnt, data) {

	var distance = 0;
	var sum = 0;
	var tmp = 0;

	// 要素の数だけ繰り返す
	for (var i= 0; i < elementCnt; i++) {
		tmp =  data[sampleNum][i] - data[nextSampleNum][i];
		sum += tmp * tmp;
	}
	distance = Math.sqrt(sum);

	return distance;
}


/*---------------------------------------------------------------
 * 2つのデータ間の距離を取得する関数
 * @param method : 分析方法
 * @param dio        : クラスターi, oの距離
 * @param djo        : クラスターj, oの距離
 * @param dij         : クラスターi, jの距離
 * @param ni : クラスターiに含まれるデータ数
 * @param nj : クラスターiに含まれるデータ数
 * @param no : クラスターiに含まれるデータ数
 * @param x ,y    : データ
 *
 * @return distance クラスター間の距離
 *------------------------------------------------------------*/
function getDistanceOfCluster(method, dio, djo) {
	distance = 0;

	switch (method) {
		// 最短距離法
		case 1:
			distance = Math.min(dio, djo);
			break;
	}

	return distance;
}

































// var result = getCombination(samples, 2);
/**
 * 組み合わせを求める関数
 *
 * @params
 * samples array サンプル
 * extCnt  int   取り出す数
 * @return 
 * comb    array 組み合わせの結果
 */
function getCombination(samples, extCnt){
	var i, j;
	var comb = [];
	var tmp = [];
	var sampleCnt = samples.length;

	if (sampleCnt < extCnt) {
		alert('エラー：サンプル数に誤りがあります');
		return;
	} else if (extCnt == 1) {
		for (i = 0; i < sampleCnt; i++) {
			comb[i] = [samples[i]];
		}
	} else {
		for (i = 0; i < sampleCnt - extCnt + 1; i++) {
			tmp = getCombination(samples.slice(i + 1), extCnt - 1);
			for (j = 0; j < tmp.length; j++) {
				comb.push([samples[i]].concat(tmp[j]));
			}
		}
	}

	return comb;
}
