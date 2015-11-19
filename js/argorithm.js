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
	54,
	51,
	58,
	46,
	54,
	55,
	53,
	48,
	50,
	49,
	48,
	55,
	56,
	50,
	53,
	53
 ];

var result = getCombination(samples, 2);

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

