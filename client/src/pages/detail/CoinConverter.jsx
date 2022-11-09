import { useState, useRef } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { memo } from 'react';
import useStyles from './styles';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const parseNumber = (v) => (v > 0.01 ? v.toFixed(2) : v.toFixed(1 - Math.floor(Math.log10(Math.abs(v)))));

//https://api.coingecko.com/api/v3/coins/bitcoin/tickers?include_exchange_logo=true&depth=true
const CoinConverter = ({ name, price, symbol, imgSrc }) => {
	const classes = useStyles();
	const [swap, setSwap] = useState(false);
	const baseInputRef = useRef(0);
	const targetInputRef = useRef(0);

	const inputNumberOnly = (e) => {
		// if (!/[0-9]/.test(e.key)) {
		//     e.preventDefault();
		// }

		const regex = /^[0-9]*\.?[0-9]*$/g;
		if (!regex.test(e.key)) {
			e.preventDefault();
		}
	};

	const handleChangeBaseInput = (e) => {
		let input = e.target.value;
		const count = input.split('.').length - 1;
		const lastIndex = input.lastIndexOf('.');

		if (count > 1) {
			const newInput = input.slice(0, lastIndex) + input.slice(lastIndex + 1);
			input = newInput;
			baseInputRef.current.value = input;
		}
		const value = parseFloat(input) * Number(price);
		targetInputRef.current.value = isNaN(value) ? '' : parseNumber(value);
	};

	const handleChangeTargetInput = (e) => {
		let input = e.target.value;
		const count = input.split('.').length - 1;
		const lastIndex = input.lastIndexOf('.');

		if (count > 1) {
			const newInput = input.slice(0, lastIndex) + input.slice(lastIndex + 1);
			input = newInput;
			targetInputRef.current.value = input;
		}
		const value = parseFloat(input) / Number(price);
		baseInputRef.current.value = isNaN(value) ? '' : parseNumber(value);
	};

	const handleSwapCurrency = () => {
		setSwap(prev => !prev);
		let temp = baseInputRef.current.value;
		baseInputRef.current.value = targetInputRef.current.value;
		targetInputRef.current.value = temp;
	};

	return (
		<Box marginBottom={5}>
			<Typography className={classes.h4} marginBottom={2}>
				{name} to USD Converter
			</Typography>
			<Box className={classes.converter}>
				{swap ? (
					<>
						<Box className='content'>
							<Box className='item'>
								<img
									src='https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg'
									alt='usdt-symbol'
									width={32}
								/>
								<Box>
									<Typography className='symbol'>USD</Typography>
									<Typography className='name'>United States Dollar</Typography>
								</Box>
							</Box>
							<TextField
								autoComplete='false'
								inputRef={targetInputRef}
								size='small'
								placeholder='0'
								className='input'
								inputProps={{ maxLength: 16 }}
								onKeyPress={inputNumberOnly}
								onChange={handleChangeTargetInput}
							/>
						</Box>
						<IconButton className='btn-swap' onClick={handleSwapCurrency}>
							<SwapHorizIcon />
						</IconButton>
						<Box className='content'>
							<Box className='item'>
								<img src={imgSrc} alt={symbol} width={32} />
								<Box>
									<Typography className='symbol'>{symbol}</Typography>
									<Typography className='name'>{name}</Typography>
								</Box>
							</Box>
							<TextField
								autoComplete='false'
								inputRef={baseInputRef}
								size='small'
								placeholder='0'
								className='input'
								inputProps={{ maxLength: 16 }}
								onKeyPress={inputNumberOnly}
								onChange={handleChangeBaseInput}
							/>
						</Box>
					</>
				) : (
					<>
						<Box className='content'>
							<Box className='item'>
								<img src={imgSrc} alt={symbol} width={32} />
								<Box>
									<Typography className='symbol'>{symbol}</Typography>
									<Typography className='name'>{name}</Typography>
								</Box>
							</Box>
							<TextField
								autoComplete='false'
								inputRef={baseInputRef}
								size='small'
								placeholder='0'
								className='input'
								inputProps={{ maxLength: 16 }}
								onKeyPress={inputNumberOnly}
								onChange={handleChangeBaseInput}
							/>
						</Box>
						<IconButton className='btn-swap' onClick={handleSwapCurrency}>
							<SwapHorizIcon />
						</IconButton>
						<Box className='content'>
							<Box className='item'>
								<img
									src='https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg'
									alt='usdt-symbol'
									width={32}
								/>
								<Box>
									<Typography className='symbol'>USD</Typography>
									<Typography className='name'>United States Dollar</Typography>
								</Box>
							</Box>
							<TextField
								autoComplete='false'
								inputRef={targetInputRef}
								size='small'
								placeholder='0'
								className='input'
								inputProps={{ maxLength: 16 }}
								onKeyPress={inputNumberOnly}
								onChange={handleChangeTargetInput}
							/>
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
};

export default memo(CoinConverter);
