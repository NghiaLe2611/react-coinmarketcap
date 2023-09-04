export function scientificToDecimal(num) {
	var nsign = Math.sign(num);
	//remove the sign
	num = Math.abs(num);
	//if the number is in scientific notation remove it
	if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
		var zero = '0',
			parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
			e = parts.pop(), //store the exponential part
			l = Math.abs(e), //get the number of zeros
			sign = e / l,
			coeff_array = parts[0].split('.');
		if (sign === -1) {
			l = l - coeff_array[0].length;
			if (l < 0) {
				num =
					coeff_array[0].slice(0, l) +
					'.' +
					coeff_array[0].slice(l) +
					(coeff_array.length === 2 ? coeff_array[1] : '');
			} else {
				num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
			}
		} else {
			var dec = coeff_array[1];
			if (dec) l = l - dec.length;
			if (l < 0) {
				num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
			} else {
				num = coeff_array.join('') + new Array(l + 1).join(zero);
			}
		}
	}

	return nsign < 0 ? '-' + num : num;
};

export function formatPrice(number) {
	if (Number(number) >= 1) {
		return Number(number)
			.toFixed(2)
			.replace(/\d(?=(\d{3})+\.)/g, '$&,');
	}

	return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(number);
};

export function formatNumber(number, toFixed) {
	if (!toFixed) return Intl.NumberFormat('en-US').format(number);
	const options = {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	};
	const res = Number(number).toLocaleString('en', options);
	return res;
};

export function formatPercent(percent) {
	return Number(percent).toFixed(2);
};

export function formatNumberByChar(number) {
	let parseNumber = Number(number);

	if (parseNumber >= 1000000000) {
        return (parseNumber/1000000000).toFixed(2) + 'B';
    }

	if (parseNumber >= 1000000) {
        return (parseNumber/1000000).toFixed(2) + 'M';
    }

    if (parseNumber >= 1000) {
        return (parseNumber/1000).toFixed(2) + 'K';
    }

    return parseNumber;
};

export function formatSupply(number) {
	let parseNumber = Number(number);

	if (parseNumber >= 1000000000) {
        return (parseNumber/1000000000).toFixed(2) + 'B';
    }

    return formatNumber(number);
};

export function formatPriceChange(str) {
	// let newStr = str.toFixed(2).toString();
	let newStr = formatPrice(str);
	const first = newStr.charAt(0);
	if (isNaN(Number(first))) {
		newStr = `-$${newStr.substring(1)}`;
		return newStr;
	}

    return `$${str}`;
};

export function convertLink(link) {
	return link.toString().replace('https://', '');
};

export function formatCategoryName(category) {
    return category.replace(/\s+/g, '-').toLowerCase();
};

export function getColorPrice(val) {
	if (val > 0) return 'var(--color-price-up)';
	if (val < 0) return 'var(--color-price-down)';
};
