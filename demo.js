async function make_map(cityname, dom_id) {
	let map = {'AN': 'Andaman and Nicobar Islands', 'AP': 'Andhra Pradesh', 'AR': 'Arunachal Pradesh', 'AS': 'Assam', 'BR': 'Bihar', 'CH': 'Chandigarh', 'CT': 'Chhattisgarh', 'DN': 'Dadra and Nagar Haveli', 'DD': 'Daman and Diu', 'DL': 'Delhi', 'GA': 'Goa', 'GJ': 'Gujarat', 'HR': 'Haryana', 'HP': 'Himachal Pradesh', 'JK': 'Jammu and Kashmir', 'JH': 'Jharkhand', 'KA': 'Karnataka', 'KL': 'Kerala', 'LD': 'Lakshadweep', 'MP': 'Madhya Pradesh', 'MH': 'Maharashtra', 'MN': 'Manipur', 'ML': 'Meghalaya', 'MZ': 'Mizoram', 'NL': 'Nagaland', 'OR': 'Odisha', 'PY': 'Puducherry', 'PB': 'Punjab', 'RJ': 'Rajasthan', 'SK': 'Sikkim', 'TN': 'Tamil Nadu', 'TG': 'Telangana', 'TR': 'Tripura', 'UP': 'Uttar Pradesh', 'UT': 'Uttarakhand', 'WB': 'West Bengal'};
	let resp = await $.get("https://data.covid19india.org/v4/min/data.min.json");
	let data = [];
	let mi = 1E9, ma = 0;
	for (let state in map) {
		if (state in resp) {
			mi = Math.min(mi, resp[state]['total']['confirmed']);
			ma = Math.max(ma, resp[state]['total']['confirmed']);
			data.push({
				name: map[state],
				value: resp[state]['total']['confirmed']
			});
		}
	}
	console.log(data);
	achart = echarts.init(document.getElementById(dom_id));
	var option = {
		tooltip: {
			trigger: 'item',
			showDelay: 0,
			transitionDuration: 0.2,
			formatter: function (params) {
				const value = (params.value + '').split('.');
				const valueStr = value[0].replace(
					/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
					'$1,'
				);
				return params.seriesName + '<br/>' + params.name + ': ' + valueStr;
			}
		},
		visualMap: {
			left: 'right',
			min: mi,
			max: ma,
			inRange: {
				color: [
					'#313695',
					'#4575b4',
					'#74add1',
					'#abd9e9',
					'#e0f3f8',
					'#ffffbf',
					'#fee090',
					'#fdae61',
					'#f46d43',
					'#d73027',
					'#a50026'
				]
			},
			text: ['High', 'Low'],
			calculable: true
		},
		"backgroundColor": "#fff",
		"series": [
			{
				"mapType": cityname,
				// "data": [{ 'name': 'Andaman and Nicobar Islands', 'value': 4483413 }, { 'name': 'Andhra Pradesh', 'value': 4569654 }, { 'name': 'Arunachal Pradesh', 'value': 14019562 }, { 'name': 'Assam', 'value': 31171356 }, { 'name': 'Bihar', 'value': 37576326 }, { 'name': 'Chandigarh', 'value': 37545621 }, { 'name': 'Chhattisgarh', 'value': 22215351 }, { 'name': 'Dadra and Nagar Haveli', 'value': 23470312 }, { 'name': 'Delhi', 'value': 2126665 }, { 'name': 'Goa', 'value': 6744515 }, { 'name': 'Gujarat', 'value': 4967512 }, { 'name': 'Haryana', 'value': 1237446 }, { 'name': 'Himachal Pradesh', 'value': 36795059 }, { 'name': 'Jammu and Kashmir', 'value': 14056742 }, { 'name': 'Jharkhand', 'value': 12615912 }, { 'name': 'Karnataka', 'value': 17988484 }, { 'name': 'Kerala', 'value': 35552214 }, { 'name': 'Madhya Pradesh', 'value': 34288998 }, { 'name': 'Maharashtra', 'value': 21595291 }, { 'name': 'Manipur', 'value': 31374173 }, { 'name': 'Meghalaya', 'value': 25697045 }, { 'name': 'Mizoram', 'value': 16918272 }, { 'name': 'Nagaland', 'value': 11328468 }, { 'name': 'Odisha', 'value': 25935213 }, { 'name': 'Pondicherry', 'value': 787277 }, { 'name': 'Punjab', 'value': 27916410 }, { 'name': 'Rajasthan', 'value': 1248022 }, { 'name': 'Sikkim', 'value': 32758611 }, { 'name': 'Tamil Nadu', 'value': 24989925 }, { 'name': 'Telangana', 'value': 35555339 }, { 'name': 'Tripura', 'value': 25281906 }, { 'name': 'Uttarakhand', 'value': 15479123 }, { 'name': 'Uttar Pradesh', 'value': 20774596 }, { 'name': 'West Bengal', 'value': 30262964 }],
				"data": data,
				"name": "",
				"symbol": "circle",
				"type": "map",
				"roam": true
			}
		]
	};
	achart.setOption(option);
}
