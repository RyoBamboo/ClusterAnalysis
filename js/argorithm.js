/**
 * クラスター分析のアルゴリズムを扱うクラス
 */
 // var samples = [
 // 	[165, 54],
 // 	[164, 51],
 // 	[165, 58],
 // 	[162, 46],
 // 	[174, 54],
 // 	[167, 55],
 // 	[179, 53],
 // 	[159, 48],
 // 	[165, 50],
 // 	[165, 49],
 // 	[162, 48],
 // 	[168, 55],
 // 	[166, 56],
 // 	[163, 50],
 // 	[164, 53],
 // 	[166, 53],
 // ];

 var samples = [
 	[1, 2],
 	[3, 4],
 	[5, 6],
 	[7, 8]	
 ];

var sampleCnt  = samples.length; // サンプル数
var elementCnt = samples[0].length; // 要素数

data = [];

 var samplesCnt = samples.length;
 for (var i = 0; i < samplesCnt; i++) {
 	data[i] = new Array();
 	for (var j = i + 1; j < samplesCnt; j++) {
 		data[i][j] = getDistance(i, j, elementCnt, samples);
 	}
 }

 console.log(data);

/*-----------------------------------
 * 2つのデータ間の距離を取得する関数
 * @params
 * sampleNum  : サンプル番号
 * nextSampleNum : 次のサンプル番号
 * elementCnt : 要素数
 * data       : データ

 * @return
 * distance   : 距離
 *---------------------------------*/
function getDistance(sampleNum, nextSampleNum, elementCnt, data) {

	var distance = 0;
	var sum = 0;

	// 要素の数だけ繰り返す
	for (var i= 0; i < elementCnt; i++) {
		sum += Math.pow(data[sampleNum][i] - data[nextSampleNum][i], 2);
	}
	distance = Math.sqrt(sum);

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
